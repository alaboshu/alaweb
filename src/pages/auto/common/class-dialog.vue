<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <ul class="formData">
      <li>
        <div class="formData-text">
          <span>*</span>名称
        </div>
        <div class="formData-input">
          <el-input v-model="column.name"></el-input>
          <div>输入名字长度在40个字符以内</div>
        </div>
      </li>
      <li>
        <div class="formData-text">图片/图标</div>
        <div class="formData-img">
          <div style="position: relative;">
            <el-upload :action="baseUrl+'/api/common/upload'" list-type="picture-card" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="column.icon" class="upload_img" :src="baseUrl+column.icon" alt="">
              <i v-else class="el-icon-plus"></i>
            </el-upload>
            <div class="img_buttom-text"></div>
          </div>
        </div>
      </li>
      <li>
        <div class="formData-text">
          <span>*</span>排序
        </div>
        <div class="formData-input">
          <el-input v-model="column.metaKeywords"></el-input>
          <div>排序越小越输入在前面</div>
        </div>
      </li>
      <li>
        <div class="formData-text">状态</div>
        <div>
          <div class="formData-radio">
            <el-radio-group value="3">
              <el-radio :label="3">正常</el-radio>
              <el-radio :label="6">冻结</el-radio>
              <el-radio :label="9">删除</el-radio>
            </el-radio-group>
          </div>
          <div>更改会员等级，会员等级可以在控制面板中设置</div>
        </div>
      </li>
      <li class="formData-list">
        <div class="formData-text"></div>
        <div>
          <el-button @click.native="save">保存</el-button>
        </div>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      save: {},
      viewModel: {},
      singleData: {}
    },
    data () {
      return {
        baseUrl: this.$api.baseUrl(),
        dialogFormVisible: false,
        column: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.column = this.viewModel
      },
      handleAvatarSuccess (res, file, filelist) {
        this.column.icon = res.result.path
      },
      beforeAvatarUpload (file) {

      }
    },
    watch: {
      dialogFormVisible (val) {
        if (val === true) {
          this.column = this.viewModel
        } else {
          this.column = ''
        }
      },
      singleData (val) {
        if (val.result) {
          this.column = val.result
        }
        // this.column = this.singleData
      }
    }
  }
</script>




<style lang="scss" scoped>
  @import "~./styles/dialog.scss";
</style>




<style lang="scss">
  .formData-img {
    .el-upload--picture-card i {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -14px;
      margin-top: -23px;
    }
    .el-upload--picture-card {
      width: 110px;
      height: 110px;
    }
    div {
      margin-right: 10px;
      width: 110px;
      .img_buttom-text {
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin: 0;
      }
    }
    .upload_img {
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: 110px;
      border-radius: 2px;
    }
  }
</style>
