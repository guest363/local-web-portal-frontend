const actions = {
    DEL_NEWS(context, news) {
        this._vm.$socket.emit("news", {
            action: "delete",
            msg: news['_id'],
            token: localStorage.getItem('token')
        });
        context.dispatch('GET_ALL_NEWS');
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
        context.dispatch('GET_ALL_NEWS');
    }
};
export default actions;