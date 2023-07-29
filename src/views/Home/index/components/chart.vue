<template>
    <div>
        <div ref="chart" :style="style"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts' 
  
  export default {
    //props:['type'],//父传子
    props:{
        width:{
            type:String,
            default:'100%'
        },
        height:{
            type:String,
            default:'100%'
        },
        option:{
            type:Object,
            default:()=>({
                title:{
                    text:'echart图表'
                },
                xAxis:{
                    data:['1月','1月','1月','1月','1月','1月']
                },
                yAxis:{},
                series:[
                    {
                        type:'bar',
                        data:[10,20,30,40,50,60]
                    }
                ]
            })
        }
    },
    data(){
      return {
        myChart:""
      }
    },
    computed:{
        style(){
            return {
                width:this.width,
                height:this.height
            }
        }
    },
    //国际化
    // watch:{
    //     "$i18n.locale"(newValue,oldValue){
    //         console.log('lang')
    //         this.myChart = echarts.init(this.$refs.chart);
    //         this.myChart.setOption(this.option);
    //     }
    // },
    mounted(){
        this.myChart = echarts.init(this.$refs.chart);
        this.myChart.setOption(this.option);
         //响应式
         window.addEventListener('resize',()=>{
            this.myChart.resize(); 
         })
    },
  }
  </script>
  
  
  