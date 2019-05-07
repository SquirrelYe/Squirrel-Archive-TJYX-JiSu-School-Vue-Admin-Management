// 利用对象展开运算符，解构
function formatTime(x){
    if(!x) return ''; 
    else return moment(x).format('YYYY-MM-DD HH:mm:ss')
}
function formatCondition(x){
    if(x==0) return '正常';
    if(x==-1) return '冻结';
}
function formatGender(x){
    if(x==0) return '未知';
    if(x==1) return '男';
    if(x==2) return '女';
}
function formatCardCondition(x){
    if(x==0) return '未处理';
    if(x==1) return '处理中';
    if(x==2) return '已完成';
    if(x==-1) return '已撤销';
}
function formatLogisticCondition(x){
    if(x==0) return '未接单';
    if(x==1) return '已接单';
    if(x==2) return '已取件';
    if(x==3) return '已送达';
    if(x==4) return '已评价';
    if(x==-1) return '订单取消';
}
function formatExamCondition(x){
    if(x==-1) return '关闭';
    if(x==0) return '启用';
}
function formatExamItemCondition(x){
    if(x==-1) return '暂停销售';
    if(x==0) return '正常';
}
function formatTranCondition(x){
    if(x==-1) return '取消';
    if(x==0) return '加入购物车';
    if(x==1) return '已付款';
}
function formatTranJudge(x){
    if(x==-1) return '订单取消';
    if(x==0) return '未发货';
    if(x==1) return '已发货';
    if(x==2) return '已完成';
    if(x==3) return '已评价';
}
module.exports={
    formatTime,
    formatCondition,
    formatGender,
    formatCardCondition,
    formatLogisticCondition,
    formatExamCondition,
    formatExamItemCondition,
    formatTranCondition,
    formatTranJudge,
}