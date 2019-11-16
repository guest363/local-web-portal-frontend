const state = {
    alertShow: false,
    alertHeader: 'Внимание',
    alertText: '',
    errorSocket: ''
};


const getters = {
    GET_ALERT_HEADER(state) {
        return state.alertHeader;
    },
    GET_ALERT_TEXT(state) {
        return state.alertText;
    },
    GET_ALERT_SHOW(state) {
        return state.alertShow;
    }
};

const mutations = {
    SET_ALERT_MSG(state, msg) {
        state.alertHeader = msg.header;
        state.alertText = msg.text;
    },
    SHOW_ALERT(state) {
        state.alertShow = true;
        setTimeout(() => state.alertShow = false, 2000);
    },
    HIDE_ALERT(state) {
        state.alertShow = false;
    },
    SOCKET_ERROR(state, error) {
        state.alertHeader = 'Ошибка сервера';
        state.alertText = error;
        state.alertShow = true;
        setTimeout(() => state.alertShow = false, 2000);
    },
    SOCKET_RESULT(state, result) {
        state.alertHeader = 'Результат операции';
        state.alertText = result;
        state.alertShow = true;
        setTimeout(() => state.alertShow = false, 2000);
    },
};


export default {
    state,
    getters,
    mutations
}
