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
export default mutations;