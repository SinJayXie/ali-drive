import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

const headers: AxiosRequestHeaders = {
    'Authorization': '',
    'content-type': 'application/json',
    'origin': 'https://www.aliyundrive.com'
};

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
        ...config.headers,
        ...headers
    };
    return config;
});

axios.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error) => {
    if(error.response.data.code === 'NotFound.FileId') { // 获取文件404状态
        return error.response;
    } else {
        throw error;
    }
});

const requestService = function (config: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
        axios(<AxiosRequestConfig>{
            baseURL: '',
            timeout: 20000,
            url: '',
            method: 'get',
            ...config
        }).then((result: AxiosResponse) => {
            resolve(<any>result.data);
        }).catch((err) => {
            reject(err);
        });
    });
};
export { headers };
export default requestService;
