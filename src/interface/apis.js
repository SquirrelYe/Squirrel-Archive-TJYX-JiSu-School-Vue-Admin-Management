const req = require('../utils/axios')
module.exports = {

    // 参赛者信息
    user: {
        delete(id) { return req.postParam('api/ent/user', { 'judge': 2, 'id': id }) },
        update(id, c) { return req.postParam('api/ent/user', { 'judge': 3, 'id': id, 'condition': c }) },
        login(n, p) { return req.postParam('api/ent/user', { 'judge': 5, 'name': n, 'pass': p }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/user', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/user', { 'judge': 1, 'id': id }) },
        findOneByOpenid(o) { return req.postParam('api/ass/user', { 'judge': 2, 'openid': o }) },
        findAndCountAllByType(t, o, l) { return req.postParam('api/ass/user', { 'judge': 3, 'type': t, 'offset': o, 'limit': l }) },
        findAndCountAllBySchool(s, o, l) { return req.postParam('api/ass/user', { 'judge': 4, 'school_id': s, 'offset': o, 'limit': l }) },
        findAndCountAllLikeByName(n) { return req.postParam('api/ass/user', { 'judge': 5, 'name': n }) },
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

        findAndCountAll(o, l) { return req.postParam('api/ass/authen', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/authen', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.postParam('api/ass/authen', { 'judge': 2, 'user_id': u }) },
        findAndCountAllBySchool(s, o, l) { return req.postParam('api/ass/authen', { 'judge': 3, 'school_id': s, 'offset': o, 'limit': l }) }
    },
    // 用户详细信息
    info: {
        delete(id) { return req.postParam('api/ent/info', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/info', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/info', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.postParam('api/ass/info', { 'judge': 2, 'user_id': u }) },
    },
    // 地址信息
    location: {
        delete(id) { return req.postParam('api/ent/location', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/location', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/location', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.postParam('api/ass/location', { 'judge': 2, 'user_id': u }) },
    },
    // 开卡信息
    card: {
        delete(id) { return req.postParam('api/ent/card', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/card', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/card', { 'judge': 1, 'id': id }) },
        findOneByUser(u) { return req.postParam('api/ass/card', { 'judge': 2, 'user_id': u }) },
    },
    // 快递信息
    logistic: {
        delete(id) { return req.postParam('api/ent/logistic', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/logistic', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/logistic', { 'judge': 1, 'id': id }) },
        findOneByUser(u, o, l) { return req.postParam('api/ass/logistic', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
    },
    // 快递订单信息
    order: {
        delete(id) { return req.postParam('api/ent/order', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/order', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/order', { 'judge': 1, 'id': id }) },
        findOneByMe(m, o, l) { return req.postParam('api/ass/order', { 'judge': 2, 'me': m, 'offset': o, 'limit': l }) },
        findOneByOther(o, off, l) { return req.postParam('api/ass/order', { 'judge': 2, 'other': o, 'offset': off, 'limit': l }) },
    },
    // 考试一级菜单
    exam: {
        delete(id) { return req.postParam('api/ent/exam', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/exam', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/exam', { 'judge': 1, 'id': id }) },
    },
    // 考试二级菜单
    eitem: {
        delete(id) { return req.postParam('api/ent/eitem', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/eitem', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/eitem', { 'judge': 1, 'id': id }) },
        findOneByExamId(e, o, l) { return req.postParam('api/ass/eitem', { 'judge': 2, 'exam_id': e, 'offset': o, 'limit': l }) },
    },
    // 旅游一级菜单
    journey: {
        delete(id) { return req.postParam('api/ent/journey', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/journey', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/journey', { 'judge': 1, 'id': id }) },
    },
    // 旅游二级菜单
    jitem: {
        delete(id) { return req.postParam('api/ent/jitem', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/jitem', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/jitem', { 'judge': 1, 'id': id }) },
        findByJourneyId(j, o, l) { return req.postParam('api/ass/jitem', { 'judge': 2, 'journey_id': j, 'offset': o, 'limit': l }) },
    },
    // 水果一级菜单
    fruit: {
        delete(id) { return req.postParam('api/ent/fruit', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/fruit', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/fruit', { 'judge': 1, 'id': id }) },
    },
    // 水果二级菜单
    fitem: {
        delete(id) { return req.postParam('api/ent/fitem', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/fitem', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/fitem', { 'judge': 1, 'id': id }) },
        findByFruitId(f, o, l) { return req.postParam('api/ass/fitem', { 'judge': 2, 'fruit_id': f, 'offset': o, 'limit': l }) },
    },
    // 购物车
    cart: {
        delete(id) { return req.postParam('api/ent/cart', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/cart', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/cart', { 'judge': 1, 'id': id }) },
        findByUserId(u, o, l) { return req.postParam('api/ass/cart', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findByExam(e, o, l) { return req.postParam('api/ass/cart', { 'judge': 3, 'eitem_id': e, 'offset': o, 'limit': l }) },
        findByJourney(j, o, l) { return req.postParam('api/ass/cart', { 'judge': 4, 'jitem_id': j, 'offset': o, 'limit': l }) },
        findByFruit(f, o, l) { return req.postParam('api/ass/cart', { 'judge': 5, 'fitem_id': f, 'offset': o, 'limit': l }) },
    },
    // 总订单交易
    tran: {
        delete(id) { return req.postParam('api/ent/tran', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/tran', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/tran', { 'judge': 1, 'id': id }) },
        findByUserId(u, o, l) { return req.postParam('api/ass/tran', { 'judge': 2, 'user_id': u, 'offset': o, 'limit': l }) },
        findByExam(e, o, l) { return req.postParam('api/ass/tran', { 'judge': 3, 'eitem_id': e, 'offset': o, 'limit': l }) },
        findByJourney(j, o, l) { return req.postParam('api/ass/tran', { 'judge': 4, 'jitem_id': j, 'offset': o, 'limit': l }) },
        findByFruit(f, o, l) { return req.postParam('api/ass/tran', { 'judge': 5, 'fitem_id': f, 'offset': o, 'limit': l }) },
    },
    // 资金信息
    stock: {
        delete(id) { return req.postParam('api/ent/stock', { 'judge': 2, 'id': id }) },

        findAndCountAll(o, l) { return req.postParam('api/ass/stock', { 'judge': 0, 'offset': o, 'limit': l }) },
        findOneById(id) { return req.postParam('api/ass/stock', { 'judge': 1, 'id': id }) },
        findByUserId(u) { return req.postParam('api/ass/stock', { 'judge': 2, 'user_id': u }) },
    }
}