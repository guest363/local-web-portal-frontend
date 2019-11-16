import dateOpt from '../support/dateOpt';
const state = {
    newsAll: [],
    newsTags: [
        "День рождения",
        "Праздник",
        "Поздравление",
        "Напоминание",
        "Событие",
        "Задача",
        "Отчет"
    ],
    newsEdit: '',
    newsPostResult: ''
};

const getters = {
    GET_ALL_NEWS(state) {
        return state.newsAll;
    },
    GET_NEWS_TAGS(state) {
        return state.newsTags;
    },
    GET_EDIT_NEWS(state) {
        return state.newsEdit;
    },
    GET_POST_RESULT_NEWS(state) {
        return state.newsPostResult;
    },

};

const mutations = {
    SOCKET_RETURN_NEWS(state, news) {
        const stringTag = news.tag.join(',');
        const dateString = news.date.slice(0, 10).replace(/-/g, '.');
        news.tag = stringTag;
        news.date = dateString.split('').reverse().join('');
        state.newsEdit = news;
    },
    SOCKET_POST_NEWS_RESULT(state, result) {
        state.newsPostResult = result;
    },
    SOCKET_RETURN_ALL_NEWS(state, news) {
        if (news.length === state.newsAll.lenght) return;
        news.forEach(item => {
            const stringTag = item.tag.join(',');
            const dateString = item.date.slice(0, 10).replace(/-/g, '.');
            item.tag = stringTag;
            item.date = dateString.split('').reverse().join('');
            state.newsAll.push(item)
        });
    },
    ADD_NEWS(state, news) {
        state.newsAll.push(news);
    },
    RESET_POST_RESULT(state) {
        state.newsPostResult = '';
    },

};

const actions = {
    DEL_NEWS(context, news) {
        this._vm.$socket.emit("news", {
            action: "delete",
            msg: news,
            token: localStorage.getItem('token')
        });
    },
    GET_NEWS(context, id) {
        this._vm.$socket.emit("news", {
            action: "get",
            msg: id
        });
    },
    GET_ALL_NEWS(context) {
        this._vm.$socket.emit("news", {
            action: "getAll"
        });
    },
    ADD_NEWS(context, news) {
        this._vm.$socket.emit("news", {
            action: "post",
            msg: news,
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