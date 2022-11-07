"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AliFileListCache {
    constructor() {
        /**
         * 设置目录缓存
         * @param fileId
         * @param items
         */
        this.setDirCache = (fileId, items) => {
            this.cacheMap.set(fileId, items);
            this.cacheSaveExpire.set(fileId, Date.now());
        };
        /**
         * 获取目录缓存
         * @param fileId
         */
        this.getDirCache = (fileId) => {
            if (this.cacheMap.has(fileId)) {
                const expireDate = this.cacheSaveExpire.get(fileId) || 0;
                if (expireDate + this.expireTimeout <= Date.now()) { // 缓存过期清空返回 false
                    this.cacheMap.delete(fileId);
                    this.cacheSaveExpire.delete(fileId);
                    return false;
                }
                else {
                    console.log('[Get File Cache] => ' + fileId);
                    return this.cacheMap.get(fileId);
                }
            }
            else {
                return false;
            }
        };
        /**
         * 清空所有缓存
         */
        this.clearCache = () => {
            this.cacheMap.clear();
            this.cacheSaveExpire.clear();
        };
        this.cacheMap = new Map();
        this.cacheSaveExpire = new Map();
        this.expireTimeout = 2 * 60 * 1000; // 列表缓存两分钟过期
    }
}
exports.default = AliFileListCache;
//# sourceMappingURL=Cache.js.map