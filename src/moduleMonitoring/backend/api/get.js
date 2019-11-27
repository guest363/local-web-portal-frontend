import { context, url } from '../context';
/**
        * @description Получить статус всех хостов
        * @returns {object} ответ от сервера
        *
   */
export default async () => {
    const config = {
        method: 'GET',
        url: `${url}/hosts`,
        headers: context.headersNoAuth
    }
    return await context.tryCatchFunctionAxios(config);
}
