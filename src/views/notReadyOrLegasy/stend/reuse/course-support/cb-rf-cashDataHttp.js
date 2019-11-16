import xmlParcer from './xml-parcer.js.js';
const xhr = new XMLHttpRequest();

/**
 * Получает данные о курсе с сайта ЦБ РФ за выбранную дату.
 * В случае не доступности сайта ЦБ пробует порлучить данные 
 * с сайта www.cbr-xml-daily.ru.
 *
 * @param {Function} parceFunc Функция парсинга ответа (приведения к обьекту).
 *                             Передается в каррированном варианте.
 * @param {string} day сформированная строка запроса на определенную дату.
 *                     если она будет пустой "" то возвращается курс на текущий день.
 * @param {Array} cashName Массив сокращенных наименований валют.
 * @param {object} obj Обьект typeOfRequest у которого вызывается метод 'cbr-xml-daily'
 *                     в случае не возможности получить данные с сайта ЦБ.
 * @return {promise} Возвращает промисс, который по своему завершению вернет 
 *                   обьект для виджета.
 */
export default (parceFunc, day, cashName, obj) => {
    const promise = new Promise((resolve, reject) => {
    xhr.open(
        "GET",
        `https://cors-anywhere.herokuapp.com/www.cbr.ru/scripts/XML_daily.asp${day}`,
        true
    );
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        // Ждем пока запрос не завершиться
        if (xhr.status != 200) {
            console.log(`ошибка ${(xhr.status ? xhr.statusText : 'запрос не удался')}`);
            console.log('Получить данные с сайта ЦБ РФ не вышло, загружаю данные с cbr-xml-daily');
            obj['cbr-xml-daily']();
        } else {
            try {
                const xmlDoc = xmlParcer(xhr.responseText);
                resolve(parceFunc(xmlDoc, cashName));
            } catch (error) {
                console.log(`Данные не могут быть переведены в нужный формат ${error}`);
                reject(new Error(""));
            }
        }
    };


    xhr.setRequestHeader("Origin", 'http://www.cbr.ru');
    xhr.send();
    });
    return promise;
}