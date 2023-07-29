<template>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="curPage"
        :page-size="curSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </template>
  
  <script>
  
  export default {
    name:'my-pagination', //唯一
    props:{
      total:{
        required:true,
        type:Number
      },
      layout:{
        type:String,
        default:"total, sizes, prev, pager, next, jumper"
      },
      pageSizes:{
        type:Array,
        default:()=>[10,20,30,40,50]
      },
      page:{ //页码
        type:Number,
        default:1
      },
      sizes:{ //页数
        type:Number,
        default:10
      },
    },
    computed:{
      curPage:{
        get(){
          return this.page
        },
        set(val){
          this.$emit('update:page',val)
        }
      },
      curSize:{
        get(){
          return this.sizes
        },
        set(val){
          this.$emit('update:sizes',val)
        }
      }
    },
    methods:{
      //分页  每页多少条改变
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$emit('action')
      },
      //页码改变
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$emit('action')
      }
    }
  }
  </script>
  
  
  