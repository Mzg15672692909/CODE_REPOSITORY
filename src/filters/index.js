import Vue from 'vue'
import * as filters from './filters'

Object.keys(filters).forEach(item=>{
    Vue.filter(item,filters[item])
})
