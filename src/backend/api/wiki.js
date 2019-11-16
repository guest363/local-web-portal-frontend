import context from '../context';
const api = {
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
    async post(wiki) {
        const config = {
            method: 'POST',
            url: `${context.url}/wiki`,
            data: wiki,
            headers: context.headers,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
    * @description Добавить новый тег
    * @param {String} tag 
    * @returns {object} http коды
    *
    */
    async postTag(tag) {
        const config = {
            method: 'POST',
            url: `${context.url}/wikiTag`,
            data: tag,
            headers: context.headers,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
    * @description Запросить конкретную вики статью
    * @param {String} params имя вики, параметр wiki.header
    * @returns {object} вики статья
    *
    */
    async get(params) {
        const config = {
            method: 'GET',
            url: `${context.url}${params}`,
            headers: context.headersNoAuth,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
    * @description Запросить последнюю вики статью
    * @returns {object} вики статья
    *
    */
    async getLast() {
        const config = {
            method: 'GET',
            url: `${context.url}/wikiLast`,
            headers: context.headersNoAuth,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
    * @description Запросить все теги
    * @returns {Arary} массив тегов
    *
    */
    async getTags() {
        const config = {
            method: 'GET',
            url: `${context.url}/wikiTags`,
            headers: context.headersNoAuth,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
    * @description Посчитать колличество статей с такими тегами
    * @returns {object} число таких статей
    *
    */
    async count(tags) {
        const config = {
            method: 'GET',
            url: `${context.url}/countByTagWiki`,
            params: tags,
            headers: context.headersNoAuth,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    /**
     * @description Поиск статьи вики
     * @param {object} params
     * @param {String} params.tag
     * @param {String} params.content
     * @returns {Array} || String результат поиска
     *
     */
    async search(params) {
        const config = {
            method: 'GET',
            url: `${context.url}/wiki`,
            params: params,
            headers: context.headersNoAuth,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    async delete(id) {
        const config = {
            method: 'DELETE',
            url: `${context.url}/wiki/${id}`,
            headers: context.headers,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    async deleteTag(tag) {
        const config = {
            method: 'DELETE',
            url: `${context.url}/wikiTag/${tag}`,
            headers: context.headers,
        }
        return await context.tryCatchFunctionAxios(config);
    },
};

export default api