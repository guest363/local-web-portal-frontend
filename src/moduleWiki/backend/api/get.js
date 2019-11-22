import { context, url } from '../context';
/**
    * @description Запросить конкретную вики статью
    * @param {String} params имя вики, параметр wiki.header
    * @returns {object} вики статья
    *
    */

export default async params => {
    const config = {
        method: 'GET',
        url: `${url}/article/${params}`,
        headers: context.headersNoAuth,
    }
    return await context.tryCatchFunctionAxios(config);
}
