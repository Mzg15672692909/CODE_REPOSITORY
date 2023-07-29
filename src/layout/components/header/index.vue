<template>
  <div class="app-breadcrumb">
    <!-- 面包屑 -->
      <Breadcurmb />
    <!-- 右侧按钮 -->
    <div class="right-menu">
      <Lang />
      <el-button type="danger" size="mini" icon="el-icon-share" @click="goBack">{{$t("message.exit") }}</el-button>
    </div>
  </div>
</template>

<script>
import Breadcurmb from './beadcrumb.vue'
import {removeToken} from '@/utils/auth'
import Lang from './lang.vue'

export default {
  components:{Breadcurmb,Lang},
  data(){
    return {

    }
  },
  methods:{
    async goBack(){
      await this.$store.dispatch('LOGOUT');
      removeToken(); //token清除
      this.$router.push('/login');
    }
  }
}
</script>


