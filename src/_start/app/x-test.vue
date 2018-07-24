<template>
    <div>
        <text class="title">x-test</text>
        <wxc-cell title="发送请求 (开发模式才有效果)" desc="$fetch 支持 restful 标准, 高度自定义，支持 cookie 等。">
        </wxc-cell>
    </div>
</template>

<script>
    import { WxcCell } from 'weex-ui'
    export default {
        components: { WxcCell }
    }
</script>       

<style scoped>
    .title {
    	font-size: 72px;
    	padding: 50px;
    	width: 750px;
    	color: red;
    	text-align: center;
    }
</style>
