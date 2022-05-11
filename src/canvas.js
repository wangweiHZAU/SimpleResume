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
const storeLine = [] // 存储已经标记过的点

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


// 改变鼠标移动事件
ctx.lineWidth = 1
ctx.translate(0.1, 0.1)
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
    const mouseMove = function(e){
        if(e.clientX >= cLeft && e.clientX <= cRight && hover){
        ctx.clearRect(0, 0, width, height)
        // TODO: 横纵分别表示
        drawLine([[0, e.pageY], [width, e.pageY]], 'blue')
        drawLine([[e.clientX-cLeft, 0], [e.clientX-cLeft, height]], 'red')
        } else{
            ctx.clearRect(0, 0, width, height)
            // TODO: 添加已标注坐标
        }
    }
    window.onmousemove = function(e){
        if(_mv){
            debounce(mouseMove, 100).call(this, e)
            // mouseMove.call(this, e)
            _mv.call(this, e)
        } else{
            // mouseMove.call(this, e)
            debounce(mouseMove, 100).call(this, e)
        }
    }
}
// TODO: 建立标记数组
window.onclick = function(e){
    console.log(centerPart[0].top, e)
}


mouseMoveControl()