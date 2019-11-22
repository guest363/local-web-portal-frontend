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
    SOCKET_INJECTING_USB(state, data) {
        const makeQuerry = table => {
            return {
                action: 'get',
                table: table
            }
        };
        this._vm.$socket.emit("usb", makeQuerry('mountUSB'));
    },
    SOCKET_MOUNTING_USB(state, data) {
        const makeQuerry = table => {
            return {
                action: 'get',
                table: table
            }
        };
        this._vm.$socket.emit("usb", makeQuerry('mountUSB'));
    }
};
export default mutations;