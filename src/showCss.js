var section = document.querySelector('aside'),
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

// global event bind
addHandler(textareaHTML, 'input', updateCode)
addHandler(textareaCSS, 'input', updateCode)

window.onload = updateCode()