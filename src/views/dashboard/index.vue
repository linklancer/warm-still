<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <span>用户名: {{ getname }} </span>
      <span>昵称: {{ $store.state.user.DetailUserInfo.nickName }}</span>
      <span>生日: {{ $store.state.user.DetailUserInfo.birth }}</span>
      <span
        >性别:
        {{ $store.state.user.DetailUserInfo.sex == 0 ? "男" : "女" }}</span
      >
    </div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="EditSelfInfo"
      style="margin-top: 40px"
      >修改个人信息</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="EditImg"
      style="margin-top: 40px"
      >修改头像</el-button
    >
    <!-- 对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible"  >
      <el-form :model="formdata" label-position="left">
        <el-form-item label="昵称" :label-width="formLabelWidth" size="small">
          <el-input v-model="formdata.nickName" autocomplete="off" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="formdata.sex" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formdata.birth"
            type="date"
            format="yyyy 年 MM月 dd日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearAllinput">取 消</el-button>
        <el-button type="primary" @click="Confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 头像对话框 -->
    <el-dialog title="修改头像" :visible.sync="isShow" class="second-dig">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="Fake Action"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
        :http-request="handleHttpRequest"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >提交</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件,且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/auth";
export default {
  data() {
    return {
      name: "",
      dialogFormVisible: false,
      formdata: {
        nickName: "",
        sex: "",
        birth: "",
        photoPath: this.$store.state.user.imgurl || "",
        userId: getUserInfo().userId || "",
        id: getUserInfo().userId,
      },
      formLabelWidth: "80px",
      isShow: false,
      flieData: null,
      fileList: [],
    };
  },
  mounted() {
    this.getUserBasicInfo();
  },
  methods: {
    //得到用户基本信息
    getUserBasicInfo() {
      this.$store.dispatch("user/GetAllUserInfo");
    },
    // 修改用户信息
    EditSelfInfo() {
      this.dialogFormVisible = true;
    },
    //修改信息取消按钮
    clearAllinput() {
      this.dialogFormVisible = false;
    },
    // 修改信息确认按钮
    Confirm() {
      let res = this.$store.dispatch("user/UpDateUserinfo", this.formdata);
      res.then(() => {
        this.dialogFormVisible = false;
        this.formdata = {
          nickName: "",
          sex: "",
          birth: "",
        };
        this.getUserBasicInfo();
        this.$message({
          message: "修改个人信息成功",
          type: "success",
        });
      });
    },
    //修改头像
    EditImg() {
      this.isShow = true;
    },
    // 以下都为上传头像方法
    handleChange(file) {
      this.flieData = file;
    },
    handleHttpRequest() {
      let formData = new FormData();
      formData.append("file", this.flieData.raw);
      this.$store.dispatch("user/updatAttr", formData);
    },
    // 自定义提交
    submitUpload() {
      this.$refs.upload.submit();
      this.isShow = false;
      this.$message({
        message: "修改头像成功",
        type: "success",
      });
    },
  },
  computed: {
    getname() {
      return this.$store.state.user.userinfo.userName;
    },
  },
};
</script>

<style lang="less" scoped>
.dashboard-container {
  width: 100%;
  height: auto;
  .dashboard-text {
    margin-left: 50px;
    margin-top: 40px;
    width: 500px;
    display: flex;
    flex-direction: column;
    span {
      height: 50px;
    }
  }
  .el-button {
    margin-left: 50px;
  }
  .second-dig {
    width: 600px;
    margin: 0 auto;
    .avatar-uploader,
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 278px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 278px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>
