import { context, url } from '../context';
/**
     * @description Добавить хост для мониторинга
     * @param {object} host
     * @param {String} host.ip
     * @param {String} host.name
     * @param {String} host.hostType
     * @returns {object} ответ от сервера
     *
*/
export default async host => {
    const config = {
        method: 'POST',
        data: host,
        withCredentials: true,
        url: `${url}/hosts`,
        headers: context.headers
    }
    return await context.tryCatchFunctionAxios(config);
}
