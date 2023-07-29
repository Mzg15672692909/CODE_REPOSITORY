<template>
  <div class="content">
    <!-- 一行二列   -->
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" >
          <div class="bg-white bg-purple"><Chart /></div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
          <div class="bg-white bg-purple-light"><Chart /></div>
        </el-col>
      </el-row>
    </div>
    <!-- 二行二列 -->
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
          <div class="bg-purple">
            <div class="content-row">
              <el-row>
                <el-col :span="24" >
                  <div class="bg-white bg-purple"><Chart height="250px" :option="chartData2"/></div>
                </el-col>
              </el-row>
            </div>

            <div class="content-row">
              <el-row>
                <el-col :span="24" >
                  <div class="bg-white bg-purple"><Chart height="250px" :option="chartData2"/></div>
                </el-col>
              </el-row>
            </div>
            
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" >
          <div class="bg-white bg-purple">
            <Map />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 平均分配  -->
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" >
          <div class="bg-white bg-purple"><Chart height="300px" :option = "chartData1" /></div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" >
          <div class="bg-white bg-purple-light"><Map1 /></div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import {Chart,Map,Map1} from './components'


export default {
  components:{Chart,Map,Map1},
  data(){
    return {
      chartData1:{
        title: {
          text: this.$t('message.chartTitle'),
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: this.$t('message.hello') },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      chartData2:{
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    }
  },
  
}
</script>


