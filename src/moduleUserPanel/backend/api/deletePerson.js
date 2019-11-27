import { context, url } from '../context';
/**
    * @description Удалить запись о сотруднике из базы
    * @returns {object} ответ от сервера
    *
*/
export default async person => {
    const config = {
        method: 'DELETE',
        url: `${url}/${person}`,
        headers: context.headers,
    }
    return await context.tryCatchFunctionAxios(config);
}
