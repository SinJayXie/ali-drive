import { AxiosRequestConfig } from 'axios';
import { AliFileItem, RefreshTokenResponse } from '../../index';
declare class Utils {
    refreshTokenResponse: RefreshTokenResponse;
    private refreshToken;
    private readonly cache;
    constructor(refreshToken: string);
    /**
     * 获取本地access token
     */
    getCacheAccessToken: () => (RefreshTokenResponse);
    /**
     * 刷新access Token
     */
    getRefreshToken: () => Promise<RefreshTokenResponse>;
    /**
     * 保存access token
     */
    saveAccessToken: () => void;
    /**
     * 工具请求封装
     * @param config
     */
    request: (config: AxiosRequestConfig) => any;
    /**
     * 获取目录文件文件
     * @param fileId
     */
    getFiles: (fileId?: string) => Promise<AliFileItem[]>;
}
export default Utils;
