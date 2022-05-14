// data 结构
// data = {
//     header: {name: string, age: number, ...others},
//     sections<section[]>: [{title:string, subtitle, 
//     span-from: str, span-to: str}, ...others
//     ]
// }

let docHeader = document.querySelector('.info'),
    dataHeader = data.header,
    docBody = data.body,
    docFooter = data.footer,
    frag = document.createDocumentFragment(),
    val, item

// 个人基础信息
console.log(dataHeader)
if(dataHeader){
    for (const prop in dataHeader){
        item = document.querySelector('.'+prop)
        if(item){
            item.textContent = prop + ': ' + dataHeader[prop]
        } else{
            item = document.createElement('div')
            item.textContent = prop + ': ' + dataHeader[prop]
            frag.appendChild(item)
        }
        
    }
}

// 工作经历、项目经历、获奖信息等





// 自我评价部分
// last-item, flex: 1