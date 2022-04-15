class Draggable{
  constructor(options){
    this.parent = options.element;
    this.cloneElementClassName = options.cloneElementClassName;
    this.isPointerDown = false;
    this.diff = {x:0, y:0}
    this.drag = {element: null, index:0, lastIndex:0}
    this.drop = {element: null, index:0, lastIndex:0}
    this.clone = {element: null, x:0, y:0}
    this.lastPointerMove = {x: 0, y:0}
    this.rectList = []
    this.init()
  }

  init(){
    this.getRect()
    this.bindEventListener()
  }

  getRect(){
    this.rectList.length = 0
    for (const item of this.parent.children){
      this.rectList.push(item.getBoundingClientRect())
    }
  }

  handlePointerDown(event){
    if (event.pointerType === 'mouse' && event.button !== 0){
      return 
    }
    if (event.target === this.parent){
      return 
    }
    this.isPointerDown = true
    this.parent.setPointerCapture(event.pointerId)
    this.lastPointerMove.x = event.clientX
    this.lastPointerMove.y = event.clientY
    this.drag.element = event.target
    this.drag.element.classList.add('active')
    this.clone.element = this.drag.element.cloneNode(true)
    this.drag.element.className = this.cloneElementClassName
    this.clone.element.style.transition = 'none'
    const i = [].indexOf.call(this.parent.children, this.drag.element)
    this.clone.x = this.rectList[i].left
    this.clone.y = this.rectList[i].top
    this.drag.index = i
    this.drag.lastIndex = i
    this.clone.element.style.transform = 'translate3d('
      + this.clone.x + 'px,'+this.clone.y + 'px, 0)'
    // 将新增节点添加到模型尾部
    document.body.appendChild(this.clone.element)
  }

  handlePointerMove(e){
    if(this.isPointerDown){
      this.diff.x = e.clientX - this.lastPointerMove.x
      this.diff.y = e.clientY - this.lastPointerMove.y
      this.lastPointerMove.x = e.clientX
      this.lastPointerMove.y = e.clientY
      this.clone.x += this.diff.x
      this.clone.y += this.diff.y
      this.clone.element.style.transform = 'translate3d('
        + this.clone.x + 'px, ' + this.clone.y + 'px, 0)'
      for (let i=0, len=this.rectList.length; i<len; ++i){
        if(e.clientX > this.rectList[i].left && e.clientX <this.rectList[i].right 
          && e.clientY>this.rectList[i].top && e.clientY < this.rectList[i].bottom){
          this.drop.element = this.parent.children[i]
          console.log(this.rectList)
          this.drop.lastIndex = i
          if(this.drag.element !== this.drop.element){
            if(this.drag.index < i){
              this.parent.insertBefore(this.drag.element, this.drag.element.nextElementSibling)
              this.drop.index = i - 1
            } else{
              this.parent.insertBefore(this.drag.element, this.drop.element)
              this.drop.index = i + 1
            }
            this.drag.index = i 
            const dragRect = this.rectList[this.drag.index]
            const lastDragRect = this.rectList[this.drag.lastIndex]
            const dropRect = this.rectList[this.drop.index]
            const lastDropRect = this.rectList[this.drop.lastIndex]
            console.log('dragIndex', this.drop)
            this.drag.lastIndex = i 
            this.drag.element.style.transition = 'none'
            this.drop.element.style.transition = 'none'
            this.drag.element.style.transform = 'translate3d('+
              (lastDragRect.left-dragRect.left)+'px, '+
              (lastDragRect.top-dragRect.top) + 'px, 0)'
            this.drop.element.style.transform = 'translate3d('+
              (lastDropRect.left-dropRect.left)+'px, '+
              (lastDropRect.top-dropRect.top) + 'px, 0)'
            
            this.drag.element.offsetWidth; // 重绘
            this.drag.element.style.transition = 'transform 150ms'
            this.drop.element.style.transition = 'transform 150ms'
            this.drag.element.style.transform = 'translate3d(0, 0, 0)'
            this.drop.element.style.transform = 'translate3d(0, 0, 0)'
          }
          break
        }
      }
    }
  }

  handlePointerUp(){
    if(this.isPointerDown){
      this.isPointerDown = false
      this.drag.element.classList.remove('active');
      this.clone.element.remove()
    }
  }

  bindEventListener(){
    this.handlePointerDown = this.handlePointerDown.bind(this)
    this.handlePointerMove = this.handlePointerMove.bind(this)
    this.handlePointerUp = this.handlePointerUp.bind(this)
    this.getRect = this.getRect.bind(this)

    this.parent.addEventListener('pointerdown', this.handlePointerDown)
    this.parent.addEventListener('pointermove', this.handlePointerMove)
    this.parent.addEventListener('pointerup', this.handlePointerUp)
    this.parent.addEventListener('pointercancel', this.handlePointerUp)

    window.addEventListener('scroll', this.getRect)
    window.addEventListener('resize', this.getRect)
    window.addEventListener('orientationchange', this.getRect)
  }

  removeEventListener(){
    this.parent.removeEventListener('pointermove', this.handlePointerMove)
    this.parent.removeEventListener('pointerdown', this.handlePointerDown)
    this.parent.removeEventListener('pointerup', this.handlePointerUp)
    this.parent.removeEventListener('pointercancel', this.handlePointerUp)

    window.removeEventListener('scroll', this.getRect)
    window.removeEventListener('resize', this.getRect)
    window.removeEventListener('orientationchange', this.getRect)
  }  
}

// new Draggable({
//   element:document.querySelector('.grid'),
//   cloneElementClassName: 'clone-grid-item'
// })