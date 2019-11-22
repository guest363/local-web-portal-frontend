const mutations = {
    SOCKET_RETURN_NEWS(state, news) {
        const stringTag = news.tag.join(',');
        const dateString = news.date.slice(0, 10).replace(/-/g, '.');
        news.tag = stringTag;
        news.date = dateString.split('').reverse().join('');
        state.newsEdit = news;
    },
    SOCKET_POST_NEWS_RESULT(state, result) {
        state.newsPostResult = result;
    },
    SOCKET_RETURN_ALL_NEWS(state, news) {
        if (news.length === state.newsAll.lenght) return;
        state.newsAll = [];
        news.forEach(item => {
            const stringTag = item.tag.join(',');
            const dateString = item.date.slice(0, 10).replace(/-/g, '.');
            item.tag = stringTag;
            item.date = dateString.split('').reverse().join('');
            state.newsAll.push(item)
        });
    },
    ADD_NEWS(state, news) {
        state.newsAll.push(news);
    },
    RESET_POST_RESULT(state) {
        state.newsPostResult = '';
    }
};
export default mutations;