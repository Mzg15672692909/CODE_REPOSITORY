<template>
  <div class="login-head">
    <div class="login-img"></div>
    <div class="about">
      <h2>流程审批权限管理系统</h2>
      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import {login} from '@/api/api';
import {setToken} from '@/utils/auth'

export default {
  data(){
    // 自定义校验
    // const validaPhone = (rule,value,callback)=>{
    //   //正则
    //   let regx = /^1[34578]\d{9}$/; //11位
    //   if(!value){
    //     return callback(new Error('请输入手机号'))
    //   };
    //   if(!regx.test(value)){
    //     return callback(new Error('手机号错误！'))
    //   }
    // };
    return {
      ruleForm:{
        account:'admin',
        password:'admin@123'
      },
      rules: {
          //基本校验
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          //函数校验
          // account: [
          //   { validator:validaPhone, trigger: 'blur' },
          // ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            //校验通过
            //加密密码
            this.ruleForm.password = md5(this.ruleForm.password);
            //请求发送
            const res = await login(this.ruleForm);
            console.log(res);
            let {code,data} = res.data;
            if(code==20000){
              //token 存
              setToken(data.token); //
              this.$router.push('/home');
            }
          } else {
            //未通过
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>




