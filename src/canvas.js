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
const storeVerticalLine = [] // 存储已经标记过的纵坐标
const storeHorizontalLine = [] // 存储已经标记过的横坐标
let choice = 'horizontal' || 'vertical'

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

const repaintMark = function(){
    storeHorizontalLine.map(item =>{
        drawLine([[0, item], [width, item]], '#aaa')
    })
    storeVerticalLine.map(item =>{
        drawLine([[item-cLeft, 0], [item-cLeft, height]], '#aaa') 
    })
}

// 改变鼠标移动事件
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
                console.log('未指定横纵辅助线')
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
// 添加标注点
let _click
if (window.onclick){
    _click = window.onclick
}
window.onclick = function(e){
    if(choice === 'horizontal'){
        storeHorizontalLine.push(e.pageY)
        drawLine([[0, e.pageY], [width, e.pageY]], '#aaa')
    } else if(choice === 'vertical'){
        storeVerticalLine.push(e.pageX)
        drawLine([[e.pageX-cLeft, 0], [e.pageX-cLeft, height]], '#aaa')
    }
    if(_click){        
    _click.call(this, e)
    }
}


mouseMoveControl()