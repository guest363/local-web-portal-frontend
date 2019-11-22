import { context, url } from '../context';
/**
* @description Удалить тег
* @param {String} tag
* @returns {object} http коды
*/

export default async tag => {
    const config = {
        method: 'DELETE',
        url: `${url}/tag/${tag}`,
        headers: context.headers,
    }
    return await context.tryCatchFunctionAxios(config);
}
