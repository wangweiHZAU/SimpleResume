const addHandler = document.body.addEventListener?
    function(target, eventType, handler){
        target.addEventListener(eventType, handler, false)
    } :
    function(target, eventType, handler){
        target.attachEvent('on' + eventType, handler)
    }

const removeHandler = document.body.removeEventListener ?
    function(target, eventType, handler){
        target.removeEventListener(eventType, handler, false)
    } :
    function(target, eventType, handler){
        target.detachEvent('on' + eventType, handler)
    }

const hideShowParts = function(hiddenData, opacity){
    let hideList
    hiddenData.forEach((item)=>{
        hideList = document.querySelectorAll(item)
        hideList.forEach((node)=>{
            node.setAttribute('style', `opacity:${opacity}`)
        })
    })
}

const changePrint = function(hiddenData){
    if(window.matchMedia){
        let mediaQueryList = window.matchMedia('print')
        mediaQueryList.addEventListener('change', function(mql){
            (mql.matches)?hideShowParts(hiddenData, 0):hideShowParts(hiddenData, 1)
        })
    }else{
        window.addEventListener('beforeprint', ()=>{
            hideShowParts(hiddenData, '0')
        }, false)
        window.addEventListener('afterprint', ()=>{
            hideShowParts(hiddenData, '1')
        }, false)
    }
}

changePrint(['canvas', 'aside'])