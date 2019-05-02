const req=require('../axios')
module.exports={
    // 赛事信息
    getAllGame(){ return req.post_Param('api/ass/game',{'judge':0}) },
    getOneGameById(id){ return req.post_Param('api/ass/game',{'judge':1,'game_id':id}) },
    getGameByCondition(condition){ return req.post_Param('api/ass/game',{'judge':2,'condition':condition}) },
    delOneGameById(id){ return req.post_Param('/api/ent/game',{'judge':2,'id':id}) },
    updateOneGameById(id,condition){ return req.post_Param('/api/ent/game',{'judge':3,'id':id, 'condition':condition}) },
    updateOneGameDayById(id,day){ return req.post_Param('/api/ent/game',{'judge':3,'id':id, 'day_id':day}) },
    getAllThing(){ return req.post_Param('api/ent/module',{'judge':0}) },
    // 参赛者信息
    getAllUserByType(type){ return req.post_Param('/api/ass/user',{'judge':2,'type':type}) },
    getOneUserById(id){ return req.post_Param('/api/ass/user',{'judge':3,'user_id':id}) },
    delOneUserById(id){ return req.post_Param('/api/ent/user',{'judge':3,'id':id}) },
    // 团队信息
    getAllTeam(){ return req.post_Param('/api/ass/team',{'judge':2}) },
    getAllTeamByGameId(game_id){ return req.post_Param('/api/ass/team',{'judge':4,'game_id':game_id}) },
    getOneTeamById(id){ return req.post_Param('/api/ass/team',{'judge':3,'team_id':id}) },
    delOneTeamById(id){ return req.post_Param('/api/ent/team',{'judge':2,'id':id}) },
    // 交易信息
    getAllTransaction(){ return req.post_Param('api/ass/transaction',{'judge':0}) },
    getAllTransationByTeamId(id){ return req.post_Param('api/ass/transaction',{'judge':4, 'team_id':id}) },
    // 团队资产信息    
    getAllStatisticByGameId(id){ return req.post_Param('api/ass/statistic',{'judge':2, 'game_id':id}) },
    creatOneStatistic(gameid,teamid,money,load){ return req.post_Param('api/ent/statistic',{'judge':1, 'game_id':gameid, 'team_id':teamid, 'money':money,'load':load, 'food':0,'water':0 ,'compass':0,'tent':0,'secret':0,'gold':0})} ,
    deleteAllByStatisticGameId(gameid){ return req.post_Param('api/ent/statistic',{'judge':4, 'game_id':gameid}) },
}