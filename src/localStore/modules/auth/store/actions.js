import backend from '../api/index';

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
};
export default actions;