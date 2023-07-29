<template>
    <el-dropdown>
        <el-button type="primary" size="mini" >
            {{ $t('message.lang') }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="switchLang('zh')">中文</span></el-dropdown-item>
            <el-dropdown-item><span @click="switchLang('en')">English</span></el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>

</template>
  
  <script>
  export default {
    data(){
      return {
        
      }
    },
    methods:{
        switchLang(type){
            this.$i18n.locale = type;  //国际化语言切换
        }
    }
  }
  </script>
  
  
  