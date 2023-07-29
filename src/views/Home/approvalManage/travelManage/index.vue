<template>
  <div >
      <div class="filter-container">
        <el-input v-model="listQuery.name"
          prefix-icon="el-icon-search"
          placeholder="请输入用户名" 
          class="filter-item" 
          size="medium"
          @input="getList()"
        />
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
      prop="travel_days"
      label="出差天数"
      column-key="travel_days"
      >
    </el-table-column>
    <el-table-column
      prop="destination"
      label="出差城市"
      column-key="destination"
      >
    </el-table-column>
    <el-table-column
      prop="bill_path"
      label="发票"
      column-key="bill_path"
      >
      <template slot-scope="{row}">
        <img width="50" height="50"  :src="url+row.bill_path">
      </template>

    </el-table-column>
    <el-table-column
      prop="status"
      label="审批状态"
      width="100"
      :filters="filterStatus"
      :filter-method="filterHandler"> 
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusStyle"> {{ row.status |statusfilter}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="280">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          type="success"
          @click="handleSubmit(scope.$index, scope.row)"
          :disabled="scope.row.status !=0 && scope.row.status !=3">提交</el-button>
      </template>
    </el-table-column>

  </el-table>
      <!-- 删除弹框 -->
    <Dialog 
      :dialogTitle="'申请管理-办公审批-删除'"
      :btnTitle = "'删 除'"
      :visible.sync ="dialogDelVisible"
      @confirm="delData"
    >
    <span>确定删除？</span>
    </Dialog>

    <!-- 分页 -->
    <my-pagination
      :total="rows"
      :page.sync = "listQuery.pageNo"
      :sizes.sync = "listQuery.pageSize"
      @action ="getList"
    />
  </div>
</template>

<script>
import {travelList} from '@/api/api'
import Dialog from '@/components/dialog.vue'

export default {
  components:{Dialog},
  data(){
    return {
      url:process.env.VUE_APP_protalurl,  //全局变量
      tableData: [], //表格展示的数据
      listQuery:{
        pageNo:1,
        pageSize:10,
        name:''
      },
      rows:1, //总条数
      temp:{}, //数据存储
      dialogDelVisible:false, //删除弹框的显示与隐藏
    }
  },
  computed:{
    filterStatus(){
      //数组对象去重
      let map = new Map();
      for(let item of this.tableData){
        let v = {...item}; //避免修改源对象
        if(!map.has(v.status)){
          v.text = this.$options.filters['statusfilter'](v.status);
          map.set(v.status,v);
        }
      };
      const data = [...map.values()]; //
      return data.map(item=>({text:item.text,value:item.status}));
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    async getList(){ //列表查询
      let res = await travelList(this.listQuery);
      let {code,data} = res.data;
      if(code == 20000){
        this.tableData = data.list;
        this.rows = data.rows; //总条数
      }
    },
    //筛选 状态
    filterHandler(value, row, column) { //
        const property = column['property'];
        return row[property] === value;
    },
  }
}
</script>


