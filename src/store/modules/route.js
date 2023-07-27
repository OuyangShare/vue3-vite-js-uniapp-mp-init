import { defineStore } from 'pinia';

export default defineStore('useRouteStore', {
    state: () => {
        return { params: {}, lockStatus: false };
    }
});
