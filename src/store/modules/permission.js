import {routes} from '@/router'  //路由中的配置对象
import menuData from '@/utils/menu' //公共数据
import {initRoutes} from '@/utils/routesFn'  //将数据转为路由数据
import {deep} from '@/utils/deepCopy'

function filterRouter(data,rolesName,approvePermission){ //是对公共数据的过滤处理
  let _data = data.filter(item =>{
    if(item.name == 'approvalProcess' && approvePermission){  //approvePermission="end,one"
      let arr = approvePermission.split(','); //['end','one'];
      item.children =  item.children.filter(v=>arr.some(d=>v.permission.includes(d))); 
    };
    return item.roles && rolesName.some(d=>item.roles.includes(d));
  });
  return  _data ;
};

const state = {
  routeData:[] //路由数据
}
const getters = {
  get_routes:state=>state.routeData
}
const mutations = {
  SET_ROUTES:(state,data)=>{
    state.routeData = data;
  }
}

const actions = {
  CHANGEROUTES({commit},rolesArr){  //rolesArr  [{id:1,name:'input'}]
    return new Promise((resolve,reject)=>{
      //1、取出角色
      let rolesName = rolesArr.map(v=>v.name); 
      // 取出审批管理员权限  [{id: 3, name: "approve", permission: "end,one"}]
      let approvePermission = rolesArr[0].permission; //"end,one"
      //2、选筛选home
      let homeRoutes = routes.filter(v=>v.path==='/home')[0];  //{}
      //3、添加children子级
      homeRoutes.children = [];
      //4、动态生成路由数据
      let filterData = [];  //根据角色来数据过滤
      if(rolesName.includes('administrator')){  //是否是管理员
        filterData = menuData;  
      }else {
        let data = deep([],menuData);  //深拷贝
        filterData = filterRouter(data,rolesName,approvePermission);
      };
      initRoutes(filterData,homeRoutes.children);   //将数据转为路由数据
      //vuex缓存一份数据，供导航菜单使用
      commit('SET_ROUTES',filterData);
      resolve(routes); //路由数据
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}


// ['input'].some(v=>['input','approve'].includes(v));  //['input','approve']只要有一个满足input返回true