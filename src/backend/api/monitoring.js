import context from '../context';
const api = {
    /**
         * @description Добавить хост для мониторинга
         * @param {object} host
         * @param {String} host.ip
         * @param {String} host.name
         * @param {String} host.hostType
         * @returns {object} ответ от сервера
         *
    */
    async addHost(host) {
        const config = {
            method: 'POST',
            data: host,
            withCredentials: true,
            url: `${context.url}/ping`,
            headers: context.headers
        }
        return await context.tryCatchFunctionAxios(config);
    },

    /**
         * @description Получить статус всех хостов
         * @returns {object} ответ от сервера
         *
    */
    async getHosts() {
        const config = {
            method: 'GET',
            url: `${context.url}/ping`,
            headers: context.headersNoAuth
        }
        return await context.tryCatchFunctionAxios(config);
    },
}
export default api;