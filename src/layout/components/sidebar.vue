<template>
  <el-aside width="200px" class="aside">
    <el-menu
      :default-active="$route.path" exact
      class="el-menu-vertical-demo" router>
          <sideItem  v-for="item in get_routes" :key="item.url" :item="item"/>
        
      </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'; //vuex辅助函数
import sideItem from './sideItem'


export default {
  data(){
    return {
      
    }
  },
  components:{
    sideItem
  },
  computed:{
    ...mapGetters(['get_routes'])
  }
}
</script>


