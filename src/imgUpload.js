let file = document.querySelector('#file'),
    img = document.querySelector('img')
file.onchange = function(){
    let avatar = this.files[0],
        pat = /^image/,
        reader = new FileReader();
    if(avatar){
        if(!pat.test(avatar.type)){
            alert('只支持图片!')
        }
        reader.readAsDataURL(avatar)
        reader.onload = function(e){
            img.setAttribute('src', this.result)
        }
    }
}