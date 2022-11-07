"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
class AliCloudDriveService {
    constructor(refreshToken) {
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            yield this.utils.getRefreshToken();
        });
        /**
         * 获取用户数据
         */
        this.getUser = () => {
            return this.utils.request({
                method: 'post',
                url: 'https://api.aliyundrive.com/v2/user/get',
                data: {}
            });
        };
        /**
         * 获取目录列表
         * @param fileId
         */
        this.getList = (fileId) => {
            return new Promise((resolve, reject) => {
                this.utils.getFiles(fileId).then((items) => {
                    resolve(items);
                }).catch((err) => {
                    reject(err);
                });
            });
        };
        this.utils = new Utils_1.default(refreshToken);
    }
}
exports.default = AliCloudDriveService;
//# sourceMappingURL=aliCloudDriveService.js.map