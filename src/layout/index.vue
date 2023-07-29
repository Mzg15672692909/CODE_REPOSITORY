<template>
  <div class="app-wrapper">
    <el-container>
        <!-- 左侧导航 -->
        <Sidebar />
    <el-container>
        <!-- 头部 -->
        <el-header>
            <Header />
        </el-header>
        <!-- 主体部分 -->
        <el-main>
            <Main />
        </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import {Sidebar,Header,Main} from './components'

export default {
  data(){
    return {

    }
  },
  components:{
    Sidebar,
    Header,
    Main
  },
  methods:{

  }
}
</script>


