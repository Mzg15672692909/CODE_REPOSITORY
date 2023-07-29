//对象深拷贝
export function deep(dest,obj){
    var o = dest;
    for(var key in obj){
        if(typeof obj[key]==='object'){
            o[key] = (obj[key].constructor===Array)?[]:{};
            deep(o[key],obj[key]);
        }else {
            o[key] = obj[key]
        }
    };
    return o;
};