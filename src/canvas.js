const canvas = document.querySelector('#ref-line')
const ctx = canvas.getContext('2d')
const body = document.body.getBoundingClientRect()

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
    const mouseMove = function(e){
        if(e.target.id === 'ref-line'){
            ctx.clearRect(0, 0, width, height)
            console.log(e.clientX, e.clientY)
            drawLine([[0, e.clientY], [width, e.clientY]], 'blue')
            drawLine([[e.clientX, 0], [e.clientX, height]], 'red')
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


mouseMoveControl()