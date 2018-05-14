/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _IndexedDB = __webpack_require__(1);

var _IndexedDB2 = _interopRequireDefault(_IndexedDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;
var putdata = [{
    id: 1002,
    name: "BLUE",
    age: 21
}];
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
var idb = new _IndexedDB2.default({
    dbname: "db_index",
    version: "1",
    dbstore: [{ name: 'teachers', keyPath: "id", indexKey: "age" }],
    callback: function callback(db1) {
        db = db1;
    }
});
$("#add").click(function () {
    idb.addData(db, "teachers", teachers, function () {
        alert("ok");
    });
});
$("#put").click(function () {
    idb.putData(db, "teachers", putdata, function () {
        alert("ok");
    });
});
$("#get").click(function () {
    idb.getByKey(db, "teachers", idb.eq(1002), function (result) {
        console.log(result);
    });
});
$("#del").click(function () {
    alert(idb.deleteByKey(db, "teachers", 1002));
});
$("#delall").click(function () {
    alert(idb.clearData(db, "teachers"));
});
$("#curget").click(function () {
    idb.getDataByCur(db, "teachers", IDBKeyRange.only(1004), function (result) {
        console.log(result);
    });
});
$("#curindexget").click(function () {
    var key = IDBKeyRange.bound(24, 25, false, true);
    idb.getDataByCurInd(db, "teachers", "age", 24, function (result) {
        console.log(result);
    });
});
$("#curedt").click(function () {
    var params2 = {
        name: "哈哈哈",
        age: 10,
        habby: [1, 2, 3, 4]
    };
    idb.edtDataByCur(db, "teachers", 1002, params2, function () {
        alert("ok");
    });
});
$("#curdel").click(function () {
    idb.delDataByCur(db, "teachers", 1002, function () {
        alert("ok");
    });
});
$('#curindexedt').click(function () {
    idb.edtDataByCurInd(db, "teachers", "age", IDBKeyRange.bound(21, 24, false, true), { name: "PINK" }, function () {
        alert("OK");
    });
});
$("#curindexdel").click(function () {
    idb.delDataByCurInd(db, "teachers", "age", 24, function () {
        alert("删除成功");
    });
});
$("#dropdb").click(function () {
    idb.deletedb("db_index");
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _IdbToo = __webpack_require__(2);

var _IdbToo2 = _interopRequireDefault(_IdbToo);

var _KeyRange = __webpack_require__(3);

var _KeyRange2 = _interopRequireDefault(_KeyRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * 日期：2017-11-17
                                                                                                                                                           * 作者：BLUE
                                                                                                                                                           * 描述：本地数据库操作类,基于indexedDB
                                                                                                                                                          */


function mix() {
    var Mix = function Mix() {
        _classCallCheck(this, Mix);
    };

    for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

        for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mixin = _step.value;

            copyProperties(Mix, mixin); // 拷贝实例属性
            copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return Mix;
}

function copyProperties(target, source) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Reflect.ownKeys(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (key !== "constructor" && key !== "prototype" && key !== "name") {
                var desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

var IndexedDB = function (_mix) {
    _inherits(IndexedDB, _mix);

    /// <summary>
    /// 构造函数
    /// </summary>
    /// <param name="dbname">数据库名称</param>
    /// <param name="version">数据库版本号</param>
    /// <param name="callback">数据库开启或创建成功的回调</param>
    /// <param name="dbstore">对象存储空间JSON[{name:"test",keyPath:"id",indexKey:"age"}]存储空间名称和主键和索引（索引可以为空）</param>
    /// <returns>null</returns>
    function IndexedDB() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$dbname = _ref.dbname,
            dbname = _ref$dbname === undefined ? "db_index" : _ref$dbname,
            _ref$version = _ref.version,
            version = _ref$version === undefined ? "1" : _ref$version,
            dbstore = _ref.dbstore,
            callback = _ref.callback;

        _classCallCheck(this, IndexedDB);

        var _this = _possibleConstructorReturn(this, (IndexedDB.__proto__ || Object.getPrototypeOf(IndexedDB)).call(this));

        _this.dbname = dbname;
        _this.version = version;
        _this.openDB(dbstore, callback);
        return _this;
    }

    _createClass(IndexedDB, [{
        key: "openDB",
        value: function openDB(dbstore, callback) {
            //建立或打开数据库
            var indexedDb = window.indexedDB || window.webkitindexedDB,
                request = indexedDb.open(this.dbname, this.version),
                _self = this;
            request.onerror = function (e) {
                throw new Error(e.currentTarget.error.message);
            };
            request.onsuccess = function (e) {
                callback && callback(e.target.result);
            };
            request.onupgradeneeded = function (e) {
                var db = e.target.result;
                if (dbstore) {
                    dbstore.forEach(function (element) {
                        _self._mkstore(db, element);
                    });
                }
            };
        }
        /// <summary>
        /// 删除数据库实例
        /// </summary>
        /// <param name="name">数据库名称</param>
        /// <returns>成功ok，失败任意值</returns>

    }, {
        key: "deletedb",
        value: function deletedb(name) {
            var indexedDb = window.indexedDB || window.webkitindexedDB;
            indexedDb.deleteDatabase(name);
            return "ok";
        }
    }, {
        key: "closeDB",
        value: function closeDB(db) {
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

    }, {
        key: "addData",
        value: function addData(db, storename, data, callback) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename),
                request = void 0;
            for (var i = 0; i < data.length; i++) {
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

    }, {
        key: "putData",
        value: function putData(db, storename, data, callback) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename),
                request = void 0;
            for (var i = 0; i < data.length; i++) {
                request = store.put(data[i]);
                request.onerror = function () {
                    throw new Error('fail to put');
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

    }, {
        key: "getByKey",
        value: function getByKey(db, storename, key, callback) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename),
                request = store.get(key);
            request.onerror = function () {
                throw new Error('getByKey error');
            };
            request.onsuccess = function (e) {
                var result = e.target.result;
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

    }, {
        key: "deleteByKey",
        value: function deleteByKey(db, storename, key) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename);
            store.delete(key);
            return "ok";
        }
        /// <summary>
        /// 删除存储空间全部记录
        /// </summary>
        /// <param name="db">数据库对象</param>
        /// <param name="storename">存储空间名称</param>
        /// <returns>成功ok，失败其他值</returns>

    }, {
        key: "clearData",
        value: function clearData(db, storename) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename);
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

    }, {
        key: "getDataByCur",
        value: function getDataByCur(db, storename) {
            var keyRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var callback = arguments[3];

            var request = _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_getCurRequest", this).call(this, db, storename, keyRange);
            _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_colGetData", this).call(this, request, callback);
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

    }, {
        key: "getDataByCurInd",
        value: function getDataByCurInd(db, storename, indexKey) {
            var keyRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
            var callback = arguments[4];

            var request = _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_getCurIndRequest", this).call(this, db, storename, indexKey, keyRange);
            _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_colGetData", this).call(this, request, callback);
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

    }, {
        key: "edtDataByCur",
        value: function edtDataByCur(db, storename) {
            var keyRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            var params = arguments[3];
            var callback = arguments[4];

            var request = _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_getCurRequest", this).call(this, db, storename, keyRange);
            _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_edtCurData", this).call(this, request, params, callback);
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

    }, {
        key: "edtDataByCurInd",
        value: function edtDataByCurInd(db, storename, indexKey) {
            var keyRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
            var params = arguments[4];
            var callback = arguments[5];

            var request = _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_getCurIndRequest", this).call(this, db, storename, indexKey, keyRange);
            _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_edtCurData", this).call(this, request, params, callback);
        }
        /// <summary>
        /// 通过游标删除记录
        /// </summary>
        /// <param name="db">数据库对象</param>
        /// <param name="storename">存储空间名称</param>
        /// <param name="keyRange">游标条件IDBKeyRange对象</param>
        /// <param name="callback">删除成功回调</param>
        /// <returns>null</returns>

    }, {
        key: "delDataByCur",
        value: function delDataByCur(db, storename, keyRange, callback) {
            var request = _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_getCurRequest", this).call(this, db, storename, keyRange);
            _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_delCurData", this).call(this, request, callback);
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

    }, {
        key: "delDataByCurInd",
        value: function delDataByCurInd(db, storename, indexKey, keyRange, callback) {
            var request = _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_getCurIndRequest", this).call(this, db, storename, indexKey, keyRange);
            _get(IndexedDB.prototype.__proto__ || Object.getPrototypeOf(IndexedDB.prototype), "_delCurData", this).call(this, request, callback);
        }
    }]);

    return IndexedDB;
}(mix(_IdbToo2.default, _KeyRange2.default));

exports.default = IndexedDB;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 日期：2017-11-17
 * 作者：BLUE
 * 描述：本地数据库基类,基于indexedDB，主要是一些工具
*/
var IdbToo = function () {
    function IdbToo() {
        _classCallCheck(this, IdbToo);
    }

    _createClass(IdbToo, [{
        key: '_mkstore',

        /// <summary>
        /// 创建对象存储空间
        /// </summary>
        /// <param name="db">数据库对象</param>
        /// <param name="element">存储空间配置项</param>
        /// <returns>存储空间对象</returns>
        value: function _mkstore(db, element) {
            alert(1);
            var _self = this;
            if (!db.objectStoreNames.contains(element.name)) {
                var store = db.createObjectStore(element.name, { keyPath: element.keyPath });
                if (element.hasOwnProperty("indexKey") && element.indexKey) {
                    _self._storeIndex(store, element.indexKey);
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

    }, {
        key: '_storeIndex',
        value: function _storeIndex(store, indexKey) {
            store.createIndex(indexKey, indexKey, { unique: false });
        }
        /// <summary>
        /// 收集数据
        /// </summary>

    }, {
        key: '_colGetData',
        value: function _colGetData(request, callback) {
            var customers = [];
            request.onsuccess = function (e) {
                var cursor = e.target.result;
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

    }, {
        key: '_getCurRequest',
        value: function _getCurRequest(db, storename, keyRange) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename),
                request = store.openCursor(keyRange);
            return request;
        }
        /// <summary>
        /// 根据游标索引keyRange获取request
        /// </summary>

    }, {
        key: '_getCurIndRequest',
        value: function _getCurIndRequest(db, storename, indexKey, keyRange) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename),
                request = store.index(indexKey).openCursor(keyRange);
            return request;
        }
        /// <summary>
        /// 更新数据
        /// </summary>

    }, {
        key: '_edtCurData',
        value: function _edtCurData(request, params, callback) {
            request.onsuccess = function (e) {
                var cursor = e.target.result,
                    value = void 0,
                    updateRequest = void 0;
                if (cursor) {
                    value = cursor.value;
                    for (var key in params) {
                        value[key] = params[key];
                    }
                    updateRequest = cursor.update(value);
                    updateRequest.onerror = function () {
                        throw new Error('The cursor update failed');
                    };
                    cursor.continue();
                } else {
                    callback && callback();
                }
            };
        }
        /// <summary>
        /// 删除数据
        /// </summary>

    }, {
        key: '_delCurData',
        value: function _delCurData(request, callback) {
            request.onsuccess = function (e) {
                var cursor = e.target.result,
                    value = void 0,
                    deleteRequest = void 0;
                if (cursor) {
                    deleteRequest = cursor.delete();
                    deleteRequest.onerror = function () {
                        throw new Error("Cursor deletion failed");
                    };
                    cursor.continue();
                } else {
                    callback && callback();
                }
            };
        }
    }]);

    return IdbToo;
}();

exports.default = IdbToo;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var KeyRange = function () {
    function KeyRange() {
        _classCallCheck(this, KeyRange);
    }

    _createClass(KeyRange, [{
        key: "eq",

        /// <summary>
        /// 等于
        /// </summary>
        /// <param name="x">值</param>
        /// <returns>IDBKeyRange对象</returns>
        value: function eq(x) {
            return IDBKeyRange.only(x);
        }
        /// <summary>
        /// All keys < x
        /// </summary>
        /// <param name="x">值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "lt",
        value: function lt(x) {
            return IDBKeyRange.upperBound(x, true);
        }
        /// <summary>
        /// All keys ≤ x
        /// </summary>
        /// <param name="x">值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "lte",
        value: function lte(x) {
            return IDBKeyRange.upperBound(x);
        }
        /// <summary>
        /// All keys > x
        /// </summary>
        /// <param name="x">值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "gt",
        value: function gt(x) {
            return IDBKeyRange.lowerBound(y, true);
        }
        /// <summary>
        /// All keys ≥ x
        /// </summary>
        /// <param name="x">值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "gte",
        value: function gte(x) {
            return IDBKeyRange.lowerBound(y);
        }
        /// <summary>
        /// All keys > x &&< y
        /// </summary>
        /// <param name="x">低值</param>
        /// <param name="y">高值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "ltgt",
        value: function ltgt(x, y) {
            return IDBKeyRange.bound(x, y, true, true);
        }
        /// <summary>
        /// All keys ≥ x &&< y
        /// </summary>
        /// <param name="x">低值</param>
        /// <param name="y">高值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "ltegt",
        value: function ltegt(x, y) {
            return IDBKeyRange.bound(x, y, false, true);
        }
        /// <summary>
        /// All keys > x && ≤ y
        /// </summary>
        /// <param name="x">低值</param>
        /// <param name="y">高值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "ltgte",
        value: function ltgte(x, y) {
            return IDBKeyRange.bound(x, y, true, false);
        }
        /// <summary>
        /// All keys ≥ x && ≤ y
        /// </summary>
        /// <param name="x">低值</param>
        /// <param name="y">高值</param>
        /// <returns>IDBKeyRange对象</returns>

    }, {
        key: "ltegte",
        value: function ltegte(x, y) {
            return IDBKeyRange.bound(x, y, false, false);
        }
    }]);

    return KeyRange;
}();

exports.default = KeyRange;

/***/ })
/******/ ]);