// data 结构
// data = {
//     header: {name: string, age: number, ...others},
//     sections<section[]>: [{title:string, subtitle, 
//     span-from: str, span-to: str}, ...others
//     ],
//     footer: [str, ...others]
// }

let docHeader = document.querySelector('.info'),
    dataHeader = data.header,
    itemList = [], 
    val
for (const item in dataHeader){
    val = document.createElement(item)
    val.textContent = dataHeader.item
    itemList.push(val)
}
itemList.map(item=>{
    docHeader.appendChild(item)
})