// 修改需要隐藏的部分的透明度
const hideShowParts = function(hiddenData, opacity){
    let hideList
    hiddenData.forEach((item)=>{
        hideList = document.querySelectorAll(item)
        hideList.forEach((node)=>{
            node.setAttribute('style', `opacity:${opacity}`)
        })
    })
}
const hideParts = ['canvas', 'aside']
const altShowParts = ['.avatar img']
let avatar = document.querySelector(altShowParts[0])
const ifAltShow = !avatar.src.startsWith('data')

// 修改window.print以隐藏非必要信息
if(window.matchMedia){
    let mediaQueryList = window.matchMedia('print')
    mediaQueryList.addEventListener('change', function(mql){
        if (ifAltShow){
            hideParts.concat(altShowParts)
        }
        (mql.matches)?hideShowParts(hideParts, 0):hideShowParts(hideParts, 1)
    })
}else{
    if (ifAltShow){
        hideParts.concat(altShowParts)
    }
    window.addEventListener('beforeprint', ()=>{
        hideShowParts(hideParts, '0')
    }, false)
    window.addEventListener('afterprint', ()=>{
        hideShowParts(hideParts, '1')
    }, false)
}
