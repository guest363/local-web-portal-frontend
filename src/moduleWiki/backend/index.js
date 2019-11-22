import get from './api/get';
import post from './api/post';
import postTag from './api/postTag';
import getLast from './api/getLast';
import getTags from './api/getTags';
import count from './api/count';
import search from './api/search';
import deleteTag from './api/deleteTag';
import deleteArticle from './api/delete';

const api = {
    post,
    postTag,
    get,
    getLast,
    getTags,
    count,
    search,
    deleteArticle,
    deleteTag,
};

export default api