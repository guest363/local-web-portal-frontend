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
    }
};
export default actions;