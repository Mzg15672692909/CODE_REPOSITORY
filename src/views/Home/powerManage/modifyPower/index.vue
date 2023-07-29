<template>
  <div>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      fixed
      type="index"
      label="序号"
      >
    </el-table-column>
    <el-table-column
      fixed
      prop="account"
      label="审批管理员"
      column-key="account"
      >
    </el-table-column>
 
    <!-- <el-table-column
      prop="created"
      label="加入时间"
      column-key="created"
      >
      <template slot-scope="{row}">
        <span>{{ row.created | getDate}}</span>
      </template>
    </el-table-column> -->

    <el-table-column
      prop="permission"
      label="设置权限"  >
      <template slot-scope="{row}">
          <el-checkbox-group v-model="row.permission">
            <el-checkbox label="one" name="type">一审</el-checkbox>
            <el-checkbox label="two" name="type">二审</el-checkbox>
            <el-checkbox label="end" name="type">终审</el-checkbox>
          </el-checkbox-group> 
      </template>
    </el-table-column>

    
    <el-table-column label="操作" >
      <template slot-scope="{row}">
          <el-button
          size="mini"
          type="warning" @click="handleSubmit(row)" 
          >修改权限</el-button>        
      </template>
    </el-table-column>

  </el-table>

  </div>
</template>

<script>
import {permissionList,permissionCreateOrUpd} from '@/api/api'

export default {
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let res = await permissionList();
        var {code,data} = res.data;
        if(code == '20000'){
            this.list = data.list;  //获取展示的数据
          }
    },
    async handleSubmit(row){
      let {id,user_id,permission} = row;
      let res = await permissionCreateOrUpd({id,user_id,permission})   //通过状态
        let {code} = res.data;
        if(code=='20000'){
          this.getList();
          this.$notify({  //通知框
            title: '修改权限',
            message: '修改成功',
            type:'success',
            duration: 1000
          });
        }
    }
  }
}
</script>
