import context from '../context';
const url = `${context.url}/api/auth`;
const api = {
    /**
         * @description Добавить хост для мониторинга
         * @param {object} user
         * @param {String} user.login
         * @param {String} user.password
         * @returns {object} ответ от сервера
         *
    */
    async login(user) {
        const config = {
            method: 'POST',
            data: user,
            withCredentials: true,
            url: `${url}/login`,
            headers: context.headersNoAuth
        }
        return await context.tryCatchFunctionAxios(config);
    },

    /**
         * @description Получить статус всех хостов
         * @returns {object} ответ от сервера
         *
    */
    async createUser(user) {
        const config = {
            method: 'POST',
            data: user,
            withCredentials: true,
            url: `${url}/user`,
            headers: context.headersNoAuth
        }
        return await context.tryCatchFunctionAxios(config);
    },
}
export default api;