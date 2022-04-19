var addHandler = document.body.addEventListener?
    function(target, eventType, handler){
        target.addEventListener(eventType, handler, false)
    } :
    function(target, eventType, handler){
        target.attachEvent('on' + eventType, handler)
    }

var removeHandler = document.body.removeEventListener ?
    function(target, eventType, handler){
        target.removeEventListener(eventType, handler, false)
    } :
    function(target, eventType, handler){
        target.detachEvent('on' + eventType, handler)
    }