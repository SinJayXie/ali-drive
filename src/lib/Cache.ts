import { AliFileItem } from '../../index';

class AliFileListCache {
    private cacheMap: Map<string, AliFileItem[]>;
    private cacheSaveExpire: Map<any, number>;
    private readonly expireTimeout: number;
    constructor() {
        this.cacheMap = new Map();
        this.cacheSaveExpire = new Map();
        this.expireTimeout = 2 * 60 * 1000; // 列表缓存两分钟过期
    }

    /**
     * 设置目录缓存
     * @param fileId
     * @param items
     */
    public setDirCache = (fileId: string, items: AliFileItem[]) => {
        this.cacheMap.set(fileId, items);
        this.cacheSaveExpire.set(fileId, Date.now());
    }

    /**
     * 获取目录缓存
     * @param fileId
     */
    public getDirCache: (fileId: string) => AliFileItem[] | boolean = (fileId: string) => {
        if(this.cacheMap.has(fileId)) {
            const expireDate = this.cacheSaveExpire.get(fileId) || 0;
            if(expireDate + this.expireTimeout <= Date.now()) { // 缓存过期清空返回 false
                this.cacheMap.delete(fileId);
                this.cacheSaveExpire.delete(fileId);
                return false;
            } else {
                console.log('[Get File Cache] => ' + fileId);
                return <AliFileItem[]>this.cacheMap.get(fileId);
            }
        } else {
            return false;
        }
    }

    /**
     * 清空所有缓存
     */
    public clearCache = () => {
        this.cacheMap.clear();
        this.cacheSaveExpire.clear();
    }
}

export default AliFileListCache;
