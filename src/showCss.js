var section = document.querySelector('section'),
    editor = document.querySelector('.editor'),
    textareaHTML = document.querySelector('.editable-html'),
    textareaCSS = document.querySelector('editable-css'),
    reset = document.querySelector('.reset'),
    htmlCode = textareaHTML.value,
    cssCode = textareaCSS.value

document.querySelector('body').insertBefore(textareaCSS)
function updateCode(){
    editor.innerHTML = textareaCSS.value;
    section.innerHTML = textareaHTML.value;
}

reset.click = function(){
    textareaHTML.value = htmlCode
    textareaCSS.value = cssCode
    updateCode()    
}

textareaHTML.addEventListener('input', updateCode)
textareaCSS.addEventListener('input', updateCode)
window.onload = updateCode()