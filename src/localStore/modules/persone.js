import backend from '../../backend/api/person';
const state = {
    allPersons: []
};

const getters = {
    GET_PERSONS(state) {
        return state.allPersons;
    },
};

const mutations = {
    ADD_PERSON(state, data) {
        state.allPersons = data;
    },
    PUSH_PERSON(state, data) {
        state.allPersons.push(data)
    }
};

const actions = {
    async INIT_PERSON_FROM_SERVER(context) {
        const result = await backend.get('all');
        context.commit('ADD_PERSON', result.data);
    },
    async ADD_PERSON(context, person) {
        const result = await backend.post(person);
        if (result.data === `Пользователь добавлен`)
            return context.commit('PUSH_PERSON', person);
        context.dispatch('INIT_PERSON_FROM_SERVER')
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result.data }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
    async DELETE_PERSON(context, person) {
        const result = await backend.delete(person);
        context.dispatch('INIT_PERSON_FROM_SERVER')
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result.data }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}