<template>
    <div class="pages-user-standard">
    </div>
</template>

<script>
    export default {
        config: {
            'navigationBarTitleText': '标准页面'
        },
        data () {
            return {
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            async  init () {
                console.info('当前页面', this.$route.path)
                console.info('当前终端', this.$client)
            }
        }
    }
</script>

<style scoped lang="less">
    .pages-user-standard {
    	height: 100%;
    }
</style>