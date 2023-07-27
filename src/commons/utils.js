import prenv from '../prenv';
import store from '../store';
import { throttle as throttleFunc } from 'lodash';
const manifestPath = '../manifest.json';
const manifest = import.meta.globEager('../manifest.json')[manifestPath].default;

/**
 * 获取app版本号
 * @param {*} val
 */
export const getVersion = () => {
    return manifest.versionName;
};

/**
 * 获取oss图片路径
 * @param {*} imgName
 * @returns
 */
export const getImgOssUrl = imgName => {
    const currentEnv = store.useEnvStore().currentEnv;
    return prenv[currentEnv]['IMAGE_OSS_URL_HEADER'] + imgName;
};

/*
 * 将科学计数法的数字转为字符串
 * @param  num
 */
export const toNonExponential = num => {
    if (num == null) {
        return num;
    }
    if (typeof num == 'number') {
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    } else {
        return num;
    }
};
/**
 * 乘法 - js运算精度丢失问题
 * @param arg1  数1
 * @param arg2  数2
 */
export const floatMultiply = (arg1, arg2) => {
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    if ((!arg1 && arg1 !== 0) || (!arg2 && arg2 !== 0)) {
        return null;
    }
    arg1 = toNonExponential(arg1);
    arg2 = toNonExponential(arg2);
    var n1, n2;
    var r1, r2; // 小数位数
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    n1 = Number(arg1.toString().replace('.', ''));
    n2 = Number(arg2.toString().replace('.', ''));
    return (n1 * n2) / Math.pow(10, r1 + r2);
};

/**
 * 除法 - js运算精度丢失问题
 * @param arg1  数1
 * @param arg2  数2
 */
export const floatDivide = (arg1, arg2) => {
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    if (!arg2) {
        return null;
    }
    if (!arg1 && arg1 !== 0) {
        return null;
    } else if (arg1 === 0) {
        return 0;
    }
    arg1 = toNonExponential(arg1);
    arg2 = toNonExponential(arg2);
    var n1, n2;
    var r1, r2; // 小数位数
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    n1 = Number(arg1.toString().replace('.', ''));
    n2 = Number(arg2.toString().replace('.', ''));
    return floatMultiply(n1 / n2, Math.pow(10, r2 - r1));
};

/**
 * 获取当前页面路径
 * @returns
 */
export const getCurrentPage = () => {
    const currentRoutes = getCurrentPages();
    const currentRoute = currentRoutes[currentRoutes.length - 1];
    const path = currentRoute.route;
    return path;
};

/**
 * 获取当前环境下的变量
 * @param {*} key
 * @returns
 */
export const getCurrentVar = key => {
    const currentEnv = store.useEnvStore().currentEnv;
    return prenv[currentEnv][key];
};

/**
 * 获取当前运行时的APP_ID
 * @returns APP_ID
 */
export const getAppId = () => {
    return uni.getAccountInfoSync().miniProgram.appId;
};

/**
 * 节流
 * @param   {function}  func        传入函数
 * @param   {number}    wait        表示时间窗口的间隔(毫秒)
 *
 * @return function
 */
export const throttle = (func, wait = 3000) => {
    return throttleFunc(func, wait, {
        leading: true,
        trailing: false
    });
};
