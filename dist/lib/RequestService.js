"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
const axios_1 = require("axios");
const headers = {
    'Authorization': '',
    'content-type': 'application/json',
    'origin': 'https://www.aliyundrive.com'
};
exports.headers = headers;
axios_1.default.interceptors.request.use((config) => {
    config.headers = Object.assign(Object.assign({}, config.headers), headers);
    return config;
});
axios_1.default.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.data.code === 'NotFound.FileId') { // 获取文件404状态
        return error.response;
    }
    else {
        throw error;
    }
});
const requestService = function (config) {
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(Object.assign({ baseURL: '', timeout: 20000, url: '', method: 'get' }, config)).then((result) => {
            resolve(result.data);
        }).catch((err) => {
            reject(err);
        });
    });
};
exports.default = requestService;
//# sourceMappingURL=RequestService.js.map