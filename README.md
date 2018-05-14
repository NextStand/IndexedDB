> 作者：BLUE

> 日期：2017-11-19

> 描述：indexedDB类的API文档，所有方法均为实例方法
    
## 目录
##### 1. 数据库操作idb
- new IndexedDB({})
- deletedb(name)
- closeDB(db)
- addData(db, storename, data[, callback])
- putData(db, storename, data[, callback])
- getByKey(db, storename, key[, callback])
- deleteByKey(db, storename, key)
- clearData(db, storename)
- getDataByCur(db, storename[, keyRange][, callback])
- getDataByCurInd(db, storename, indexKey[,keyRange][, callback])
- edtDataByCur(db, storename[, keyRange, params[, callback]])
- edtDataByCurInd(db, storename, indexKey[, keyRange, params[, callback]])
- delDataByCur(db, storename, keyRange[, callback])
- delDataByCurInd(db, storename, indexKey, keyRange[, callback])

##### 2. 操作条件KeyRange
- eq(x)
- lt(x)
- lte(x)
- gt(x)
- gte(x)
- ltgt(x, y)
- ltegt(x, y)
- ltgte(x, y)
- ltegte(x, y)



## API详解
#### 数据库操作
**# new IndexedDB({})**

创建indexedDB实例
- dbname  <String> 【数据库名称】 默认“db_index”
- version <String> 【数据库版本】 默认“1”
- dbstore <JSON>【对象存储空间JSON】（name:存储空间名称,keyPath:主键字段,indexKey：如果要设置索引则添加该索引字段）
- callback <Function> 【回调函数】 回调参数为数据库对象


```
let db=null;
const idb = new IndexedDB({
    dbname: "db_index",
    version: "1",
    dbstore: [{ name: 'teachers', keyPath: "id", indexKey: "age" }],
    callback(db1) { db = db1; }
});
```

**# deletedb(name)**

    删除数据库
- name <String> 【数据库名称】
---
**# closeDB(db)**

    关闭数据库

- db <Object> 【数据库对象】
---
**# addData(db, storename, data[, callback])**

    添加数据到存储空间，如果遇到相同的主键会抛出错误
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- data <JSON> 【数据JSON】
- callback <Function> 【成功后的回调】


```
var teachers = [
{id: 1001,name: "Byron",age: 21}, 
{id: 1002,name: "Frank",age: 22}, 
{id: 1003,name: "Aaron",age: 23}
];

idb.addData(db, "teachers", teachers, () => {
    alert("ok")
})
```
---
**# putData(db, storename, data[, callback])**

    添加数据到存储空间，如果遇到相同的主键会修改原有数据
    
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- data <JSON> 【数据JSON】
- callback <Function> 【成功后的回调】

**# getByKey(db, storename, key[, callback])**

    根据存储空间的键找到对应数据
    
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- key <Any> 【主键值】
- callback <Function> 【回调函数,参数为数据对象】

```
idb.getByKey(db, "teachers", idb.eq(1002), result => {
        console.log(result)
})
```
---
**# deleteByKey(db, storename, key)**

    根据存储空间的键删除某一条记录
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- key <Any> 【主键值】
---
**# clearData(db, storename)**

    删除存储空间全部记录
    
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
---
**# getDataByCur(db, storename[, keyRange][, callback])**

    通过游标查询记录

- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- keyRange <Any> 【游标条件IDBKeyRange对象或者其他】
- callback <Function> 【回调函数,参数为数据JSON】

---
```
idb.getDataByCur(db, "teachers", idb.eq(1004), result => {
    console.log(result)
})
```
---
**# getDataByCurInd(db, storename, indexKey[,keyRange][, callback])**

    通过索引游标查询记录
    
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- indexKey <String>  【索引字段名称】
- keyRange <Any> 【游标条件IDBKeyRange对象或者其他】
- callback <Function> 【回调函数,参数为数据JSON】


```
idb.getDataByCurInd(db, "teachers", "age", 24, result => {
    console.log(result)
})
```
---
**# edtDataByCur(db, storename[, keyRange, params[, callback]])**

    通过游标更新记录
    
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- keyRange <Any> 【游标条件IDBKeyRange对象或者其他】
- params    <Object>    【修改数据的参数对象】
- callback <Function> 【更新成功回调】


```
idb.edtDataByCur(db, "teachers", 1002, params2, () => {
    alert("ok")
});
```
---
**# edtDataByCurInd(db, storename, indexKey[, keyRange, params[, callback]])**

    通过索引游标更新记录


- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- indexKey <String>  【索引字段名称】
- keyRange <Any> 【游标条件IDBKeyRange对象或者其他】
- params    <Object>    【修改数据的参数对象】
- callback <Function> 【更新成功回调】


```
idb.edtDataByCurInd(db, "teachers", "age", idb.ltegt(21, 24), { name: "PINK" }, () => {
    alert("OK")
})
```
---
**# delDataByCur(db, storename, keyRange[, callback])**

    通过游标删除记录
    

- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- keyRange <Any> 【游标条件IDBKeyRange对象或者其他】
- callback <Function> 【删除成功回调】
---
**# delDataByCurInd(db, storename, indexKey, keyRange[, callback])**

    通过索引游标删除记录
    
- db <Object> 【数据库对象】
- storename <String> 【存储空间名称】
- indexKey <String>  【索引字段名称】
- keyRange <Any> 【游标条件IDBKeyRange对象或者其他】
- callback <Function> 【删除成功回调】
---
#### 操作条件

每个方法都返回一个KeyRange对象

操作 | 翻译 | 函数 
---|---|---
等于 | keys = x| eq(x)
小于 | All keys < x| lt(x) 
小于等于 | All keys ≤ x | lte(x)
大于 | All keys > x | gt(x)
大于等于 | All keys ≥ x | gte(x)
大于且小于 | All keys > x &&< y| ltgt(x, y)
大于等于且小于 | All keys ≥ x &&< y | ltegt(x, y)
大于且小于等于 | All keys > x && ≤ y | ltgte(x, y)
大于等于且小于等于 | All keys ≥ x && ≤ y| ltegte(x, y)

