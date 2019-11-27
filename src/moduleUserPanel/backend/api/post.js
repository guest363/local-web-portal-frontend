import { context, url } from '../context';

export default async person => {
    const config = {
        method: 'POST',
        url: url,
        data: person,
        headers: context.headers,
    }
    return await context.tryCatchFunctionAxios(config);
}
