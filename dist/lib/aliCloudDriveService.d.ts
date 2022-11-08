import Utils from './Utils';
import { AliFileItem, AliUserInfo } from '../../index';
declare class AliCloudDriveService {
    readonly utils: Utils;
    constructor(refreshToken: string);
    init: () => Promise<void>;
    /**
     * 获取用户数据
     */
    getUser: () => Promise<AliUserInfo>;
    /**
     * 获取目录列表
     * @param fileId
     */
    getList: (fileId: string) => Promise<AliFileItem[]>;
}
export default AliCloudDriveService;
