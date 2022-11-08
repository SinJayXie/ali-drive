import Utils from './Utils';
import { AliFileItem, AliUserInfo } from '../../index';

class AliCloudDriveService {
    public readonly utils: Utils;
    constructor(refreshToken: string) {
        this.utils = new Utils(refreshToken);
    }

    public init = async () => {
        await this.utils.getRefreshToken();
    }

    /**
     * 获取用户数据
     */
    public getUser: () => Promise<AliUserInfo> = () => {
        return <Promise<AliUserInfo>>this.utils.request({
            method: 'post',
            url: 'https://api.aliyundrive.com/v2/user/get',
            data: {}
        });
    }

    /**
     * 获取目录列表
     * @param fileId
     */
    public getList: (fileId: string) => Promise<AliFileItem[]> = (fileId: string) => {
        return new Promise((resolve,reject) => {
            this.utils.getFiles(fileId).then((items) => {
                resolve(items);
            }).catch((err) => {
                reject(err);
            });
        });
    }

}

export default AliCloudDriveService;
