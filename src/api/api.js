//统一接口地址
import http from '.' // ./index

//登录
export const login = data =>http.post(`user/login`,data);

//退出
export const logout = data =>http.post(`user/logout`,data);

//查询用户信息
export const userInfo = ()=>http.get(`user/info`);

//地图数据  员工分布
export const getMap = ()=>http.get(`user/employ-map`);

//查询所有员工
export const userEmployee= ()=>http.get(`user/employee`);

//申请类别 - 办公审批
export const officeCreate = data => http.post(`apply/office/createOrUpd`,data); 

//申请管理-办公审批 数据查询
export const officeList= data =>http.get(`apply/office/list`,data);

//申请类别 - 办公审批 - 提交
export const officeSubmit= data => http.post(`apply/office/submitToApprove`,data); 

//申请类别 - 办公审批 - 删除
export const officeDelete= id => http.delete(`apply/office/delete/${id}`); 

//审批流程  一审
export const oneList = data => http.get(`approve/one/list`,data); 

//审批流程  一审通过
export const onePass= data => http.post(`approve/one/pass`,data); 

//审批流程  一审驳回
export const oneReject= data => http.post(`approve/one/reject`,data); 

//档案管理
export const docList = data => http.get(`doc/list`,data); 

//档案管理-生成凭证
export const createFile = data => http.post(`doc/createFile`,data); 

//档案管理-下载凭证
export const docDownload = data => http.get(`doc/download`,data); 

//申请类别-差旅提交
export const travelCreate = data => http.upload(`/apply/travel/createOrUpd`,data); 

//申请类别-省市区
export const getArea = () => http.get(`/user/area`); 

//申请管理-差旅
export const travelList= data =>http.get(`apply/travel/list`,data);


//权限管理-创建员工
export const permissionCreateUser= data =>http.post(`permission/createUser`,data);

//权限管理-列表展示
export const permissionUserlist = data => http.get(`user/list`,data); 

//权限管理-审批员权限列表
export const permissionList = data => http.get(`permission/list`,data); 


//权限管理-修改审批员权限
export const permissionCreateOrUpd = data => http.post(`permission/create-or-upd`,data); 