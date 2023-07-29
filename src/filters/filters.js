//全局过滤器
export function statusfilter(val){  //审批的状态
    switch(val){
      case 0:
        return '进件';
      case 1:
        return '提交一审';
      case 2:
        return '一审通过';
      case 3:
        return '一审拒绝';
      case 10:
        return '审批完成';
      default:
        return val;
    }
  };


  export function statusStyle(val){  //审批状态的样式
    switch(val){
        case 0:
          return 'success';
        case 1:
          return 'info';
        case 2:
          return 'warning';
        case 3:
          return 'danger';
        case 10:
            return 'danger';
        default:
          return val;
    }
  };

  //申请类别
  export function categoryfilter(val){  //
    switch(val){
      case 1:
        return '办公审批';
      case 2:
        return '差旅审批';
      case 3:
        return '请假审批';
      default:
        return val;
    }
  };

   //申请类别 样式
   export function categoryStyle(val){  //
    switch(val){
      case 1:
        return 'warning';
      case 2:
        return 'danger';
      case 3:
        return 'success';
      default:
        return val;
    }
  };