import { context, url } from '../context';
/**
* @description Запросить все теги
* @returns {Arary} массив тегов
*
*/
export default async () => {
    const config = {
        method: 'GET',
        url: `${url}/tag`,
        headers: context.headersNoAuth,
    }
    return await context.tryCatchFunctionAxios(config);
}
