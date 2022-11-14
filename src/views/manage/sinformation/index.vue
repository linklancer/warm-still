<template>
  <div id="student">
         <!-- 搜索区域 -->
    <!-- <el-form inline>
      <el-form-item>
        <el-input placeholder="角色名称"  v-model="studentInfo.keyword" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" >查询</el-button>
      <el-button  @click="clearKeyWord">清空</el-button>
    </el-form> -->
    <!-- 添加删除按钮 -->
    <div style="margin-bottom: 20px; margin-left: 20px; margin-top:40px;">
      <el-button type="primary"  @click="openDialog">添加</el-button>
      <!-- <el-button type="danger">批量删除</el-button> -->
    </div>
     <!-- 角色表格 -->
    <el-table
      ref="multipleTable"
      :data="studentDetailInfo"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="学生姓名" width="80">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.gender == 1 ? '男':'女' }}
        </template>
      </el-table-column>
      <el-table-column
        label="学号"
        show-overflow-tooltip
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="120">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="学生姓名" width="120">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="学校" width="120">
        <template slot-scope="scope">{{ scope.row.school }}</template>
      </el-table-column>
      <el-table-column label="学院" width="180">
        <template slot-scope="scope">{{ scope.row.college }}</template>
      </el-table-column>
      <el-table-column label="专业" width="120">
        <template slot-scope="scope">{{ scope.row.profession }}</template>
      </el-table-column>
       <el-table-column label="班级" width="80">
        <template slot-scope="scope">{{ scope.row.classes }}</template>
      </el-table-column>
       <el-table-column label="出生日期" width="120">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
       <el-table-column label="情绪状态" width="120">
        <template slot-scope="scope">{{ scope.row.emoStatus }}</template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-remove" size="mini" @click="disRole(scope.row.id)"></el-button>

        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>

        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
        
      </el-table-column> -->
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
      <el-form :model="formdata" :rules="rules" ref="userform">
        <el-form-item label="班级" :label-width="formLabelWidth" size="small" prop="classes" >
          <el-input v-model="formdata.classes" autocomplete="off" style="width:200px;" ></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="formdata.phone" autocomplete="off"  style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth" prop="profession">
          <el-input v-model="formdata.profession" autocomplete="off" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth" prop="college">
          <el-input v-model="formdata.college" autocomplete="off" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
          <el-input v-model="formdata.number" autocomplete="off" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="情绪状态" :label-width="formLabelWidth" prop="emoStatus">
          <el-input v-model="formdata.emoStatus" autocomplete="off" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="formdata.name" autocomplete="off" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="学校" :label-width="formLabelWidth" prop="school">
          <el-input v-model="formdata.school" autocomplete="off" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="formdata.gender" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker
            v-model="formdata.birthday"
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
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Sinformation',
  data() {
    
    return {
       loading:true,
       dialogFormVisible:false,
       formLabelWidth:'120px',
       studentInfo: {
        current: 1,
        keyword: "",
        size: 10,
      },
      formdata:{
          birthday:'',
          classes:"",
          college:'',
          emoStatus:'',
          gender:'',
          name:'',
          number:'',
          phone:'',
          profession:'',
          school:''
      },
      rules:{
        phone:[
          // 添加正则表达式 pattern: /^1[3|5|7|8|9]\d{9}$/，验证手机号是否正确
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        classes:[
           { required: true, message: '请输入班级', trigger: 'change' },
        ],
        birthday:[
           { required: true, message: '请选择生日', trigger: '' ,type:'data'},
        ],
        college:[
          { required: true, message: '请输入学院名称', trigger: 'change' }
        ],
        emoStatus:[
            { required: true, message: '请填写情绪状态', trigger: 'change' }
        ],
        gender:[
              { required: true, message: '请选择性别', trigger: 'change' }
        ],
         name:[
           { required: true, message: '请输入姓名', trigger: 'change' }
         ],
         number:[
           { required: true, message: '请输入学号', trigger: 'change' }
         ],
         profession:[
            { required: true, message: '请填写专业', trigger: 'change' }
         ],
         school:[
           { required: true, message: '请填写学校', trigger: 'change' }
         ]
      },
      studentDetailInfo:[]
    }
  },
  mounted() {
    this.ForGetStuData()
  },
  methods:{
    //拿到学生数据
     async ForGetStuData(){
         let res =  this.$store.dispatch("student/getStudentData",this.studentInfo)
         res.then(()=>{
            this.studentDetailInfo = this.$store.state.student.studentinfo
            this.loading = false
         })
      },
     // 清空搜索框
    clearKeyWord(){
      this.charInfo.keyword = ''
      //清空后，再次查询角色列表
     
    },
    // 打开对话框
    openDialog() {
      this.dialogFormVisible = true;
    },
    //验证表单
    ValFormdata(){

    },
    // 增加学生数据
    addStudent(){
      this.$refs.userform.validate(valid=>{
        if(!valid){
          return false
        }
         this.formdata.classes = parseInt( this.formdata.classes)
        this.formdata.number = parseInt(this.formdata.number )
        this.$store.dispatch('student/InsertStudentData',this.formdata)
         this.dialogFormVisible = false
        
      })
       
    }
  }
}
</script>

<style>

</style>
