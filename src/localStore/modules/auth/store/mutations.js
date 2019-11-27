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
export default mutations;