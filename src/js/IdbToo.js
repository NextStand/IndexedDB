/**
 * 日期：2017-11-17
 * 作者：BLUE
 * 描述：本地数据库基类,基于indexedDB，主要是一些工具
*/
export default class IdbToo {
    /// <summary>
    /// 创建对象存储空间
    /// </summary>
    /// <param name="db">数据库对象</param>
    /// <param name="element">存储空间配置项</param>
    /// <returns>存储空间对象</returns>
    _mkstore(db, element) {
        alert(1)
        let _self = this;
        if (!db.objectStoreNames.contains(element.name)) {
            let store = db.createObjectStore(element.name, { keyPath: element.keyPath });
            if (element.hasOwnProperty("indexKey") && element.indexKey) {
                _self._storeIndex(store, element.indexKey)
            }
            return store;
        }
    }
    /// <summary>
    /// 创建索引
    /// </summary>
    /// <param name="store">存储空间</param>
    /// <param name="indexKey">索引字段</param>
    /// <returns>null</returns>
    _storeIndex(store, indexKey) {
        store.createIndex(indexKey, indexKey, { unique: false });
    }
    /// <summary>
    /// 收集数据
    /// </summary>
    _colGetData(request,callback){
        let customers = [];
        request.onsuccess = function (e) {
            let cursor = e.target.result;
            if (cursor) {
                customers.push(cursor.value);
                cursor.continue();
            } else {
                callback && callback(customers);
            }
        };
    }
    /// <summary>
    /// 根据游标keyRange获取request
    /// </summary>
    _getCurRequest(db,storename,keyRange){
        let store = db.transaction(storename, 'readwrite').objectStore(storename),
            request = store.openCursor(keyRange);
        return request;
    }
    /// <summary>
    /// 根据游标索引keyRange获取request
    /// </summary>
    _getCurIndRequest(db,storename,indexKey,keyRange){
        let store = db.transaction(storename, 'readwrite').objectStore(storename),
            request = store.index(indexKey).openCursor(keyRange);
        return request;
    }
    /// <summary>
    /// 更新数据
    /// </summary>
    _edtCurData(request,params,callback){
        request.onsuccess = function (e) {
            let cursor = e.target.result,
                value,
                updateRequest;
            if (cursor) {
                    value = cursor.value;
                    for (let key in params) {
                        value[key] = params[key];
                    }
                    updateRequest = cursor.update(value);
                    updateRequest.onerror = function () {
                        throw new Error('The cursor update failed');
                    };
                    cursor.continue();
            }else{
                callback&&callback();
            }
        };
    }
    /// <summary>
    /// 删除数据
    /// </summary>
    _delCurData(request,callback){
        request.onsuccess = function (e) {
            let cursor = e.target.result,
                value,
                deleteRequest;
            if (cursor) {
                    deleteRequest = cursor.delete();
                    deleteRequest.onerror = function () {
                        throw new Error("Cursor deletion failed");
                    };
                    cursor.continue();
            }else{
                callback&&callback();
            }
        };
    }
}