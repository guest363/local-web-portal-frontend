import backend from '../../backend/api/aurh';

const state = {
    userToCreate: false,
    token: '',
    displayName: '',
    authActionResult: ''
};

const getters = {
    GET_DISPLAY_NAME(state) {
        return state.displayName;
    },
    GET_TOKEN(state) {
        return storage ? storage : state.token;
    },
    GET_AUTH_RESULT(state) {
        return state.authActionResult;
    },
};

const mutations = {
    INIT_USER_FROM_LOCAL_STORAGE(state) {
        state.displayName = localStorage.getItem('displayName');
        state.token = localStorage.getItem('token');
    },
    async CREATE_USER(state, msg) {
        state.userToCreate = msg;
        const result = await backend.createUser(msg);
        state.authActionResult = result.data;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_DISPLAY_NAME(state, name) {
        state.displayName = name;
    },
    SET_AUTH_RESULT(state, result) {
        state.authActionResult = result;
    },

};

const actions = {
    async LOGIN({ dispatch }, user) {
        const result = await backend.login(user);
        const authResult = result.data.name ? `Вы вошли под именем ${result.data.name}` : result.data;
        dispatch('AUTH_ACTION',
            {
                userJWT: result.data.userJWT,
                userName: result.data.name,
                authResult: authResult
            });
    },
    AUTH_ACTION({ dispatch, commit, getters }, { userJWT = '', userName = '', authResult }) {
        commit('SET_TOKEN', userJWT)
        commit('SET_DISPLAY_NAME', userName)
        commit('SET_AUTH_RESULT', authResult);
        commit('SET_ALERT_MSG', { header: 'Результат', text: getters.GET_AUTH_RESULT }, { root: true });
        commit('SHOW_ALERT', null, { root: true });
        localStorage.setItem('token', userJWT);
        localStorage.setItem('displayName', userName);
    },
    LOGOUT({ dispatch }) {
        dispatch('AUTH_ACTION', { authResult: "Вы разлонинены" });
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}