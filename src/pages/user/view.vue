<template>
    <div class="pages--user-view">
        <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
        <zk-grid></zk-grid>
        <zk-foot></zk-foot>
    </div>
</template>

<script>
    export default {
        config: {
            'navigationBarTitleText': '会员详情'
        },
        data () {
            return {
                pageInfo: '',
                asyncFlag: false
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            async init () {
                console.info('路由参数', this.$route.query.id)
                this.widget = {
                    apiUrl: 'Api/User/Recommend'
                }
                this.asyncFlag = true
            }
        }
    }
</script>

<style scoped lang="less">
    .pages--user-view {
    	width: 100%;
    }
</style>

