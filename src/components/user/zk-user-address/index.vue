<template>
  <view>
    <addList v-if="type=== 'list'" ref="addList" @change="changeClick"></addList>
    <addEdit v-if="type === 'edit'" ref="addEdit" @change="changeClick"></addEdit>
    <addSelect v-if="type === 'select'" ref="addSelect" @change="changeClick"></addSelect>
  </view>
</template>
<script>
  import addList from './styles/list'
  import addEdit from './styles/edit'
  import addSelect from './styles/select'
  export default {
    components: {
      addList,
      addEdit,
      addSelect
    },
    data () {
      return {
        type: 'list',
        isShowBtn: true
      }
    },
    methods: {
      changeClick ({ data, type, form }) {
        this.type = type
        this.$nextTick(() => {
          if (this.$refs.addList) { this.$refs.addList.init() }
          if (this.$refs.addSelect) { this.$refs.addSelect.init() }
          if (this.$refs.addEdit) { this.$refs.addEdit.init(data, form) }
        })
      }
    }
  }
</script>
