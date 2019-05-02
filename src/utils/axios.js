const qs=require('qs')
const axios=require('axios')
const print = require('./print')


module.exports={
        
    //GET请求，参数可以放到params里（推荐）
    get_Param(url,param){
        // 格式 p={ 'judge':0 }
        return axios.get(url, { params:param })
        .catch(err => {
            print.error(err)
        });
    },
    //GET请求，无参数
    get(url){
        return axios.get(url)
        .catch(err => {
            print.error(err)
        });
    },

    //POST请求，参数可以放到params里（推荐）
    postParam(url,param){
        let data=qs.stringify(param)
        return axios.post(url,data)
        .catch(err => {
            print.error(err)
        });
    },
    //POST请求，无参数
    post(url){
        return axios.post(url)
        .catch(err => {
            print.error(err)
        });
    }
}