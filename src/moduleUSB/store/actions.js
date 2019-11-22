
const actions = {
    GET_CHUNK_ALERT(context, { chunk, filter }) {
        const query = {
            chunk: chunk,
            filter: filter,
            action: 'get',
            table: 'alertUSB'
        };
        this._vm.$socket.emit("usb", query);
    },
    /**
    * 
    * @param {*} context link store
    * @param {*} chunk 
    * @param {String} chunk[0] номер страницы запроса
    * @param {String} chunk[1] примененный фильтр
    */
    UPDATE_ALL_LIST(context, { chunk, filter }) {
        const makeQuerry = table => {
            return {
                chunk: chunk,
                filter: filter,
                action: 'get',
                table: table
            }
        }
        this._vm.$socket.emit("usb", makeQuerry('alertUSB'));
        this._vm.$socket.emit("usb", makeQuerry('mountUSB'));
        this._vm.$socket.emit("usb", makeQuerry('whiteListUSB'));
    },
    ADD_TO_WHITE(context, usb) {
        this._vm.$socket.emit("usb", {
            action: "addToWhite",
            msg: usb,
            token: localStorage.getItem('token')
        });
    },
    EDIT_USB(context, usb) {
        this._vm.$socket.emit("usb", {
            action: "update",
            table: 'all',
            msg: usb,
            token: localStorage.getItem('token')
        });
    },
    /**
     * 
     * @param {*} context link store
     * @param {Object} param 
     * @param {String} param.msg ID записи для удаления
     * @param {String} param.table Таблица из которой удалить
     */
    DEL_USB(context, param) {
        this._vm.$socket.emit("usb", {
            action: "del",
            table: param.table,
            msg: param.msg,
            token: localStorage.getItem('token')
        });
    }
};
export default actions;