let IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange
export default class KeyRange {
    /// <summary>
    /// 等于
    /// </summary>
    /// <param name="x">值</param>
    /// <returns>IDBKeyRange对象</returns>
    eq(x) {
        return IDBKeyRange.only(x)
    }
    /// <summary>
    /// All keys < x
    /// </summary>
    /// <param name="x">值</param>
    /// <returns>IDBKeyRange对象</returns>
    lt(x) {
        return IDBKeyRange.upperBound(x, true)
    }
    /// <summary>
    /// All keys ≤ x
    /// </summary>
    /// <param name="x">值</param>
    /// <returns>IDBKeyRange对象</returns>
    lte(x) {
        return IDBKeyRange.upperBound(x)
    }
    /// <summary>
    /// All keys > x
    /// </summary>
    /// <param name="x">值</param>
    /// <returns>IDBKeyRange对象</returns>
    gt(x) {
        return IDBKeyRange.lowerBound(y, true);
    }
    /// <summary>
    /// All keys ≥ x
    /// </summary>
    /// <param name="x">值</param>
    /// <returns>IDBKeyRange对象</returns>
    gte(x) {
        return IDBKeyRange.lowerBound(y);
    }
    /// <summary>
    /// All keys > x &&< y
    /// </summary>
    /// <param name="x">低值</param>
    /// <param name="y">高值</param>
    /// <returns>IDBKeyRange对象</returns>
    ltgt(x, y) {
        return IDBKeyRange.bound(x, y, true, true);
    }
    /// <summary>
    /// All keys ≥ x &&< y
    /// </summary>
    /// <param name="x">低值</param>
    /// <param name="y">高值</param>
    /// <returns>IDBKeyRange对象</returns>
    ltegt(x, y) {
        return IDBKeyRange.bound(x, y, false, true);
    }
    /// <summary>
    /// All keys > x && ≤ y
    /// </summary>
    /// <param name="x">低值</param>
    /// <param name="y">高值</param>
    /// <returns>IDBKeyRange对象</returns>
    ltgte(x, y) {
        return IDBKeyRange.bound(x, y, true, false);
    }
    /// <summary>
    /// All keys ≥ x && ≤ y
    /// </summary>
    /// <param name="x">低值</param>
    /// <param name="y">高值</param>
    /// <returns>IDBKeyRange对象</returns>
    ltegte(x, y) {
        return IDBKeyRange.bound(x, y, false, false);
    }
}