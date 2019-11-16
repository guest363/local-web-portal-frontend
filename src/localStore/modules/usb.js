const state = {
    mountUSB: [{ '_id': 'e1' }],
    alertUSB: [{ '_id': 'e2' }],
    whiteListUSB: [{ '_id': 'e3' }],
    alertPageCount: 0,
    mountCounter: 0,
    whiteCounter: 0
};

const getters = {
    GET_LIST_MOUNT(state) {
        return state.mountUSB;
    },
    GET_LIST_ALERT(state) {
        return state.alertUSB;
    },
    GET_LIST_WHITE(state) {
        return state.whiteListUSB;
    },
    GET_PAGE_ALERT(state) {
        return state.alertPageCount;
    },
    GET_COUNTER_MOUNT(state) {
        return state.mountCounter;
    },
    GET_COUNTER_WHITE(state) {
        return state.whiteCounter;
    }
};

const mutations = {
    SOCKET_mountUSB(state, data) {
        state.mountCounter = data.pages;
        state.mountUSB = data.chunk;
    },
    SOCKET_alertUSB(state, data) {
        state.alertPageCount = data.pages;
        state.alertUSB = data.chunk;
    },
    SOCKET_whiteListUSB(state, data) {
        state.whiteListUSB = data.chunk;
        state.whiteCounter = data.pages;
    },
    SOCKET_injectUSB(state, data) {
        state.mountUSB.find((elem, index) => {
            if (elem.USBnameSave === data.USBnameSave) {
                state.mountUSB.splice(index, 1);
            }
        })
    },
    SOCKET_mountingUSB(state, data) {
        state.mountUSB.push(data);
    }
};

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
    },

};

export default {
    state,
    getters,
    mutations,
    actions
}