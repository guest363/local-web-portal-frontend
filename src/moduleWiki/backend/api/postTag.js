import { context, url } from '../context';
/**
* @description Добавить новый тег
* @param {String} tag 
* @returns {object} http коды
*
*/
export default async tag => {
    const config = {
        method: 'POST',
        url: `${url}/tag`,
        data: tag,
        headers: context.headers,
    }
    return await context.tryCatchFunctionAxios(config);
}