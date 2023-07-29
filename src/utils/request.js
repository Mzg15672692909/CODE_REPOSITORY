import axios from 'axios'
import {Message} from 'element-ui';
import {getToken} from '@/utils/auth'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

//请求拦截器
axios.interceptors.request.use(config=>{
    //token带上
    config.headers['token'] = getToken();
    return config;
});
//响应拦截器
axios.interceptors.response.use(res=>{
    //对响应数据处理
    let {code,msg} = res.data;
    if(code !== 20000){ //状态的判断  错误码的判断
        Message({
            message: msg ||'服务器不给力！',
            type: 'warning',
            duration:2000
          });
    }
    return res
},err=>{
    //404 500
    return Promise.reject(err)
});

export default axios;