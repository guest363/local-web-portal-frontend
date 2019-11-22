import { context, url } from '../context';
/**
* @description Запросить последнюю вики статью
* @returns {object} вики статья
*
*/
export default async () => {
    const config = {
        method: 'GET',
        url: `${url}/article-last`,
        headers: context.headersNoAuth,
    }
    return await context.tryCatchFunctionAxios(config);
}
