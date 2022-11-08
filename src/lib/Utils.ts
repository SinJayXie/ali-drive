import requestService, { headers } from './RequestService';
import * as buffer from 'buffer';
import * as fs from 'fs';
import { AxiosRequestConfig } from 'axios';
import * as path from 'path';
import AliFileListCache from './Cache';
import { AliFileItem, RefreshTokenResponse } from '../../index';
const accessTokenPath = path.join(process.env.PWD || '', 'accessToken.json');

class Utils {
    public refreshTokenResponse: RefreshTokenResponse;
    private refreshToken: string;
    private readonly cache: AliFileListCache;
    constructor(refreshToken: string) {
        this.refreshToken = refreshToken;
        this.cache = new AliFileListCache();
        this.refreshTokenResponse = this.getCacheAccessToken();
        headers.Authorization = 'Bearer\t' + this.refreshTokenResponse.access_token;
    }

    /**
     * 获取本地access token
     */
    public getCacheAccessToken: () => (RefreshTokenResponse) = () => {
        try {
            const bufferData: buffer.Buffer = fs.readFileSync(accessTokenPath);
            return <RefreshTokenResponse>JSON.parse(bufferData.toString('utf-8'));
        } catch (e) {
            this.getRefreshToken().then(() => {
            });
            return <RefreshTokenResponse>{};
        }

    }

    /**
     * 刷新access Token
     */
    public getRefreshToken: () => Promise<RefreshTokenResponse> = () => {
        return new Promise((resolve,reject) => {
            requestService({
                method: 'post',
                url: 'https://auth.aliyundrive.com/v2/account/token',
                data: {
                    refresh_token: this.refreshToken,
                    grant_type: 'refresh_token'
                }
            }).then((res) => {
                this.refreshTokenResponse = res;
                headers.Authorization = 'Bearer\t' + this.refreshTokenResponse.access_token;
                this.saveAccessToken();
                resolve(this.refreshTokenResponse);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * 保存access token
     */
    public saveAccessToken = () => {
        const json = JSON.stringify(this.refreshTokenResponse);
        fs.writeFileSync(accessTokenPath, json);
    }

    /**
     * 工具请求封装
     * @param config
     */
    public request: (config: AxiosRequestConfig) => any = (config: AxiosRequestConfig) => {
        return new Promise((resolve, reject) => {
            requestService(config).then((res) => {
                resolve(res);
            }).catch((err) => {
                if(err.response.data.code === 'AccessTokenInvalid') {
                    this.getRefreshToken().then(() => {
                        requestService(config).then((res) => {
                            resolve(<any>res);
                        }).catch((err) => {
                            reject(err);
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * 获取目录文件文件
     * @param fileId
     */
    public getFiles: (fileId?: string) => Promise<AliFileItem[]> = (fileId?: string) => {
        const getItems = this.cache.getDirCache(fileId || 'root');
        if(getItems) {
            return new Promise((resolve) => {
                resolve(<AliFileItem[]>getItems);
            });
        } else {
            return new Promise((resolve,reject) => {
                this.request({
                    method: 'post',
                    url: 'https://api.aliyundrive.com/v2/file/list',
                    data: {
                        drive_id: this.refreshTokenResponse.default_drive_id,
                        fields: '*',
                        image_thumbnail_process: 'image/resize,w_400/format,jpeg',
                        image_url_process: 'image/resize,w_1920/format,jpeg',
                        limit: 200,
                        marker: '',
                        order_by: '', // 'name,size,updated_at,created_at'
                        order_direction: '', // 'ASC,DESC'
                        parent_file_id: fileId || 'root',
                        video_thumbnail_process: 'video/snapshot,t_0,f_jpg,ar_auto,w_300',
                        url_expire_sec: 14400
                    }
                }).then((res: { items: AliFileItem[]; }) => {
                    const items = <AliFileItem[]>res.items;
                    this.cache.setDirCache(fileId || 'root', items);
                    resolve(items);
                }).catch((err: any) => {
                    reject(err);
                });
            });
        }
    }
}

export default Utils;
