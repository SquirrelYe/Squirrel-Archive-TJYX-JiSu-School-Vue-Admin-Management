const req = require('../utils/axios')
module.exports = {

    // 参赛者信息
    user: {
        delete(id) { return req.postParam('api/ent/user', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.postParam('api/ent/user', { 'judge': 3, 'id': id, 'condition': c }) },
        login(n, p) { return req.postParam('api/ent/user', { 'judge': 5, 'name': n, 'pass': p }) },

        getAllUser() { return req.postParam('api/ass/user', { 'judge': 0 }) },
    },
    // 学校信息
    school: {
        creat(n, d, p) { return req.postParam('api/ent/school', { 'judge': 1, 'name': n, 'detail': d, 'province': p }) },
        delete(id) { return req.postParam('api/ent/school', { 'judge': 2, 'id': id }) },
        update(id, n, d, p) { return req.postParam('api/ent/school', { 'judge': 3, 'id': id, 'name': n, 'detail': d, 'province': p }) },

    },
    // 认证信息
    authen: {
        delete(id) { return req.postParam('api/ent/authen', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.postParam('api/ent/authen', { 'judge': 3, 'id': id, 'condition': c }) },
        
    },
    // 用户详细信息
    info: {
        delete(id) { return req.postParam('api/ent/info', { 'judge': 2, 'id': id }) },

    },
    // 地址信息
    location: {
        delete(id) { return req.postParam('api/ent/location', { 'judge': 2, 'id': id }) },
        
    },
    // 开卡信息
    card: {
        delete(id) { return req.postParam('api/ent/card', { 'judge': 2, 'id': id }) },
        
    },
    // 快递信息
    logistic: {
        delete(id) { return req.postParam('api/ent/logistic', { 'judge': 2, 'id': id }) },
        
    },
    // 快递订单信息
    order: {
        delete(id) { return req.postParam('api/ent/order', { 'judge': 2, 'id': id }) },
        
    },
    // 考试一级菜单
    exam: {
        delete(id) { return req.postParam('api/ent/exam', { 'judge': 2, 'id': id }) },
        
    },
    // 考试二级菜单
    eitem: {
        delete(id) { return req.postParam('api/ent/eitem', { 'judge': 2, 'id': id }) },
        
    },
    // 旅游一级菜单
    journey: {
        delete(id) { return req.postParam('api/ent/journey', { 'judge': 2, 'id': id }) },
        
    },
    // 旅游二级菜单
    jitem: {
        delete(id) { return req.postParam('api/ent/jitem', { 'judge': 2, 'id': id }) },
        
    },
    // 水果一级菜单
    fruit: {
        delete(id) { return req.postParam('api/ent/fruit', { 'judge': 2, 'id': id }) },
        
    },
    // 水果二级菜单
    fitem: {
        delete(id) { return req.postParam('api/ent/fitem', { 'judge': 2, 'id': id }) },
        
    },
    // 购物车
    cart: {
        delete(id) { return req.postParam('api/ent/cart', { 'judge': 2, 'id': id }) },
        
    },
    // 总订单交易
    tran: {
        delete(id) { return req.postParam('api/ent/tran', { 'judge': 2, 'id': id }) },
        
    },
    // 资金信息
    stock: {
        delete(id) { return req.postParam('api/ent/stock', { 'judge': 2, 'id': id }) },
        
    }
}