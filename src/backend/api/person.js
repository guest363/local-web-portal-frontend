import context from '../context';
const url = `${context.url}/person`;
const api = {

    async get(id) {
        const config = {
            method: 'GET',
            url: url,
            params: {id: id},
            headers: context.headersNoAuth,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    async post(person) {
        const config = {
            method: 'POST',
            url: url,
            data: person,
            headers: context.headers,
        }
        return await context.tryCatchFunctionAxios(config);
    },
    async delete(person) {
        const config = {
            method: 'DELETE',
            url: `${url}/${person}`,
            headers: context.headers,
        }
        return await context.tryCatchFunctionAxios(config);
    },

};

export default api