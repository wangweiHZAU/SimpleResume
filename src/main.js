const DBSelect = function(PersonName){
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange
    if(!window.indexedDB){
        throw new Error("你的浏览器暂不支持数据库存储, 请采用最新版chrome或firefox替代!")
    }
    let resumeDB, req
    req = window.indexedDB.open(PersonName)
    req.onerror = e=>{
        console.log("数据库打开失败", e)
    }
    req.onsuccess = e=>{
        resumeDB = e.target.result
        return resumeDB
    }
    // resumeDB.onerror = e=>{
    //     console.error("数据库错误", e.target.errorCode)
    // }
}

const init = function() {
    // 判断本地是否有数据
    const PersonName = 'RESUME'
    DBSelect(PersonName)
    // 根据本地配置进行初始化设置
}

const main = function(){
    init()
    // TODO: 操作待补充
}

main()