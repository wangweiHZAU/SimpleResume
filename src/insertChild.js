
let docHeader = document.querySelector('.info'),
    dataHeader = data.header,
    docBody = data.body,
    docFooter = data.footer,
    frag = document.createDocumentFragment(),
    sections = data.sections,
    val, item

const nameDict = {
    education: "教育经历",
    professional: "职业经历",
    project: "项目经历",
    summary: "个人总结"
}

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

const createSection = function(){
    let sec = document.createElement('section')
    sec.setAttribute('class', 'content')
    // sec.contentEditable = true
    sec.draggable = true
    return sec
}
const createTitle = function(title){
    let div = document.createElement('div')
    div.setAttribute('class', 'decorate')
    div.innerHTML = `<div class="title">${title}</div>`
    return div
}
const createEducationItem = function(dataItem){
    let item = document.createElement('div')
    item.setAttribute('class', 'item-header')
    let template =  `
        <div class="header-content title">
            ${dataItem.school}
        </div>
        <div class="header-major-degree">
            ${dataItem.major} - ${dataItem.degree}
        </div>
        <div class="header-year">
            ${dataItem.spanFrom}-${dataItem.spanTo}
        </div>
    `
    item.innerHTML = template
    return item
}

const createProfessionalItem = function(dataItem){
    let item = document.createElement('div')
    item.setAttribute('class', 'item-header')
    let template =  `
        <div class="header-content title">
            ${dataItem.company}
        </div>
        <div class="header-position">
            ${dataItem.position}
        </div>
        <div class="header-year">
            ${dataItem.spanFrom}-${dataItem.spanTo}
        </div>
        <div class="profession-content">
            ${dataItem.content}
        </div>
    `
    item.innerHTML = template
    return item 
}

const createProjectItem = function(dataItem){
    let item = document.createElement('div')
    item.setAttribute('class', 'item-header')
    let template =  `
        <div class="header-content title">
            ${dataItem.projectName}
        </div>
        <div class="header-year">
            ${dataItem.spanFrom}-${dataItem.spanTo}
        </div>
        <div class="profession-content">
            ${dataItem.content}
        </div>
    `
    item.innerHTML = template
    return item 
}

const createSummaryItem = function(item){
    let itemList = []
    item.forEach(function(item){
        let div = document.createElement('div')
        div.textContent = item
        itemList.push(div)
    })
    return itemList
}

// 工作经历、项目经历、获奖信息等
if (sections.education){
    let education = sections.education,
        sec = createSection()
    sec.appendChild(createTitle("教育经历"))
    education.forEach(function(dataItem){
        sec.appendChild(createEducationItem(dataItem))
    })
    // document.querySelector('#container').appendChild(sec)
    frag.appendChild(sec)
}

if(sections.professionalExperience){
    let profession = sections.professionalExperience,
    sec = createSection()
    sec.appendChild(createTitle("职业经历"))
    profession.forEach(function(dataItem){
        sec.appendChild(createProfessionalItem(dataItem))
    })
    // document.querySelector('#container').appendChild(sec)
    frag.appendChild(sec) 
}

if(sections.projectExperience){
    let project = sections.projectExperience,
    sec = createSection()
    sec.appendChild(createTitle("项目经历"))
    project.forEach(function(dataItem){
        sec.appendChild(createProjectItem(dataItem))
    })
    // document.querySelector('#container').appendChild(sec)
    frag.appendChild(sec)  
}

// if(sections.summary){
//     let summary = sections.summary,
//     sec = createSection()
//     sec.appendChild(createTitle("个人总结"))
//     sec.appendChild(createSummaryItem(summary))
//     // document.querySelector('#container').appendChild(sec)
//     frag.appendChild(sec) 
// }
document.querySelector('#container').appendChild(frag)
// 自我评价部分
// last-item, flex: 1