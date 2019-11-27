import context from '../../../../backendContext';
const url = `${context.url}/api/auth`;
/**
         * @description  Аутентифицироваться
         * @param {object} user
         * @param {String} user.login
         * @param {String} user.password
         * @returns {object} ответ от сервера
         *
    */
export default async user => {
    const config = {
        method: 'POST',
        data: user,
        withCredentials: true,
        url: `${url}/login`,
        headers: context.headersNoAuth
    }
    return await context.tryCatchFunctionAxios(config);
}
