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
export default getters;