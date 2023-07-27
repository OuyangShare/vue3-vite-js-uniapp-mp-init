<template>
    <view class="empty_page">
        <image mode="heightFix" :style="{ height: imgHeight + 'rpx' }" class="img" :src="bgImg" />
        <view class="content_title" :style="{ 'margin-top': contentTop + 'rpx' }"> {{ desc }} </view>
    </view>
</template>

<script setup>
import { getImgOssUrl } from '@/commons/utils.js';
defineProps({
    desc: { type: String, default: '暂无数据' },
    imgHeight: { type: String || Number, default: '238' },
    contentTop: { type: String || Number, default: '30' },
    bgImg: { type: String, default: getImgOssUrl('/empty.png') }
});
</script>

<style lang="scss" scoped>
.empty_page {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .content_title {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 44rpx;
    }
}
</style>
