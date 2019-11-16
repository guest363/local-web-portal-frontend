import backend from '../../backend/api/wiki';
import { Promise } from 'q';
import dateOpt from "../support/dateOpt";

const state = {
    wikiSearchResult: [],
    reqWiki: '',
    reqTags: []
};

const getters = {
    GET_SEARCHE_RESULT(state) {
        return state.wikiSearchResult;
    },
    GET_WIKI(state) {
        return state.reqWiki;
    },
    GET_TAGS(state) {
        return state.reqTags;
    }
};

const mutations = {
    SAVE_SEARCHE_RESULT(state, data) {
        state.wikiSearchResult = data;
    },
    SAVE_REQ_WIKI(state, data) {
        state.reqWiki = data;
    },
    SAVE_TAGS(state, data) {
        state.reqTags = data;
    },
};

const actions = {
    GET_WIKI: (context, url) => {
        return new Promise(async (res, rej) => {
            const wiki = (await backend.get(url)).data;
            /*  wiki.date = new Date(wiki.date).toLocaleString("ru", dateOpt); */
            /*             console.log(wiki.tag[0].split(','))
                        wiki.tag = wiki.tag[0].split(','); */
            context.commit('SAVE_REQ_WIKI', wiki);
            res();
        })
    },
    GET_TAGS: async (context) => {
        const tags = (await backend.getTags()).data.map(item => item.tag);
        context.commit('SAVE_TAGS', tags);
    },
    POST_TAGS: async (context, tag) => {
        const result = await backend.postTag(tag);
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result.data }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
    DELETE_TAGS: async (context, tag) => {
        const result = await backend.postTag(tag);
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result.data }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
    GET_TAG_COUNT: async (context, tagsArray) => {
        const count = (await backend.count(tagsArray)).data;
        return count;
    },
    SEARCHE_WIKI: async (context, query) => {
        const wiki = (await backend.search(query)).data;

        if (typeof wiki === "string") {
            alert(wiki);
            return;
        } else if (wiki[0] === void 0) {
            alert("Данные отсутсвтуют");
            return;
        } else {
            context.commit('SAVE_SEARCHE_RESULT', wiki);
        }
    },
    async ADD_WIKI(context, newWiki) {
        const result = await backend.post(newWiki);
        console.log(result)
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result.data }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
    async DELETE_WIKI(context, id) {
        const result = (await backend.delete(id)).data;
        context.commit('SET_ALERT_MSG', { header: 'Результат', text: result }, { root: true });
        context.commit('SHOW_ALERT', { root: true })
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}