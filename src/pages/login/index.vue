<template>
    <view class="login_page">
        <button @getphonenumber="getPhoneNumberHandler" open-type="getPhoneNumber">微信一键登录</button>
    </view>
</template>

<script setup>
import { reactive } from 'vue';

const Data = reactive({});

const getPhoneNumberHandler = e => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
        console.log(e.detail.code); // 动态令牌
    }
    console.log(e.detail.errMsg); // 回调信息（成功失败都会返回）
    console.log(e.detail.errno); // 错误码（失败时返回）
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
