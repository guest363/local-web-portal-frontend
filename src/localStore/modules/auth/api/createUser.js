import context from '../../../../backendContext';
const url = `${context.url}/api/auth`;
/**
       * @description Получить статус всех хостов
       * @returns {object} ответ от сервера
       *
  */
export default async user => {
    const config = {
        method: 'POST',
        data: user,
        withCredentials: true,
        url: `${url}/user`,
        headers: context.headersNoAuth
    }
    return await context.tryCatchFunctionAxios(config);
}
