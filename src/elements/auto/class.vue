<template>
  <div v-if="inshow">
    <x-border icon="zk-home" title="编辑数据" color="accent">
      <div class="relation" v-if="async">
        <el-button class="buttom" @click="addclass(0)" type="primary">添加分类</el-button>
        <zk-treetable :data="viewModel" :edit="edit" :addclass="addclass" :columns="columns" :detele="detele" class="content" border></zk-treetable>
      </div>
    </x-border>
    <Dialog :viewModel="data" :save="save" :singleData="singleData" ref="dialogForm"></Dialog>
  </div>
</template>


<script>
  import Dialog from './common/class-dialog'
  export default {
    data () {
      return {
        async: false,
        columns: [
          {
            text: '名称',
            type: 'name',
            width: 200
          },
          {
            text: '图标',
            type: 'image'
          },
          {
            text: '操作',
            type: 'set'
          }
        ],
        viewModel: [],
        inshow: false,
        baseUrl: this.$api.baseUrl(),
        singleData: ''
      }
    },
    components: {
      Dialog
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.async = false
        var type = this.$crud.getType(this.$route)
        var para = {
          type: type
        }
        var respone = await this.$api.httpGet('/Api/relation/getclass', para)
        var data = await this.$crud.getView(this, 'Api/relation/ViewById')
        data.type = type
        this.viewModel = respone.result.datas
        this.data = data
        this.inshow = true
        this.async = true
      },
      async detele (id) {
        await this.$api.httpDelete('Api/Relation/Delete?id=' + id)
        this.init()
      },
      async edit (id) {
        this.$refs.dialogForm.dialogFormVisible = true
        this.data.id = id
        var data = {
          id
        }
        this.singleData = await this.$api.httpGet('Api/Relation/GetView', data)
      },
      addclass (id) {
        this.singleData = ''
        this.data.fatherId = id
        this.$refs.dialogForm.dialogFormVisible = true
      },
      async save () {
        if (this.singleData.result) {
          await this.$api.httpPost('Api/Relation/Save', this.singleData.result)
        } else {
          await this.$api.httpPost('Api/Relation/Save', this.data)
        }
        this.init()
        this.$refs.dialogForm.dialogFormVisible = false
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>



<style lang="scss" scoped>
  .relation {
    .buttom {
      margin: 0 15px 15px 0;
      float: right;
    }
    .content {
      width: 97%;
      margin: 15px auto;
    }
  }
</style>


