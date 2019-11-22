const getters = {
    GET_ALL_NEWS(state) {
        return state.newsAll;
    },
    GET_NEWS_TAGS(state) {
        return state.newsTags;
    },
    GET_EDIT_NEWS(state) {
        return state.newsEdit;
    },
    GET_POST_RESULT_NEWS(state) {
        return state.newsPostResult;
    }
};
export default getters;