<template>
  <div class="content">
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
          type="primary" :disabled="row.file_path !=null" @click="handleCreate(row)"
          >生成凭证</el-button>
        <el-button
          size="mini"
          type="success"  :disabled="row.file_path ==null" @click="handleDownLoad(row)"
          >下载凭证</el-button>
          <!-- <a href="" download></a> -->
          
          
      </template>
    </el-table-column>
  </el-table>

    <my-pagination 
      :total="rows"
      @change = "getList"
      :page.sync= "listQuery.pageNo"
      :limit.sync="listQuery.pageSize"  />

  </div>
</template>

<script>
import {docList,createFile,docDownload}from '@/api/api'
import {getToken} from '@/utils/auth'
  
export default {
  name: 'ComplexTable',
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
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(){  //获取数据
      let res = await docList(this.listQuery)
        var {code,data} = res.data;
        if(code == '20000'){
          this.tableData = data.list;  //获取展示的数据
          this.rows = data.rows;
          this.pages = data.pages;
        }
      },
    //生成凭证
    async handleCreate(row){ 
      let res = await createFile({id:row.id});
      let {code,data} = res.data;
      if(code == 20000){
        this.$notify({
          title: '生成凭证',
          message: '生成凭证成功',
          type:'success',
          duration:1000
        });
        this.getList(); //查询数据
      }
    },  
    //下载凭证
    async handleDownLoad(row){  
      let res = await docDownload({id:row.id});
      let {code,data} = res.data;
      if(code == 20000){
        this.$notify({
          title: '下载凭证',
          message: '下载凭证成功',
          type:'success',
          duration:1000
        });
      };
      //第二次请求  data.file_path
      this.downloadFile(`${process.env.VUE_APP_protalurl}static/${data.file_path}`,data.file_path);

    },
    downloadFile(url,fileName){  //第二次请求 获取到文件流
      const xhr  = new XMLHttpRequest();
      xhr.open('GET',url);
      xhr.responseType = "blob"; //blob字节流
      xhr.setRequestHeader('token',getToken()); //传入token
      xhr.send();
      xhr.onload=()=>{
        if(xhr.status==200){
          console.log(xhr.response)
          this.createA(xhr.response,fileName);
        }
      }
    },
    //动态创建a标签  <!-- <a href="文件的链接地址" download="下载的文件名称"></a> -->
    createA(data,fileName){
      let _blob = new Blob([data]);
      //window对象下有URL对象作用：专门用来将blob或file读取成url;
      let a = document.createElement('a'); //创建a标签
      a.href = window.URL.createObjectURL(_blob);
      a.download = fileName;  //下载的文件名称
      a.click(); //触发a标签
    }
  }
}
</script>

<style>

</style>
