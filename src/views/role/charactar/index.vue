<template>
  <div id="character">
    <!-- 搜索区域 -->
    <!-- <el-form inline>
      <el-form-item>
        <el-input placeholder="用户名称"  v-model="charInfo.keyword" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" >查询</el-button>
      <el-button >清空</el-button>
    </el-form> -->
    <!-- 添加删除按钮 -->
    <div style="margin-bottom: 20px; margin-left: 20px">
      <el-button type="primary" @click="openDialog">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <!-- 用户表格 -->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="用户名" width="120">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="真实姓名" width="120">
        <template slot-scope="scope">
          {{ scope.row.relName }}
        </template>
      </el-table-column>
      <el-table-column label="电话" show-overflow-tooltip width="230">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.gmtCreat }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-remove"
            size="mini"
            @click="disuser(scope.row.id)"
          ></el-button>

          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="logiDelete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :total="30"
      :page-size="50"
      :page-sizes="[5, 10, 20, 30, 40]"
      style="padding: 20px 0"
      layout="prev, pager, next, jumper, ->, sizes, total"
    />
    <!-- 对话框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="formdata" :rules="rules" ref="userform" >
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          size="small"
          prop="nickName"
        >
          <el-input v-model="formdata.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="formdata.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          :label-width="formLabelWidth"
          prop="relName"
        >
          <el-input v-model="formdata.relName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色选择"
          :label-width="formLabelWidth"
          prop="roleList"
        >
          <el-checkbox-group v-model="formdata.roleList">
            <el-checkbox
              :label="Rdata"
              name="type"
              v-for="(Rdata, index) in AllRoleDataInfo"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="formdata.sex" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birth">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Charactar",
  data() {
    return {
      loading: true,
      charInfo: {
        current: 1,
        keyword: "",
        size: 6,
      },
      list: [],
      dialogFormVisible: false,
      formdata: {
        birth: "", //生日
        username: "", //用户名
        phone: "", //电话
        password: "", //密码
        relName: "", //真实姓名
        roleList: [], //角色集合
        nickName: "", //昵称
        sex: "", //性别 0是男,1表示女
      },
      rules: {
        phone: [
          // 添加正则表达式 pattern: /^1[3|5|7|8|9]\d{9}$/，验证手机号是否正确
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        birth: [
          { required: true, message: "请选择生日", trigger: "", type: "data" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        relName: [
          { required: true, message: "请输入真实姓名", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        roleList: [
          { required: true, message: "请选择角色,至少一个", trigger: "change" },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
      AllRoleDataInfo: {},
    };
  },
  mounted() {
    this.getuserList();
    this.getRoleData();
  },
  methods: {
    //获取用户列表
    async getuserList() {
      let result = this.$store.dispatch("role/getUserInfo", this.charInfo);
      result.then(() => {
        this.list = this.$store.state.role.UserInfo;
        this.loading = false;
      });
    },
    //禁用账户
    disuser(id) {
      const status = 1; //禁用是1
      this.$store.dispatch("role/DisUserRote", { id, status });
    },
    //  逻辑删除用户
    async logiDelete(id) {
      this.$confirm("此操作将禁用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let res = this.$store.dispatch("role/LogiDeleteUser", parseInt(id));
        this.loading = true;
        res.then(() => {
          this.getuserList();
          this.loading = false;
          this.$message({
            message: "删除用户成功",
            type: "success",
          });
        });
      });
    },
    //处理数据字典格式
    changeDataList(data) {
      const newKey = [];
      for (let key in this.AllRoleDataInfo) {
        if (data.indexOf(this.AllRoleDataInfo[key]) !== -1) {
          newKey.push(parseInt(key));
        }
      }
      return newKey;
    },
    // 打开对话框
    openDialog() {
      this.dialogFormVisible = true;
    },
    //获取角色选择框
    async getRoleData() {
      let res = this.$store.dispatch("role/getALLroleList");
      res.then(() => {
        this.AllRoleDataInfo = this.$store.state.role.AllDataRole;
      });
    },
    //新增角色
    addrole() {
        this.$refs.userform.validate(valid=>{
        if(!valid){
          return false
        }
      this.addNewRole();
      this.dialogFormVisible = false;
        }
        )
    },
    async addNewRole() {
      const { roleList } = this.formdata;
      //处理格式
      let newData = this.changeDataList(roleList);
      this.formdata.roleList = newData;
      let res = this.$store.dispatch("role/Addnewrole", this.formdata);
      res.then(() => {
        //新增后再次查询
        this.getuserList();
        this.$message({
          message: "恭喜你,新增用户成功",
          type: "success",
        });
      });
    },
    // 清空搜索框
    clearKeyWord() {
      this.charInfo.keyword = "";
      //清空后，再次查询角色列表
      this.getuserList();
    },
  },
};
</script>

<style lang="less" scoped>
#character {
  width: 100%;
  .el-form {
    margin-left: 20px;
    .el-input {
      width: 200px;
    }
  }
  .el-table {
    margin-left: 20px;
  }
}
</style>