<template>
  <el-breadcrumb separator="/">
    <span><i class="el-icon-s-home"></i>当前位置：</span>
    <el-breadcrumb-item v-for="v in items">
      <router-link :to="v.path">{{$t('message')[v.name]}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data(){
    return {
      items:[]
    }
  },
  watch:{
    $route(newValue,oldValue){
      this.getBreadcrumb(newValue.matched);
    }
  },
  mounted(){
    this.getBreadcrumb(this.$route.matched);
  },
  methods:{
    getBreadcrumb(matched){
      if(matched?.[1].name=='index'){ //?.链操作符  matched?.[1]===>matched&&matched[1].name
        matched = [{path:'/home',name:'home',meta:{title:'企业首页'}}];
      };
      this.items = matched;
    }
  }
}
</script>


