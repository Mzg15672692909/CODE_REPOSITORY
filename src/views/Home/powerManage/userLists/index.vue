<template>
  <div>
     <div class="filter-container">
        <el-input v-model="listQuery.name" 
          prefix-icon="el-icon-search"
          placeholder="请输入用户名" 
          class="filter-item" 
          size="medium"
        @input="getList()"/>
      </div> 
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="reg_time"
        label="创建时间">
      </el-table-column>

      <el-table-column
        prop="role_name"
        label="权限分配" 
      >
      <template slot-scope="scope">
          <span>{{ scope.row.role_name | getRole }}</span>
        </template>
      </el-table-column>

       <el-table-column label="操作" width="150">
      <template slot-scope="{row}">
        <el-button
          size="mini"
          type="danger">删除 </el-button>
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
import {permissionUserlist} from '@/api/api'

export default {
  name: '',
  filters: {
    getRole(type){
       switch(type){
          case 'input':
              return '员工';
          case 'approve':
              return '审批管理员';
          default:
              return type;
      }
    }
  },
  data() {
    return {
      list: null,
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
    this.getList()
  },
  methods: {
    async getList() {
      let res = await permissionUserlist(this.listQuery);
        var {code,data} = res.data;
        if(code == '20000'){
            this.list = data.list;  //获取展示的数据
            this.rows = data.rows;
            this.pages = data.pages;
          }
    },

  }
}
</script>
