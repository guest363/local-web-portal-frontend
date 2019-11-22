import { context, url } from '../context';
/**
  * @description Добавить новую вики
  * @param {object} wiki
  * @param {String} wiki.content
  * @param {String} wiki.date
  * @param {String} wiki.url
  * @param {String} wiki.author
  * @param {String} wiki.headers
  * @param {Array}  wiki.tag
  * @returns {object} http коды
  *
  */
export default async wiki => {
    const config = {
        method: 'POST',
        url: `${url}/article/${wiki.url}`,
        data: wiki,
        headers: context.headers,
    }
    return await context.tryCatchFunctionAxios(config);
}
