const xhr = new XMLHttpRequest();

/**
 * Получает данные о курсе с сайта www.cbr-xml-daily.ru.
 * Так как этот сайт может выдавать ответ в формате JSON
 * общение с ним значительно проще.
 * Плюс в ответе изначально есть курс за предыдущий день а значит
 * запрос будет только один.
 * Нормализация обьекта происходит на месте, так как она значительно проще чем
 * для XML файла
 *
 * @param {Array} cashName Массив сокращенных наименований валют.
 * @return {promise} Возвращает промисс, который по своему завершению вернет 
 *                   обьект для виджета.
 */
export default cashName => {
    const promise = new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            // Ждем пока запрос не завершиться
            if (xhr.status != 200) {
                console.log(`ошибка ${(xhr.status ? xhr.statusText : 'запрос не удался')}`);
            } else {
                try {
                    const respons = JSON.parse(xhr.responseText);
                    const obj = cashName.map(item => ({
                        'name': item,
                        current: respons.Valute[item]['Value'],
                        previous: respons.Valute[item]['Previous'],
                        isGrow: respons.Valute[item]['Value'] > respons.Valute[item]['Previous']
                    }));
                    resolve(obj);
                } catch (error) {
                    console.log(`Данные не могут быть переведены в нужный формат ${error}`);
                    reject(new Error(""));
                }
            }
        };
        xhr.open(
            "GET",
            "https://www.cbr-xml-daily.ru/daily_json.js",
            true
        );
        xhr.send();
    });
    return promise;
};