import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || 'null',
        user: localStorage.getItem('user') || '',
        school_id: localStorage.getItem('school_id') || ''
    },
    mutations: {
        LOGIN: (state, data) => {
            state.token = data.token;
            state.user = data.user;
            state.school_id = data.school_id;
        }
    }
});
export default store;
