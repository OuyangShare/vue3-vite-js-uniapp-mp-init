import apis from './modules';
import store from '../store';
import prenv from '../prenv';
import storage from '../commons/storage';
import { showLoading, hideLoading } from '../commons/loading';
import { getVersion, getAppId } from '../commons/utils';
import { ERROR_MESSAGE_CODE, TOKEN_ERROR_CODE_OPTIONS } from './const';

/** http 请求计数器 */
let httpCounter = 0;

/** 是否存在toast */
let isToast = false;

/**
 * 开启Loading效果
 * @param {*} sld
 */
export const startShowLoading = sld => {
    if (httpCounter === 0 && sld && !isToast) {
        showLoading();
    }
};

/**
 * 关闭Loading效果
 */
const endShowLoading = () => {
    if (httpCounter > 0) {
        httpCounter--;
    }
    if (httpCounter === 0 && !isToast) {
        hideLoading();
    }
};

/**
 * 弹框提示
 * @param {*} title
 */
const toastHandler = title => {
    endShowLoading();
    isToast = true;
    uni.showToast({
        title,
        icon: 'none',
        duration: 2000
    });
    setTimeout(() => {
        isToast = false;
    }, 2000);
};

/**
 *  获取网关名称
 *  @param {请求名称} name
 */
const getApiAndgatewayName = name => {
    const api = apis.filter(v => {
        return v.name === name;
    });
    if (api.length === 0) {
        throw new Error(`未找到${name}对应的API服务地址`);
    } else {
        const retApi = api[0];
        const currentEnv = store.useEnvStore().currentEnv;
        let gatewayName = retApi.gatewayName;
        if (currentEnv === 'development' && retApi.mock) {
            gatewayName = 'mock';
        }
        return {
            retApi,
            gatewayName
        };
    }
};

/**
 * 获取请求信息
 * @param {请求名称} name
 */
export const getApi = name => {
    const { retApi, gatewayName } = getApiAndgatewayName(name);
    const currentEnv = store.useEnvStore().currentEnv;
    retApi.url = prenv[currentEnv]['API_BASE_URL'][gatewayName] + retApi.url;
    return retApi;
};

/**
 * 封装请求头部信息
 * @param {头部信息} header
 * @param {接口入参} data
 */
export const getHeader = function (name) {
    const reqtime = Date.now();
    const terminal = uni.getSystemInfoSync().system.indexOf('iOS') > -1 ? 2 : 1;
    const token = storage.get('token') || '';
    const appVersion = getVersion();
    const appId = getAppId();
    const target = {
        appVersion,
        token,
        reqtime,
        terminal,
        'APP-ID': appId
    };
    return target;
};

/**
 * 请求成功处理函数
 * @param {*} req
 * @param {*} res
 * @param {*} resolve
 * @param {*} reject
 */
export const successHandler = (req, res, resolve, reject) => {
    if (res.data.code === 0 || req.pem) {
        resolve(res.data);
        endShowLoading();
    } else if (TOKEN_ERROR_CODE_OPTIONS.includes(res.data.code)) {
        const useRoute = store.useRouteStore();
        if (!useRoute.lockStatus) {
            uni.navigateTo({
                url: '/pages/login/index'
            });
            useRoute.lockStatus = true;
        }
        endShowLoading();
    } else {
        errorHandler(req, res, reject);
    }
};

export const errorHandler = function (req, res, reject) {
    let title = '';
    if (res.statusCode === 200) {
        title = ERROR_MESSAGE_CODE[res.data.code];
    } else {
        if (TOKEN_ERROR_CODE_OPTIONS.includes(res.data.code)) {
            const useRoute = store.useRouteStore();
            if (!useRoute.lockStatus) {
                uni.navigateTo({
                    url: '/pages/login/index'
                });
                useRoute.lockStatus = true;
            }
        } else {
            title = ERROR_MESSAGE_CODE['other'];
        }
    }
    if (title) {
        toastHandler(title);
    } else {
        endShowLoading();
        reject(res);
    }
};

/**
 * 请求失败处理函数
 * @param {*}
 */
export const failHandler = () => {
    const title = ERROR_MESSAGE_CODE['other'];
    toastHandler(title);
};
