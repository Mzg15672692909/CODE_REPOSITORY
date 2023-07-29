<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>办公申请</span>
      </div>
    
      <el-form-item label="申请人" prop="applicant">
        <el-select v-model="ruleForm.applicant" placeholder="请选择申请人" style="width:100%">
          <el-option  v-for="v in user" :key="v.key" 
            :label="v.account" :value="v.id"></el-option>
        </el-select>
      </el-form-item>

        <el-form-item label="申请日期" prop="created">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.created" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="出差天数" prop="travel_days">
          <el-input-number v-model="ruleForm.travel_days"  :min="1" :max="10" label="申请数量"></el-input-number>
        </el-form-item>

        <el-form-item label="报销金额" prop="money">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>

        <!--  :http-request  覆盖默认的上传行为，可以自定义上传的实现
          :limit 最大上传的个数
            multiple 支持多选
            :on-exceed 文件超出个数限制时的钩子
            before-upload上传文件之前的钩子，参数为上传的文件
        -->
        <el-form-item label="上传发票" prop="bill">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="uploadFile"
            :before-upload = "beforeUpload"
            :limit="1"
            :on-exceed="handleExceed"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg图片文件，且不超过1MB</div>
          </el-upload>

        </el-form-item>

        <el-form-item label="出差城市" prop="destination">
          <el-cascader
            v-model="ruleForm.destination"
            :options="options"></el-cascader>
        </el-form-item>

        <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-card>
  </el-form>
</template>

<script>
import {userEmployee,travelCreate,getArea} from '@/api/api'

export default {
  data(){
    return {
      user:[], //所有员工
      ruleForm: {
        applicant: '',  //申请人
        created: '', //申请日期
        travel_days:'1', //出差的天数
        money:'' ,//报销金额
        bill:'' ,//上传的文件
        destination:'北京市', //出差城市
      },
      options:[], //省市数据
        rules: {
          applicant: [
            { required: true, message: '请选择申请人', trigger: 'blur' },
          ],
          created: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          money: [
            { required: true, message: '请选择商品', trigger: 'change' }
          ],
          travel_days: [
            { required: true, message: '请输入数量', trigger: 'change' }
          ],
          destination:[
            { required: true, message: '请输入申请原因', trigger: 'change' }
          ]
        }
    }
  },
  mounted(){
    this.getEmployee();
    this.getCity();
  },
  methods:{
    async getEmployee(){
      let res = await userEmployee();
      let {code,data} = res.data;
      if(code == 20000){
        this.user = data;
      };
    },
    uploadFile(params){ //覆盖默认的上传行为，可以自定义上传的实现
      //暂存
      this.ruleForm.bill = params.file; 
    },
    //文件超出个数限制时的钩子
    handleExceed(){
      this.$notify({
          title: '最大上传数为1',
          message: '最大上传数为1',
          type:'success',
          duration:2000
        });
    },
    //上传文件之前的钩子，参数为上传的文件  限制上传的格式或大小
    beforeUpload(file){
      console.log(file);
      const isJPG = file.type=='image/jpeg';
      const isSize = file.size/1024/1024 <2;

      if(!isJPG){
        this.$message.error('只能上传jpg图片文件');
      }
      if(!isSize){
        this.$message.error('上传图片大小不能超过');
      }
      return isJPG && isJPG;

    },
    submitForm(formName) { //创建数据
      let formdata = new FormData();
      for(let k in this.ruleForm){
        if(k=='destination'){
          this.ruleForm['destination'] =this.ruleForm['destination'] .join(',');  //类型转换
        };
        formdata.append(k,this.ruleForm[k])
      };
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let res = await travelCreate(formdata);
            let {code} = res.data;
            if(code == 20000){
              this.$router.push('/approvalManage/travelManage');
            }
          }else {
            return false;
          }
        });
      },
    
    async getCity(){  //省市数据
        let res = await getArea();
        //console.log(res);
        let {code,data} = res.data;
        if(code == 20000){
          let data2 = data.map(v=>({...v,value:v.AreaName,label:v.AreaName}));
          let p = data2.filter(v=>v.AreaLevel==2); //省
          let c = data2.filter(v=>v.AreaLevel==3); //市
          p.forEach(item=>{item.children = c.filter(v=>v.ParentId==item.AreaID)});
          //console.log(p);
          this.options = p;
        }
    }
  }
}
</script>


