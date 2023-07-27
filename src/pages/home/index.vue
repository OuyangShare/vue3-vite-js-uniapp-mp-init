<template>
    <view class="home_page">
        <view v-if="Data.noList" class="empty_data">
            <Empty desc="暂无数据" />
        </view>
        <view v-else class="page_contain"> {{ Data.content }} </view>
    </view>
</template>

<script setup>
import Empty from '@/components/empty';
import { reactive, computed } from 'vue';

const Data = reactive({
    content: 'Hello word'
});
</script>

<style lang="scss" src="./style.scss" scoped></style>
