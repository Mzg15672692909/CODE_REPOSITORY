<template>
    <div class="banner">
       <img v-for="(v,i) in items" :key="i" v-show="n==i" :src="v"/>
    </div>
  </template>
  
  <script>
  
  export default {
    name:'myBanner', //唯一
    data(){
      return {
        n:1,
        items:[
            require('@/assets/img/1.jpg'),
            require('@/assets/img/2.jpg'),
            require('@/assets/img/3.jpg')
        ],
        timer:null //定时器初始化
      }
    },
    mounted(){
        this.autoPlay();
    },
    destroyed(){
      clearInterval(this.timer);
    },
    methods:{
      autoPlay(){
        this.timer = setInterval(this.play,2000);
      },
      play(){
        this.n++;
        if(this.n==this.items.length){
          this.n = 0;
        }
      }
    }
  }
  </script>
  
  
  