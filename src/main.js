let ResumeDB, req, resumeStore
let add, read, readAll

const DBSelect = function(ObjectName){
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange
    if(!window.indexedDB){
        throw new Error("你的浏览器暂不支持数据库存储, 请采用最新版chrome或firefox替代!")
    }
    
    req = window.indexedDB.open(ObjectName)
    req.onerror = e=>{
        console.log("数据库打开失败", e)
    }
    req.onsuccess = e=>{
        ResumeDB = e.target.result
    }
    req.onupgradeneeded = function(e){
        ResumeDB = e.target.result
        if(!ResumeDB.objectStoreNames.contains(ObjectName)){
            resumeStore = ResumeDB.createObjectStore(ObjectName, {keyPath: 'email'})
            resumeStore.createIndex('name', 'name', {unique: false})
            resumeStore.createIndex('email', 'email', {unique: true})
        }
    }
    function add(data){
        req = ResumeDB.transaction([ObjectName], 'readwrite')
            .objectStore(ObjectName)
            .add(data)
        req.onsuccess = function(e){
            console.log("数据添加成功")
        }
        req.onerror = function(e){
            console.log("数据添加失败", e)
        }
    }
    function read(uniqueKey){
        req = ResumeDB.transaction([ObjectName], "readonly")
            .objectStore(ObjectName)
            .get(uniqueKey)
        req.onsuccess = function(e){
            console.log('数据读取成功')
            if(req.result){
                console.log("查询结果为", req.result)
            }else{
                console.log("未找到对应值")
            }
        }
        req.onerror = function(e){
            console.log("数据读取失败", e)
        }
    }
    function readAll(){
        let cur = ResumeDB.transaction([ObjectName], 'readonly')
            .objectStore(ObjectName).openCursor()
        cur.onsuccess = function(e){
            let res = e.target.result
            if(res){
                console.log("所有数据为", res)
            }else{
                console.log("数据库为空")
            }
        }
        cur.onerror = function(e){
            console.log("所有数据读取失败")
        }
    }
    function update(key, data){
        
    }
    // resumeDB.onerror = e=>{
    //     console.error("数据库错误", e.target.errorCode)
    // }
    return add, read
}

const init = function() {
    // 判断本地是否有数据
    const ObjectName = 'RESUME'
    DBSelect(ObjectName)
    // 根据本地配置进行初始化设置
}

const main = function(){
    init()
    // TODO: 操作待补充
}

main()