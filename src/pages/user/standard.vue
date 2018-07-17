<template>
    <div class="pages-user-standard">
        <zk-head></zk-head>
    </div>
</template>

<script>
    import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
    export default {
        config: {
            'navigationBarTitleText': 'this.title'
        },
        data () {
            return {
                pageInfo: '',
                title: '标准'
            }
        },
        beforeMount () {
            this.init()
        },
        methods: {
            async init () {
                this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
                console.info('页面信息', this.pageInfo)
            }
        }
    }
</script>

<style scoped lang="less">
    .pages-user-standard {
    	height: 100%;
    }
</style>