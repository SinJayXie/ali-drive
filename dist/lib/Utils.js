"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestService_1 = require("./RequestService");
const fs = require("fs");
const path = require("path");
const Cache_1 = require("./Cache");
const accessTokenPath = path.join(process.env.PWD || '', 'accessToken.json');
class Utils {
    constructor(refreshToken) {
        /**
         * 获取本地access token
         */
        this.getCacheAccessToken = () => {
            try {
                const bufferData = fs.readFileSync(accessTokenPath);
                return JSON.parse(bufferData.toString('utf-8'));
            }
            catch (e) {
                this.getRefreshToken().then(() => {
                });
                return {};
            }
        };
        /**
         * 刷新access Token
         */
        this.getRefreshToken = () => {
            return new Promise((resolve, reject) => {
                (0, RequestService_1.default)({
                    method: 'post',
                    url: 'https://auth.aliyundrive.com/v2/account/token',
                    data: {
                        refresh_token: this.refreshToken,
                        grant_type: 'refresh_token'
                    }
                }).then((res) => {
                    this.refreshTokenResponse = res;
                    RequestService_1.headers.Authorization = 'Bearer\t' + this.refreshTokenResponse.access_token;
                    this.saveAccessToken();
                    resolve(this.refreshTokenResponse);
                }).catch((err) => {
                    reject(err);
                });
            });
        };
        /**
         * 保存access token
         */
        this.saveAccessToken = () => {
            const json = JSON.stringify(this.refreshTokenResponse);
            fs.writeFileSync(accessTokenPath, json);
        };
        /**
         * 工具请求封装
         * @param config
         */
        this.request = (config) => {
            return new Promise((resolve, reject) => {
                (0, RequestService_1.default)(config).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    if (err.response.data.code === 'AccessTokenInvalid') {
                        this.getRefreshToken().then(() => {
                            (0, RequestService_1.default)(config).then((res) => {
                                resolve(res);
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            });
        };
        /**
         * 获取目录文件文件
         * @param fileId
         */
        this.getFiles = (fileId) => {
            const getItems = this.cache.getDirCache(fileId || 'root');
            if (getItems) {
                return new Promise((resolve) => {
                    resolve(getItems);
                });
            }
            else {
                return new Promise((resolve, reject) => {
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
                            order_by: '',
                            order_direction: '',
                            parent_file_id: fileId || 'root',
                            video_thumbnail_process: 'video/snapshot,t_0,f_jpg,ar_auto,w_300',
                            url_expire_sec: 14400
                        }
                    }).then((res) => {
                        const items = res.items;
                        this.cache.setDirCache(fileId || 'root', items);
                        resolve(items);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            }
        };
        this.refreshToken = refreshToken;
        this.cache = new Cache_1.default();
        this.refreshTokenResponse = this.getCacheAccessToken();
        RequestService_1.headers.Authorization = 'Bearer\t' + this.refreshTokenResponse.access_token;
    }
}
exports.default = Utils;
//# sourceMappingURL=Utils.js.map