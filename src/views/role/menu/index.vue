<template>
  <div id="menu">
    <div style="margin-bottom: 20px; margin-left: 20px; margin-top: 30px">
      <el-button type="primary" @click="openDialog">添加一级菜单</el-button>
      <!-- <el-button type="danger">批量删除</el-button> -->
    </div>
    <!-- 菜单列表 -->

    <el-table border style="margin-bottom: 20px" :data="tableData" row-key="id"  v-loading="loading">
      <el-table-column prop="title" label="名称" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.children !== undefined"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="addNewMenu(scope.row.id)"
          ></el-button>

          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="UpdateMenu(scope.row)"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="Delete(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="新增菜单" :visible.sync="dialogFormVisible">
      <el-form :model="formdata">
        <el-form-item
          label="新增菜单名"
          :label-width="formLabelWidth"
          size="small"
        >
          <el-input v-model="formdata.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新增菜单路径" :label-width="formLabelWidth">
          <el-input
            v-model="formdata.path"
            autocomplete="off"
            placeholder="请输入正确的路径格式,例如/war/ww"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addmenu">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改菜单的对话框 -->
    <el-dialog title="修改菜单" :visible.sync="dialogFormVisible1">
      <el-form :model="formdata2">
        <el-form-item
          label="修改菜单名"
          :label-width="formLabelWidth"
          size="small"
        >
          <el-input v-model="formdata2.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改菜单路径" :label-width="formLabelWidth">
          <el-input
            v-model="formdata2.path"
            autocomplete="off"
            placeholder="请输入正确的路径格式,例如/war/ww"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="修改菜单父级模块"
          :label-width="formLabelWidth"
          v-if="show"
        >
          <el-select
            v-model="formdata2.parent"
            placeholder="请选择所对应父级模块"
          >
            <el-option
              :label="parent.title"
              :value="parent.id"
              v-for="(parent, index) in AllMenuDataInfo"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="Upmenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//  :expand-row-keys="expandKeys"
export default {
  name: "Menu",
  data() {
    return {
      loading:true,
      tableData: [],
      show: true, //是否隐藏选择父级模块
      menuInfo: {
        current: 1,
        keyword: "",
        size: 10,
      },
      parentId: "", //菜单父级Id
      formdata: {
        name: "",
        path: "",
      },
      formdata2: {
        name: "",
        path: "",
        parentId: 0, //默认设置一级菜单不修改
        id: "",
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: "140px",
      AllMenuDataInfo: [],
    };
  },
  mounted() {
    //得到菜单列表
    this.getmenuList();
    //得到菜单选择框
    this.getMenuInfoData();
  },
  methods: {
    //提取所有菜单的方法
    getAllMdataInfo(data) {
      const newArr = [];
      data.forEach((item) => {
        newArr.push({ title: item.title, id: item.id });
      });
      return newArr;
    },
    // 获取菜单选择框
    async getMenuInfoData() {
      let res = this.$store.dispatch("role/GetMenuDataList");
      res.then(() => {
        this.AllMenuDataInfo = this.getAllMdataInfo(
          this.$store.state.role.MdataInfo
        );
      });
    },
    // 得到菜单列表
    async getmenuList() {
      let res = this.$store.dispatch("role/getMenuList", this.menuInfo);
      res.then(() => {
        this.tableData = this.$store.state.role.menulistInfo;
        this.loading = false
      });
    },
    //  逻辑删除菜单
    async Delete(id) {
      this.$confirm("此操作将删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let res = this.$store.dispatch("menu/DeleteMenu", id);
        res.then(() => {
          this.getmenuList();
          this.$message({
            message: "删除菜单成功",
            type: "success",
          });
        });
      });
    },
    // 打开对话框,新增二级菜单
    addNewMenu(id) {
      this.parentId = id;
      this.dialogFormVisible = true;
    },
    // 新增一级菜单
    openDialog() {
      this.dialogFormVisible = true;
      this.parentId = 0;
    },
    //新增二级菜单及以下具体确认操作
    addmenu() {
      const { name, path } = this.formdata;
      const parentId = this.parentId;
      let res = this.$store.dispatch("menu/InserMenu", {
        name,
        parentId,
        path,
      });

      res.then(() => {
        //重新获取菜单
        this.getmenuList();
        this.dialogFormVisible = false;
        this.$message({
          message: "恭喜你,新增菜单成功",
          type: "success",
        });
      });
    },
    // 修改菜单打开对话框
    UpdateMenu(data) {
      this.formdata2.id = data.id;
      if (data.children !== undefined) {
        this.show = false;
      } else this.show = true;
      this.dialogFormVisible1 = true;
    },
    // 真正修改菜单
    Upmenu() {
      let res = this.$store.dispatch("menu/UpSeletMenu", this.formdata2);
      res.then(() => {
        //重新获取菜单
        this.getmenuList();
        this.dialogFormVisible = false;
        this.$message({
          message: "恭喜你,修改菜单菜单成功",
          type: "success",
        });
      });
      this.dialogFormVisible1 = false;
    },
  },
};
</script>

<style lang="less" scoped>
#menu {
  width: 100%;
  .el-table {
    margin-left: 20px;
  }
  .el-input {
    width: 270px;
  }
}
</style>
