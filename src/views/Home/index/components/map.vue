<template>
    <div>
        <div ref="chart" :style="style"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts' 
  import chinaMap from '@/assets/json/china.json'
  
  export default {
    //props:['type'],//父传子
    props:{
        width:{
            type:String,
            default:'100%'
        },
        height:{
            type:String,
            default:'500px'
        },
    },
    data(){
      return {
        lists:[]
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
    async mounted(){
        this.initChart(); 
    },
    methods:{
        initChart(){
            var myChart = echarts.init(this.$refs.chart);
            //注册可用的地图
            echarts.registerMap('china',chinaMap);
            let option ={
                geo:{
                    show:true,
                    type:'map',
                    map:'china',
                    label:{  //标签文字样式 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                        //show:true,
                        color:'#fff',
                        fontSize:12
                    },
                    itemStyle:{  //区域样式
                        areaColor:'#5e84fd',
                        borderColor:'#fff'
                    },
                },
                series:[
                    {
                        type:'effectScatter',//带有涟漪特效动画的散点（气泡）图
                        coordinateSystem:'geo',
                        symbol:'circle', //标记的形状
                        label:{
                            show:true,
                            position:'right',
                            formatter:'{b}'
                        },
                        symbolSize:function(value){
                            return value[2]
                        }, //标记的大小
                        itemStyle:{
                            color:'yellow'
                        },
                        data:[
                            {
                                name:'重庆',
                                value:[106.54, 29.59,10]
                            },
                            {
                                name:'南昌',
                                value:[115.89, 28.68,20]
                            },
                            {
                                name:'秦皇岛',
                                value:[119.57, 39.95,15]
                            },
                            {
                                name:'郑州',
                                value:[113.65, 34.76,22]
                            },
                            {
                                name:'合肥',
                                value:[117.27, 31.86,12]
                            }
                        ]
                    }
                ]
                
            };
            myChart.setOption(option);
            //响应式
            window.addEventListener('resize',()=>{
                myChart.resize(); 
            })
            }
    }
  }
  </script>
  
  
  