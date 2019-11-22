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
export default getters;