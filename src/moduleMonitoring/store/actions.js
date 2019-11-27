import backend from '../backend/index';

const actions = {
    GET_HOSTS: async (context) => {
        const unsortHosts = await backend.get();
        const sortedHosts = unsortHosts.data.sort((i1, i2) => {
            return i1.name > i2.name ? 1 : -1;
        });
        context.commit('SAVE_HOSTS', sortedHosts);
    },
    ADD_HOST: async (context, newHost) => {
        const result = await backend.post(newHost);
        return result;
    },
    DELETE_HOST: async (context, newHost) => {
        const result = await backend.deleteHost(newHost);
        return result;
    },
};
export default actions;