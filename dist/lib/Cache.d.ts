import { AliFileItem } from '../../index';
declare class AliFileListCache {
    private cacheMap;
    private cacheSaveExpire;
    private readonly expireTimeout;
    constructor();
    /**
     * 设置目录缓存
     * @param fileId
     * @param items
     */
    setDirCache: (fileId: string, items: AliFileItem[]) => void;
    /**
     * 获取目录缓存
     * @param fileId
     */
    getDirCache: (fileId: string) => AliFileItem[] | boolean;
    /**
     * 清空所有缓存
     */
    clearCache: () => void;
}
export default AliFileListCache;
