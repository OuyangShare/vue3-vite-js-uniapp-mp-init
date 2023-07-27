import { defineStore } from 'pinia';

/**
 * 定义：计算出当前是哪个环境
 */
export default defineStore('useEnvStore', {
    state: () => {
        const isLocalDevModel = process.env.NODE_ENV === 'development';
        const mode = import.meta.env.MODE;
        const currentEnv = isLocalDevModel ? 'development' : mode;
        return { currentEnv };
    }
});
