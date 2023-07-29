<template>
    <div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            :before-close="cancel"
            >

            <slot>
                <p>内容</p>
            </slot>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">{{ btnTitle }}</el-button>
            </span>
        </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        dialogTitle:{
            type:String,
            defalut:'标 题'
        },
        btnTitle:{
            type:String,
            defalut:'确 定'
        },
        visible:{
            type:Boolean,
            defalut:false
        }
    },
    methods:{
        cancel(){
            this.$emit('update:visible',false);
        },
        confirm(){
            this.$emit('confirm');
        },
    }
  }
  </script>
  
  
  