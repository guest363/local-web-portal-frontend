const state = {
    shootHistory: ''
};

const getters = {
    GET_SHOOT_ON_LESSON(state) {
        return lesson => {
            switch (lesson) {
                case "1":
                    return 3;
                case "2":
                    return 3;
                case "3":
                    return 10;
            }
        }
    },
    GET_HISTORY(state) {
        return state.shootHistory;
    },

};

const mutations = {
    SOCKET_shootsHistory(state, data) {
        state.shootHistory = data;
    },

};

const actions = {
    /**
     * 
     * @param {*} context 
     * @param {*} query 
     * @param {STRING} query.fio
     * @param {DATA} query.startDate
     * @param {DATA} query.endDate
     */
    GET_SHOOT_HISTORY(context, query) {
        this._vm.$socket.emit("shoot", {
            action: "get",
            msg: query,
        });
    },
    SET_RESULT(context, shooter) {
        this._vm.$socket.emit("shoot", {
            action: "set",
            msg: shooter,
            token: localStorage.getItem('token')
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}