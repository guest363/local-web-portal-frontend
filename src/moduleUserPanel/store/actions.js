import backend from '../backend/index';

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
        const result = await backend.deletePerson(person);
        context.dispatch('INIT_PERSON_FROM_SERVER')
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result.data }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
};
export default actions;