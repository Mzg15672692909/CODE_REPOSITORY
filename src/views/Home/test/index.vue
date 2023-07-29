<template>
  <div class="about">
    全局组件
    <myHello />
    <myHello2 />
    <myBanner />

    <input v-model="test" />
    <Sub :test.sync="test" />
    <!-- @update:test ="val =>test = val" -->
  </div>
</template>

<script>
import Sub from './sub.vue'
export default {
  data(){
    return {
      test:10
    }
  },
  components:{Sub},
  mounted(){
    this.abc();
  },
  methods:{
    abc(){
      return function(){
        console.log('test')
      }
    }
  }
}
</script>


