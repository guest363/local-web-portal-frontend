import { context, url } from '../context';
/**
* @description Удалить статью
* @param {String} id id статьи
* @returns {object} http коды
*/

export default async id => {
    const config = {
        method: 'DELETE',
        url: `${url}/article/${id}`,
        headers: context.headers,
    }
    return await context.tryCatchFunctionAxios(config);
}
