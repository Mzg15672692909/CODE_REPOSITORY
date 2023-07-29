// export 和 import复合的写法  先输入后输出同一个模块
export {default as Sidebar} from './sidebar'
//相当于
// import Sidebar from './sidebar'
// export default Sidebar
export {default as Header} from './header'
export {default as Main} from './main'


