import { context, url } from '../context';
/**
    * @description Получить статус всех хостов
    * @returns {object} ответ от сервера
    *
*/
export default async host => {
    const config = {
        method: 'DELETE',
        withCredentials: true,
        data: host,
        url: `${url}/hosts`,
        headers: context.headers
    }
    return await context.tryCatchFunctionAxios(config);
}
