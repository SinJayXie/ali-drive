import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
declare const headers: AxiosRequestHeaders;
declare const requestService: (config: AxiosRequestConfig) => Promise<any>;
export { headers };
export default requestService;
