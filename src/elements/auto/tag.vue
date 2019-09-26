<template>
  <div v-if="inshow">
    <x-border icon="zk-home" :title="viewModel.title">
      <div class="relation" v-if="async">
        <el-table :data="viewModel.datas" border stripe style="width: 100%; margin-top: 20px">
          <el-table-column prop="date" label="标签">
            <template slot-scope="scope">
              <span v-if="scope" />
              <el-input v-model="scope.row.name" maxlength="10" placeholder="请输入标签"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="删除">
            <template slot-scope="scope">
              <span v-if="scope" />
              <el-button type="primary" @click="detele(scope.$index, scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="button" @click="addClass">新增标签</el-button>
        <el-button @click="save">保存</el-button>
      </div>
    </x-border>
  </div>
</template>
<script>
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
    mounted () {
      this.init()
    },
    methods: {
      getPath () {
        this.init()
      },
      async init () {
        this.async = false
        var type = this.$crud.getType(this.$route)
        var para = {
          type: type,
          userId: this.$api.loginUser().id
        }
        var respone = await this.$api.httpGet('/Api/relation/getclass', para)
        var data = await this.$crud.getView(this, 'Api/relation/ViewById')
        data.type = type
        this.viewModel = respone.result
        this.data = data
        this.inshow = true
        this.async = true
      },
      async detele (index, id) {
        this.$confirm('是否删除此标签？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.deteleCopy(index, id)
        }).catch(() => { })
      },
      async deteleCopy (index, id) {
        if (id !== 0) {
          var response = await this.$api.httpDelete('/Api/Relation/Delete?id=' + id)
          if (response && response.status === 1) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              position: 'bottom-right'
            })
          } else {
            this.$notify({
              title: '删除失败',
              message: '删除失败：分类下有数据,不能删除',
              type: 'error',
              position: 'bottom-right'
            })
          }
          this.init()
        } else {
          this.viewModel.datas.splice(index, 1)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            position: 'bottom-right'
          })
        }
      },
      addClass () {
        var data = {
          id: 0,
          name: '',
          type: 'ProductTagRelation',
          userId: this.$user.id()
        }
        this.viewModel.datas.push(data)
      },
      async save () {
        var response = await this.$api.httpPost('Api/Relation/SaveOrUpdateList', this.viewModel.datas)
        this.$crud.message(this, response)
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
    width: 96%;
    margin: 0 auto;
    .content {
      width: 97%;
      margin: 15px auto;
    }
    .button {
      margin: 20px 0;
    }
  }
</style>


