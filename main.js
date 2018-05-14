import IndexedDB from "./src/js/IndexedDB"
let db = null;
var putdata = [
    {
        id: 1002,
        name: "BLUE",
        age: 21
    }
]
var teachers = [{
    id: 1001,
    name: "Byron",
    age: 21
}, {
    id: 1002,
    name: "Frank",
    age: 22
}, {
    id: 1003,
    name: "Aaron",
    age: 23
}, {
    id: 1004,
    name: "Aaron",
    age: 24
}, {
    id: 1005,
    name: "Byron",
    age: 24
}, {
    id: 1006,
    name: "Frank",
    age: 30
}, {
    id: 1007,
    name: "Aaron",
    age: 26
}, {
    id: 1008,
    name: "Aaron",
    age: 27
}];
const idb = new IndexedDB({
    dbname: "db_index",
    version: "1",
    dbstore: [{ name: 'teachers', keyPath: "id", indexKey: "age" }],
    callback(db1) { db = db1; }
});
$("#add").click(function () {
    idb.addData(db, "teachers", teachers, () => {
        alert("ok")
    })
})
$("#put").click(function () {
    idb.putData(db, "teachers", putdata, () => {
        alert("ok")
    })
})
$("#get").click(function () {
    idb.getByKey(db, "teachers", idb.eq(1002), result => {
        console.log(result)
    })
})
$("#del").click(function () {
    alert(idb.deleteByKey(db, "teachers", 1002))
})
$("#delall").click(function () {
    alert(idb.clearData(db, "teachers"))
})
$("#curget").click(function () {
    idb.getDataByCur(db, "teachers", IDBKeyRange.only(1004), result => {
        console.log(result)
    })
})
$("#curindexget").click(function () {
    let key = IDBKeyRange.bound(24, 25, false, true);
    idb.getDataByCurInd(db, "teachers", "age", 24, result => {
        console.log(result)
    })
})
$("#curedt").click(function () {
    let params2 = {
        name: "哈哈哈",
        age: 10,
        habby: [1, 2, 3, 4]
    }
    idb.edtDataByCur(db, "teachers", 1002, params2, () => {
        alert("ok")
    });
})
$("#curdel").click(function () {
    idb.delDataByCur(db, "teachers", 1002, () => {
        alert("ok")
    });
})
$('#curindexedt').click(function () {
    idb.edtDataByCurInd(db, "teachers", "age", IDBKeyRange.bound(21, 24, false, true), { name: "PINK" }, () => {
        alert("OK")
    })
})
$("#curindexdel").click(function () {
    idb.delDataByCurInd(db, "teachers", "age", 24, () => {
        alert("删除成功")
    })
})
$("#dropdb").click(function () {
    idb.deletedb("db_index")
})