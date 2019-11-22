import { context, url } from '../context';

/**
 * @description Поиск статьи вики
 * @param {object} params
 * @param {String} params.tag
 * @param {String} params.content
 * @returns {Array} || String результат поиска
 *
 */
export default async params => {
    const config = {
        method: 'GET',
        url: `${url}/article-searche`,
        params: params,
        headers: context.headersNoAuth,
    }
    return await context.tryCatchFunctionAxios(config);
}
