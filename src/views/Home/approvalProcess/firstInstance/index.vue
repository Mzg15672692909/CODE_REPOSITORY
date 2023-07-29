<template>
  <div >
    <div class="filter-container">
      <el-input v-model="listQuery.name" 
        prefix-icon="el-icon-search"
        placeholder="请输入用户名" 
        class="filter-item" 
        size="medium"
       @input="getList()"/>
    </div> 

    <el-table
    :data="tableData"
    style="width: 100%"
    stripe>
    <el-table-column
      fixed
      type="index"
      label="序号"
      >
    </el-table-column>
    <el-table-column
      fixed
      prop="account"
      label="申请人"
      column-key="account"
      >
    </el-table-column>
 
    <el-table-column
      prop="created"
      label="申请时间"
      column-key="created"
      >
    </el-table-column>
    
    <el-table-column
      prop="app_type"
      label="申请类别">
      <template slot-scope="{row}">
        <el-tag :type="row.app_type | categoryStyle"> {{ row.app_type |categoryfilter}}</el-tag>
      </template>
    </el-table-column>

     <el-table-column label="操作" >
      <template slot-scope="{row}">
          <el-button
          size="mini"
          type="success" 
          @click="handleSubmit(row,'通过')"
          >通过</el-button>
        <el-button
          size="mini"
          type="danger" 
          @click="handleSubmit(row,'驳回')"
          >驳回</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 删除弹框 -->
  <Dialog 
      :dialogTitle="`一审${passOrRejectType}`"
      :btnTitle = "passOrRejectType"
      :visible.sync ="dialogVisible"
      @confirm="confirm"
    >
    <span>确定{{passOrRejectType}}？</span>
  </Dialog>

  <my-pagination
      :total="rows"
      :page.sync = "listQuery.pageNo"
      :sizes.sync = "listQuery.pageSize"
      @action ="getList"
    />


  </div>
</template>

<script>
import {oneList,onePass,oneReject}from '@/api/api'
import Dialog from '@/components/dialog.vue'
  
export default {
  name: 'ComplexTable',
  components:{Dialog},
  data() {
    return {
      tableData: [], //表格展示的数据
      pages:1, //总页数
      rows:1, //总条数
      listQuery:{
        pageNo:1, //当前页面
        pageSize:10, //条数
        name:''  //查询条件
      },
      passOrRejectType:'通过', //通过或驳回
      dialogVisible:false, //弹框
      temp:{}
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(){  //获取数据
      let res = await oneList(this.listQuery);
      var {code,data} = res.data;
      if(code == '20000'){
          this.tableData = data.list;  //获取展示的数据
          this.rows = data.rows;
          this.pages = data.pages;
        }
    },
    //通过或驳回按钮触发事件
    handleSubmit(row,type){
      this.temp = {...row};
      this.passOrRejectType = type;
      this.dialogVisible = true;
    },
    //提交通过或驳回
    async confirm(){
      //传的参数 app_id,app_type,id 传给服务端
      let {app_id,app_type,id} = this.temp;
      this.passOrRejectType=='通过' ?
        await onePass({app_id,app_type,id})
      :
        await oneReject({app_id,app_type,id});
      this.$notify({
        title: '一审',
        message: '操作成功',
        type:'success',
        duration:1000
      });
      this.dialogVisible = false;
      this.getList(); //查询数据
    }
  }
}
</script>

<style>

</style>
