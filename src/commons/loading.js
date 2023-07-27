import store from '../store';

export const showLoading = mask => {
    const loadingStore = store.useLoadingStore();
    loadingStore.status = true;
    loadingStore.mask = mask || false;
};
export const hideLoading = () => {
    const loadingStore = store.useLoadingStore();
    loadingStore.$reset();
};
