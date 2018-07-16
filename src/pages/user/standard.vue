<template>
    <div class="pages-user-standard">

    </div>
</template>

<script>
    import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
    export default {
        config: {
            'navigationBarTitleText': '标准页面'
        },
        data () {
            return {
                pageInfo: ''
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            async init () {
                console.dir('ddddd')
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