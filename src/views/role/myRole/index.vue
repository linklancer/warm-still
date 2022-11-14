<template>
  <div id="character">
    <!-- 搜索区域 -->
    <el-form inline>
      <el-form-item>
        <el-input placeholder="角色名称" v-model="charInfo.keyword" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getcharList"
        >查询</el-button
      >
      <el-button @click="clearKeyWord">清空</el-button>
    </el-form>
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
      <el-table-column label="角色名称" width="120">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
      </el-table-column>
      <el-table-column label="角色对应菜单" width="420">
        <template slot-scope="scope">
          {{  getmenulist(scope.row.menuList).join(', ')   }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="角色对应资源列表"
        show-overflow-tooltip
        width="230"
      >
        <template slot-scope="scope">
          {{ getmenulist(scope.row.resourceList) }}
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-remove"
            size="mini"
            @click="disRole(scope.row.id)"
          ></el-button>

          <el-button type="primary" icon="el-icon-edit" size="mini"  @click="updateroleopen(scope.row)"></el-button>

          
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
    <el-dialog :title="addtitle" :visible.sync="dialogFormVisible">
      <el-form :model="formdata" :rules="rules" ref="userform">
        <el-form-item label="角色名" :label-width="formLabelWidth" size="small" prop="roleName">
          <el-input v-model="formdata.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单选择" :label-width="formLabelWidth" prop="menuList">
          <el-checkbox-group v-model="formdata.menuList">
            <el-checkbox
              :label="Rdata"
              name="type"
              v-for="(Rdata, index) in  AllMenuDataInfo"
              :key="index"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearAllinput">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myRole",
  data() {
    return {
      loading:true,
      charInfo: {
        current: 1,
        keyword: "",
        size: 10,
      },
      addtitle:'新增角色',
      list: [],
      dialogFormVisible: false,
      formdata: {
        menuList:[],//选择菜单集合
        roleName: "", //用户名
        roleLabel:'',
        id:1,
        createDate:''
      },
       rules:{
        roleName:[
          // 添加正则表达式 pattern: /^1[3|5|7|8|9]\d{9}$/，验证手机号是否正确
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
         menuList:[
           { required: true, message: '请选择菜单框,至少一个', trigger: 'change' },
        ],
       
      },
      formLabelWidth: "120px",
      AllRoleDataInfo: {},
      AllMenuDataInfo: [],
    };
  },
  mounted() {
    this.getcharList()
    this.getRoleData();
    this.getMenuInfoData();
  },
  methods: {
    // 清空修改记录
    clearAllinput(){
      this.dialogFormVisible = false
        this.formdata = {
           menuList:[],//选择菜单集合
           roleName: "", //用户名
           roleLabel:'',
           id:1,
        }

    },
     //获取角色列表
    async getcharList() {
      let result = this.$store.dispatch("role/getcharacter", this.charInfo);
      result.then(() => {
        this.list = this.$store.state.role.CharListInfo;
        this.loading = false
      });
    },
    //处理菜单格式
    getmenulist(list) {
      // console.log(list)
      const Mdata = this.$store.state.role.MdataInfo
      const newMenuList = []
       Mdata.forEach((item)=>{
        if(list.indexOf(item.id) !== -1){
            newMenuList.push(item.title)
        }
         item.children.forEach((e)=>{
              if(list.indexOf(e.id) !== -1){
                newMenuList.push(e.title)
              }
            })
       })
       return newMenuList
    },
    //处理菜单数据字典格式
    changeDataList(data) {
      const newKey = [];
       const menuOrData = this.$store.state.role.MdataInfo
       menuOrData.forEach((item)=>{
         if(data.indexOf(item.title) !== -1 ){
           newKey.push(item.id)
         }
         item.children.forEach((e)=>{
           if(data.indexOf(e.title) !== -1){
             newKey.push(e.id)
           }
         })
       })
       return newKey
    },
    // 打开对话框
    openDialog() {
      this.dialogFormVisible = true;
      this.addtitle = '新增角色'
    },
    //提取所有菜单的方法
    getAllMdataInfo(data) {
      const newArr = [];
      data.forEach((item) => {
        newArr.push(item.title);
        // console.log(typeof item.children);
        item.children.forEach((e) => {
          newArr.push(e.title);
        });
      });
      return newArr;
    },
    // 获取菜单选择框
    async getMenuInfoData() {
      let res = this.$store.dispatch("role/GetMenuDataList");
      res.then(() => {
        this.AllMenuDataInfo = this.getAllMdataInfo(this.$store.state.role.MdataInfo)
      });
    },
    //获取角色选择框
    async getRoleData() {
      let res = this.$store.dispatch("role/getALLroleList");
      res.then(() => {
        this.AllRoleDataInfo = this.$store.state.role.AllDataRole;
      });
    },
    //新增角色,确认按钮
    addrole() {
       this.$refs.userform.validate(valid=>{
        if(!valid){
          return false
        }
      const message = '恭喜你,新增角色成功'
      const message1 = "恭喜你,修改角色成功"
      if(this.addtitle === '新增角色'){
         this.addNewRole(message,this.formdata);
      }
      if(this.addtitle === '修改角色'){
        this.UpDateDetailRole(message1,this.formdata)
      }
     
      this.dialogFormVisible = false;
        this.formdata = {
           menuList:[],//选择菜单集合
           roleName: "", //用户名
           roleLabel:'',
           id:1
        }
       }
       )
    },
    //修改角色,打开对话框
    updateroleopen(alldata){
       this.dialogFormVisible = true
        this.formdata.menuList  =  this.getmenulist(alldata.menuList)
        this.formdata.id = alldata.id
        this.formdata.roleName = alldata.roleName
        this.addtitle = '修改角色'
        // this.addNewRole(message,this.formdata)
    },
    //新增的角色方法
    async addNewRole(mes,data) {
      const {  menuList } = data;
      //处理格式
      let newData = this.changeDataList( menuList);
      data.menuList = newData;
      data.roleLabel = data.roleName
      let res = this.$store.dispatch("role/ADDNewUserRole", data);
      res.then(() => {
         this.getcharList()
        this.$message({
          message: mes,
          type: "success",
        });
      });
    },
    //修改角色的方法
    UpDateDetailRole(mes,data){
      const {  menuList } = data;
      //处理格式
      let newData = this.changeDataList( menuList);
      data.menuList = newData;
      data.roleLabel = data.roleName
      let res = this.$store.dispatch("role/upDateRole", data);
      res.then(() => {
        this.getcharList()
        this.$message({
          message: mes,
          type: "success",
        });
      });
    },
    // 清空搜索框
    clearKeyWord() {
      this.charInfo.keyword = "";
      //清空后，再次查询角色列表
      this.getcharList();
    },
    //禁用角色
    disRole(id) {
      // console.log(arrId)
      this.$confirm("此操作将禁用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let res = this.$store.dispatch("role/disableSelecRole", id);
        res.then(() => {
           this.getcharList();
          this.$message({
            type: "success",
            message: "禁用成功!",
          });
        });
      });
     
    },
  },
};
</script>

<style lang="less" scoped>
</style>>

