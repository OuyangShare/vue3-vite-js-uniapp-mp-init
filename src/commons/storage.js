export default {
    /**
     * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
     * @param {*} key
     * @param {*} value
     * @returns
     */
    set(key, value) {
        try {
            value = JSON.stringify(value);
        } catch (e) {}
        if (!key && !value) {
            return;
        }
        uni.setStorageSync(key, value);
    },

    /**
     * 获取 localStorage
     * @param key 需要获取的key
     *  return 返回value
     */
    get(key) {
        let value = uni.getStorageSync(key) || '';
        if (value) {
            try {
                value = JSON.parse(value);
            } catch (e) {}
        }
        return value;
    },

    /**
     *  删除 localStorage
     * @param key 需要删除是key
     */
    remove(key) {
        if (!key) return;
        uni.removeStorageSync(key);
    },

    /**
     * 清空缓存
     * @param {*} store
     */
    clear() {
        uni.clearStorageSync();
    },

    /**
     * 判断是否存在key
     * @param {*} key
     * @param {*} store
     * @returns
     */
    has(key) {
        return uni.getStorageSync(key) !== null;
    }
};
