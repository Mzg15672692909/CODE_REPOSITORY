export function initRoutes(data,sub){
    data.forEach(item=>{
      //生成路由格式的数据
      const routesObj = {
        path: item.url,
        name: item.name,
        meta:{title:item.title},
        component: () => import(`../views/Home/${item.component}/index.vue`)
      };
      //判断是否是数组
      if(sub instanceof Array){
        sub.push(routesObj);
      }else {
        if(!sub.children){
          sub.children = [];
        };
        sub.children.push(routesObj)
      };
      //判断有没有children
      if(item.children){
        initRoutes(item.children,routesObj);
      }
    });
  }