import { context, url } from '../context';
/**
* @description Посчитать колличество статей с такими тегами
* @returns {object} число таких статей
*
*/

export default async tags => {
    const config = {
        method: 'GET',
        url: `${url}/countByTag`,
        params: tags,
        headers: context.headersNoAuth,
    }
    return await context.tryCatchFunctionAxios(config);
}
