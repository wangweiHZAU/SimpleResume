const canvas = document.querySelector('#ref-line')
const ctx = canvas.getContext('2d')
const body = document.body.getBoundingClientRect()
const centerPart = canvas.getClientRects()

let hover = true,
    click = true,
    doubleClick = false,
    cLeft = centerPart[0].left,
    cTop = centerPart[0].top,
    cRight = centerPart[0].right,
    width = body.width - cLeft,
    height = body.height - cTop;
let storeVerticalLine = [] // 存储已经标记过的纵坐标
let storeHorizontalLine = [] // 存储已经标记过的横坐标
let choice = 'horizontal' || 'vertical' // 横向或纵向参考线
let refLine = 'add' // 设置初始化时参考线样式
let lock = 'open' || 'close'

// 开关canvas
const switchCanvasPaint = function(lock){
    let canvasDiv = document.querySelector('.lower-canvas')
    if(!canvasDiv){
        console.log("无法开启绘图")
        throw new Error("No canvas parent root")
    }
    if(lock === 'open'){
    canvasDiv.setAttribute('style', 'position:relative; z-index:1')
    }else{
        canvasDiv.setAttribute('style', 'position:relative; z-index:-1') 
    }
}
switchCanvasPaint('close')

// 防抖
const debounce = function(fn, timeout){
    let timer;
    return function(...args){
        let that = this
        if(timer){
            return
        }
        timer = setTimeout(function(){
            fn.apply(that, args)
            timer = null
        }, timeout)
    }
}

// 鼠标悬浮样式
const cursorStyle = function(method){
    switch (method){
        case "add":
            canvas.style.cursor = 'crosshair'
            break
        case "move":
            canvas.style.cursor = 'grab'
            break
        case 'del':
            canvas.style.cursor = 'vertical-text'
            break
        default:
            console.log("Undefined cursor method")
            break
    }
}

// 退出绘制
const quitMarkLine = function(){
    choice = 'none'
}

// 更新绘制样式
const updateRefLine = function(){
    if (!refLine){
        quitMarkLine()
    }else{
        cursorStyle(refLine)
        mouseMoveControl()
    }
}

// 标注点重绘
const repaintMark = function(){
    storeHorizontalLine.map(item =>{
        drawLine([[0, item], [width, item]], '#aaa')
    })
    storeVerticalLine.map(item =>{
        drawLine([[item-cLeft, 0], [item-cLeft, height]], '#aaa') 
    })
}

// 参考线操作方式函数绑定
const refLineMethodFunc = ()=>{
    // 添加标注点
    const clickAddMark = function(){
    }
    window.addEventListener('click', function addMark(e){
        if( refLine!=='add') return;
        if(e.pageX >= cLeft && e.pageX <= cRight){
        if(choice === 'horizontal'){
            storeHorizontalLine.push(e.pageY)
        } else if(choice === 'vertical'){
            storeVerticalLine.push(e.pageX)
        }
        repaintMark()
        }
    })    

    // 删除标注点
    const clickDelMark = function(){
        window.addEventListener('click', function delMark(e){
        if(refLine !== 'del')return;
        let remList, operate, resList=[]
        if(choice === 'horizontal'){
            remList = storeHorizontalLine
            operate = 'pageY'
        }else if(choice === 'vertical'){
            remList = storeVerticalLine
            operate = 'pageX'
        } 
        remList.sort((a, b)=>(a-b))
        remList.forEach((item)=>{
            if(item < e[operate]-5 || item > e[operate]+5){
                resList.push(item)
            }
        })
        if(choice ==='horizontal'){
            storeHorizontalLine = resList
        } else{
            storeVerticalLine = resList
        }
        })
        repaintMark()
    }

    clickAddMark()
    clickDelMark()
}

refLineMethodFunc()

// 参考线操作方式选择
const refLineMethod = function(){
    let markMethod = document.querySelector('.mark-line')
    if(!markMethod){
        throw new Error("找不到参考线方式选择框！")
    }
    markMethod.addEventListener('click',(e)=>{
        switch(e.target.id){
            case 'move':
                refLine = 'move'
                break
            case 'add':
                refLine = 'add'
                break
            case 'del':
                refLine = 'del'
                break
            case 'quit':
                refLine = ''
                break
        }
        updateRefLine()
    })
}

refLineMethod()



// 绘制线条
const drawLine = function(arr, lineColor) {
    ctx.beginPath();
    ctx.strokeStyle =  lineColor
    ctx.moveTo(arr[0][0], arr[0][1])
    for(let i=1, len=arr.length; i<len; ++i){
        ctx.lineTo(arr[i][0], arr[i][1])
    }
    ctx.stroke();
    ctx.closePath();
}

// 改变鼠标移动事件
const mouseMoveControl = function(){
    let _mv
    if (window.onmousemove){
        _mv = window.onmousemove
    }
    const mouseMove = function(e, choice){
        if(e.pageX >= cLeft && e.pageX <= cRight){
        ctx.clearRect(0, 0, width, height)
        // 判断横纵辅助线
        switch (choice){
            case 'horizontal':
                drawLine([[0, e.pageY], [width, e.pageY]], 'blue')
                break;
            case 'vertical':
                drawLine([[e.pageX-cLeft, 0], [e.pageX-cLeft, height]], 'red')
                break;
            default:
                break;
        }
        } else{
            ctx.clearRect(0, 0, width, height)
        }
        // 重绘已标注点
        repaintMark()
    }
    window.onmousemove = function(e){
        if(_mv){
            debounce(mouseMove, 100).call(this, e, choice)
            // mouseMove.call(this, e)
            _mv.call(this, e)
        } else{
            // mouseMove.call(this, e)
            debounce(mouseMove, 100).call(this, e, choice)
        }
    }
}


// 横纵改变
const modeChange = function(){
    let left = document.querySelector('.mode .left'),
        right = document.querySelector('.mode .right'),
        mode = document.querySelector('.mark-mode .mode')
    mode.addEventListener('click', (e)=>{
        if (e.target.classList.value.includes('left')){
            left.setAttribute('class', 'left active')
            right.setAttribute('class', 'right')
            choice = 'horizontal'
        } else if(e.target.classList.value.includes('right')){
            right.setAttribute('class', 'active right')
            left.setAttribute('class', 'left')
            choice = 'vertical'
        }
    })
    
}
modeChange()
mouseMoveControl()
