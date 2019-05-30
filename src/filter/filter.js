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
    if(x==0) return '未接单';
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
function formatLsendCondition(x){
    if(x==0) return '未接单';
    if(x==1) return '已接单';
    if(x==2) return '已取件';
    if(x==3) return '已送达';
    if(x==4) return '已发送';
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
function formatAuthenCondition(x){
    if(x==-1) return '未通过';
    if(x==0) return '审核中';
    if(x==1) return '审核通过';
}
function formatTixianCondition(x){
    if(x==-1) return '拒绝提现';
    if(x==0) return '未处理';
    if(x==1) return '允许提现';
}
function formatSchool(x){
    if(x==1) return '南开大学';
    if(x==2) return '天津大学';
    if(x==3) return '中国民航大学';
    if(x==4) return '天津城建大学';
    if(x==5) return '天津职业技术师范大学';
    if(x==6) return '天津工业大学';
    if(x==7) return '天津科技大学';
    if(x==8) return '天津理工大学';
    if(x==9) return '天津医药大学';
    if(x==10) return '天津中医药大学';
    if(x==11) return '天津师范大学';
    if(x==12) return '天津财经大学';
    if(x==13) return '天津商业大学';
    if(x==14) return '天津宝德学院';
    if(x==15) return '天津农学院';
    if(x==16) return '天津外国语大学';
    if(x==17) return '天津体育学院';
    if(x==18) return '天津音乐学院';
    if(x==19) return '天津美术学院';
}
module.exports={
    formatTime,
    formatCondition,
    formatGender,
    formatCardCondition,
    formatLogisticCondition,
    formatLsendCondition,
    formatExamCondition,
    formatExamItemCondition,
    formatTranCondition,
    formatTranJudge,
    formatAuthenCondition,
    formatTixianCondition,
    formatSchool,
}