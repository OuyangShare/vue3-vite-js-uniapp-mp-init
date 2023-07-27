import { defineStore } from 'pinia';

export default defineStore('useLoadingStore', {
    state: () => {
        return { status: false, mask: false };
    }
});
