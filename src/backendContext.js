import axios from 'axios';
import { url } from './constants';

/**
 * @description Добавляет глобальный метод backend экземпляру Vue.
 * В этой метоже заключены все функции по работе с бекендом
 * @returns {object} функции по работе с бекендом :
 * --- Работа с хостами ----
 * 1 monitoring.addHost(host) - добавить хост для мониторинга
 * 2 monitoring.getHost() - получить все хосты
 * 
 * ---- Работа wiki ---
 * 1 wiki.post() -- 
 * 2 wiki.postTag() --
 * 3 wiki.get() --
 * 4 wiki.getLast() --
 * 5 wiki.getTags() --
 * 6 wiki.count() -- подсчет статей с таким тегом
 * 7 wiki.search()
 */

export default {
    /* token: store.getters.getToken, */
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    headersNoAuth: {
        'Content-Type': 'application/json'
    },
    tryCatchFunctionAxios: config => {
        try {
            return axios(config);
        } catch (error) {
            throw new Error(error.response.data.error_description || error);
        }
    },
    url
};