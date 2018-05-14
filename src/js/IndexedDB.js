/**
 * 日期：2017-11-17
 * 作者：BLUE
 * 描述：本地数据库操作类,基于indexedDB
*/
import IdbToo from "./IdbToo"
import KeyRange from "./KeyRange"
function mix(...mixins) {
    class Mix { }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝实例属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor"
            && key !== "prototype"
            && key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
export default class IndexedDB extends mix(IdbToo, KeyRange) {
    /// <summary>
    /// 构造函数
    /// </summary>
    /// <param name="dbname">数据库名称</param>
    /// <param name="version">数据库版本号</param>
    /// <param name="callback">数据库开启或创建成功的回调</param>
    /// <param name="dbstore">对象存储空间JSON[{name:"test",keyPath:"id",indexKey:"age"}]存储空间名称和主键和索引（索引可以为空）</param>
    /// <returns>null</returns>
    constructor({ dbname = "db_index", version = "1", dbstore, callback } = {}) {
        super();
        this.dbname = dbname;
        this.version = version;
        this.openDB(dbstore, callback);
    }
    openDB(dbstore, callback) {
        //建立或打开数据库
        let indexedDb = window.indexedDB || window.webkitindexedDB,
            request = indexedDb.open(this.dbname, this.version),
            _self = this;
        request.onerror = function (e) {
            throw new Error(e.currentTarget.error.message);
        };
        request.onsuccess = function (e) {
            callback && callback(e.target.result);
        };
        request.onupgradeneeded = function (e) {
            let db = e.target.result;
            if (dbstore) {
                dbstore.forEach(function (element) {
                    _self._mkstore(db, element)
                });
            }
        }
    }
    /// <summary>
    /// 删除数据库实例
    /// </summary>
    /// <param name="name">数据库名称</param>
    /// <returns>成功ok，失败任意值</returns>
    deletedb(name) {
        let indexedDb = window.indexedDB || window.webkitindexedDB;
        indexedDb.deleteDatabase(name);
        return "ok";
    }
    closeDB(db) {
        //关闭数据库
        db.close();
    }
    /// <summary>
    /// 添加数据，重复添加会报错
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="data">数据JSON</param>
    /// <param name="callback">回调函数</param>
    /// <returns>null</returns>
    addData(db, storename, data, callback) {
        let store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
        for (let i = 0; i < data.length; i++) {
            request = store.add(data[i]);
            request.onerror = function () {
                throw new Error('This data is already in the database');
            };
        }
        callback && callback();
    }
    /// <summary>
    /// 添加数据，重复添加会更新原有数据
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="data">数据JSON</param>
    /// <param name="callback">回调函数</param>
    /// <returns>null</returns>
    putData(db, storename, data, callback) {
        let store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
        for (var i = 0; i < data.length; i++) {
            request = store.put(data[i]);
            request.onerror = function () {
                throw new Error('fail to put')
            };
        }
        callback && callback();
    }
    /// <summary>
    /// 根据存储空间的键找到对应数据
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="key">主键值</param>
    /// <param name="callback">回调参数为数据</param>
    /// <returns>null</returns>
    getByKey(db, storename, key, callback) {
        let store = db.transaction(storename, 'readwrite').objectStore(storename),
            request = store.get(key);
        request.onerror = function () {
            throw new Error('getByKey error');
        };
        request.onsuccess = function (e) {
            let result = e.target.result;
            callback && callback(result);
        };
    }
    /// <summary>
    /// 根据存储空间的键删除某一条记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="key">主键值</param>
    /// <returns>成功ok，失败其他值</returns>
    deleteByKey(db, storename, key) {
        let store = db.transaction(storename, 'readwrite').objectStore(storename);
        store.delete(key);
        return "ok";
    }
    /// <summary>
    /// 删除存储空间全部记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <returns>成功ok，失败其他值</returns>
    clearData(db, storename) {
        let store = db.transaction(storename, 'readwrite').objectStore(storename);
        store.clear();
        return "ok";
    }
    /// <summary>
    /// 通过游标查询记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="keyRange">游标条件IDBKeyRange对象</param>
    ///<param name="callback">回调参数为数据JSON</param>
    /// <returns>null</returns>
    getDataByCur(db, storename, keyRange = "", callback) {
        let request = super._getCurRequest(db, storename, keyRange);
        super._colGetData(request, callback);
    }
    /// <summary>
    /// 通过索引游标查询记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="indexKey">索引字段名称</param>
    /// <param name="keyRange">游标条件IDBKeyRange对象</param>
    ///<param name="callback">回调参数为数据JSON</param>
    /// <returns>null</returns>
    getDataByCurInd(db, storename, indexKey, keyRange = '', callback) {
        let request = super._getCurIndRequest(db, storename, indexKey, keyRange);
        super._colGetData(request, callback);
    }
    /// <summary>
    /// 通过游标更新记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="keyRange">游标条件IDBKeyRange对象</param>
    /// <param name="params">更新数据对象</param>
    ///<param name="callback">更新成功回调</param>
    /// <returns>null</returns>
    edtDataByCur(db, storename, keyRange = '', params, callback) {
        let request = super._getCurRequest(db, storename, keyRange);
        super._edtCurData(request, params, callback);
    }
    /// <summary>
    /// 通过索引游标更新记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="indexKey">索引字段名称</param>
    /// <param name="keyRange">游标条件IDBKeyRange对象</param>
    /// <param name="params">更新数据对象</param>
    ///<param name="callback">更新完成之后的回调</param>
    /// <returns>null</returns>
    edtDataByCurInd(db, storename, indexKey, keyRange = '', params, callback) {
        let request = super._getCurIndRequest(db, storename, indexKey, keyRange);
        super._edtCurData(request, params, callback);
    }
    /// <summary>
    /// 通过游标删除记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="keyRange">游标条件IDBKeyRange对象</param>
    /// <param name="callback">删除成功回调</param>
    /// <returns>null</returns>
    delDataByCur(db, storename, keyRange, callback) {
        let request = super._getCurRequest(db, storename, keyRange);
        super._delCurData(request, callback);
    }
    /// <summary>
    /// 通过索引游标删除记录
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="storename">存储空间名称</param>
    /// <param name="indexKey">索引字段名称</param>
    /// <param name="keyRange">游标条件IDBKeyRange对象</param>
    ///<param name="callback">删除成功回调</param>
    /// <returns>null</returns>
    delDataByCurInd(db, storename, indexKey, keyRange, callback) {
        let request = super._getCurIndRequest(db, storename, indexKey, keyRange);
        super._delCurData(request, callback);
    }
}