const mutations = {
    SAVE_HOSTS(state, hosts) {
        state.monitoringAllHosts = hosts;
    },
};
export default mutations;