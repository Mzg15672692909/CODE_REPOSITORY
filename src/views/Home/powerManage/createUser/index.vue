<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建员工与审批管理员</span>
      </div>
    
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入用户名"></el-input>
      </el-form-item>
      
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>

        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="ruleForm.password2" placeholder="请输入确认密码"></el-input>
        </el-form-item>

        <el-form-item label="权限分配" prop="role_id">
          <el-radio-group v-model="ruleForm.role_id" size="medium">
          <el-radio label="2" border>员工</el-radio>
          <el-radio label="3" border>审批管理员</el-radio>
        </el-radio-group>
        </el-form-item>

        <el-form-item label="审批权限分配" prop="permission" v-show="ruleForm.role_id==3">
          <el-checkbox-group v-model="ruleForm.permission" size="medium">
            <el-checkbox-button label="one" >一审</el-checkbox-button>
            <el-checkbox-button label="two" >二审</el-checkbox-button>
            <el-checkbox-button label="end" >终审</el-checkbox-button>
        </el-checkbox-group>
        </el-form-item>

        <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-card>
  </el-form>
</template>

<script>
import {permissionCreateUser} from '@/api/api'

export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不同'));
          }
          callback();
        }
      };
    return {
      user:[], //所有员工
      ruleForm: {
        account: '',
        password: '',
        password2: '',
        role_id: '2',  //员工2 审批管理员 3
        permission: [] //审批权限分配  一审  二审  终审
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 18, message: '长度必须在2-18位',trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, max: 18, message: '长度必须在2-18位',trigger: 'blur' },
          ],
          password2: [
            { required: true, validator:validatePass, trigger: 'blur' },
          ],
          role_id:[
            { required: true, message: '请选择权限', trigger: 'change' }
          ]
        }
    }
  },
  methods:{
    submitForm(formName) { //创建数据
        this.$refs[formName].validate(async valid => {
          let {permission} = this.ruleForm;
          if (valid) {
            const data = {
              ...this.ruleForm,
              permission:permission.join(',')
            };
            let res = await permissionCreateUser(data);
            let {code} = res.data;
            if(code == 20000){
              this.$router.push('/powerManage/userLists');
              this.$notify({
                title: '创建成功',
                message: '创建成功',
                type:'success',
                duration:2000
              });
            }
          }else {
            return false;
          }
        });
      },
  }
}
</script>


