<template>
  <div class="about">
    <h1>子组件：{{ test }}</h1>
    <button @click="action">btn</button>
  </div>
</template>

<script>
export default {
  props:['test'],
  data(){
    return {

    }
  },
  methods:{
    action(){
      this.$emit('update:test',999);
    }
  }
}
</script>


