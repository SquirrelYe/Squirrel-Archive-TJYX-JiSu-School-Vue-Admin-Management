import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        userinfo: localStorage.getItem('userinfo') || '',
        school_id: localStorage.getItem('school_id') || ''
    },
    mutations: {
        LOGIN: (state, data) => {
            state.token = data.token;
            state.userinfo = data.userinfo;
            state.school_id = data.school_id;
        },

        LOGOUT: (state, data) => {
            state.token = '';
            state.userinfo = '';
            state.school_id = '';
            localStorage.clear();
        }
    }
});
export default store;
