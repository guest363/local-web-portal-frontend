import { context, url } from '../context';
/**
        * @description Получить информацию о сотруднике
        * @returns {object} сотудник
        *
   */
export default async id => {
    const config = {
        method: 'GET',
        url: url,
        params: { id: id },
        headers: context.headersNoAuth,
    }
    return await context.tryCatchFunctionAxios(config);
}
