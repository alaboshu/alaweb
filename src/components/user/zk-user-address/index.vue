<template>
  <view>
    <addList v-if="type=== 'list'"></addList>
    <addEdit v-if="type === 'edit'" @change="changeClick"></addEdit>
    <addSelect v-if="type === 'select'"></addSelect>
    <addButton v-if="type !== 'edit'" @change="changeClick"></addButton>
  </view>
</template>
<script>
  import addList from './styles/list'
  import addEdit from './styles/edit'
  import addSelect from './styles/select'
  import addButton from './styles/button'
  export default {
    components: {
      addList,
      addEdit,
      addSelect,
      addButton
    },
    data () {
      return {
        type: 'select',
        isShowBtn: true
      }
    },
    methods: {
      changeClick (type) {
        this.type = type
      }
    }
  }
</script>
