import context from '../context';
const url = `${context.url}/api/monitoring`;
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
    async POST(host) {
        const config = {
            method: 'POST',
            data: host,
            withCredentials: true,
            url: `${url}/hosts`,
            headers: context.headers
        }
        return await context.tryCatchFunctionAxios(config);
    },

    /**
         * @description Получить статус всех хостов
         * @returns {object} ответ от сервера
         *
    */
    async GET() {
        const config = {
            method: 'GET',
            url: `${url}/hosts`,
            headers: context.headersNoAuth
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
        * @description Получить статус всех хостов
        * @returns {object} ответ от сервера
        *
   */
    async DELETE(host) {
        const config = {
            method: 'DELETE',
            withCredentials: true,
            data: host,
            url: `${url}/hosts`,
            headers: context.headers
        }
        return await context.tryCatchFunctionAxios(config);
    },
}
export default api;