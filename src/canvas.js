const canvas = document.querySelector('#ref-line')
const ctx = canvas.getContext('2d')
const body = document.body.getBoundingClientRect()

let hover = true,
    click = true,
    doubleClick = false,
    width = body.width,
    height = body.height


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
    const mousemove = function(e){
        if(e.target.id === 'ref-line'){
            ctx.clearRect(0, 0, width, height)
            drawLine([[0, e.clientY], [width, e.clientY]], 'blue')
            drawLine([[e.clientX, 0], [e.clientX, height]], 'red')
        }
    }
    window.onmousemove = function(e){
        if(_mv){
            mousemove.call(this, e)
            _mv.call(this, e)
        } else{
            mousemove.call(this, e)
        }
    }
}

mouseMoveControl()