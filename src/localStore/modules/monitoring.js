import backend from '../../backend/api/monitoring';

const state = {
    monitoringAllHosts: '',
};

const getters = {
    GET_HOSTS(state) {
        return state.monitoringAllHosts;
    },

};

const mutations = {
    SAVE_HOSTS(state, hosts) {
        state.monitoringAllHosts = hosts;
    },
};

const actions = {
    GET_HOSTS: async (context) => {
        const unsortHosts = await backend.getHosts();
        const sortedHosts = unsortHosts.data.sort((i1, i2) => {
            return i1.name > i2.name ? 1 : -1;
        });
        context.commit('SAVE_HOSTS', sortedHosts);
    },
    ADD_HOST: async (context, newHost) => {
        const result = await backend.addHost(newHost);
        return result;
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}