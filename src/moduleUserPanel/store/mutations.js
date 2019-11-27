const mutations = {
    ADD_PERSON(state, data) {
        state.allPersons = data;
    },
    PUSH_PERSON(state, data) {
        state.allPersons.push(data)
    }
};
export default mutations;