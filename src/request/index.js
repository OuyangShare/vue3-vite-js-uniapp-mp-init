import { getApi, getHeader, successHandler, failHandler, startShowLoading } from './config';

/**
 * http请求函数
 * @param {请求名称} name
 * @param {接口入参} data
 * @description
 *  pem: Boolean 是否由系统拦截处理错误，默认为false
 *  sld: Boolean 是否显示请求loading，默认为true
 */
const request = (name = '', data = {}) => {
    const { url, method = 'post', pem = false, sld = true, timeout = 5000, requireAuth = true } = getApi(name);
    const header = getHeader(name);
    const req = {
        url,
        method,
        header,
        pem,
        sld,
        timeout,
        requireAuth
    };

    /**
     * 请求函数
     * @param {*} resolve
     * @param {*} reject
     * @returns
     */
    return new Promise((resolve, reject) => {
        startShowLoading(sld);
        uni.request({
            url,
            header,
            method,
            data,
            timeout,
            success(res) {
                successHandler(req, res, resolve, reject);
            },
            fail: err => {
                reject('other');
                failHandler(err);
            }
        });
    });
};

export default request;
