/**
 * Соответствие валюты и индекса в выдаче ЦБ РФ
 */
const cashTemplateName = {
    'USD': "R01235",
    'EUR': "R01239",
    'GBP': "R01035",
    'INR': "R01270",
    'JPY': "R01820",
    'KRW': "R01815"
};

/**
 * Находит наименование валюты в выдаче ЦБ РФ.
 * Поиск в XML документе осуществляется при помощи XPath.
 * Итоговое число нормализуется заменой "," на ".".
 *
 * @param {XML} xmlDoc Распарсенная XML строка.
 * @param {number} id Идентификатор валюты.
 * @return {number} Курс на выбранную дату.
 */
const getCashValue = (xmlDoc, id) => {
    return xmlDoc.evaluate(`//Valute[@ID='${id}']`, xmlDoc, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.children[4].innerHTML.replace(",", ".")
};


/**
 * Парсит XML документ.
 * Еще стоит обратить внимание что функция каррирована 
 * Первоначально она заполняет данные курса за текущий день и 
 * список используемых валют.
 * Затем она принимает данные курса за предыдужий день и 
 * заполняет оставшиеся значения обьекта.
 *
 * @param {XML} xmlDoc Распарсенная XML строка.
 * @param {Array} cashName Массив сокращенных наименований валют.
 * @return {object} Обьект подхлдящего для виджета формата 
 *                  {name: '', current: '', previous: '', isGrow: ''} 
 */
export default (xmlDoc, cashName) => yesterdayValue => {
    return cashName.map(item => ({
        name: item,
        current: getCashValue(xmlDoc, cashTemplateName[item]),
        previous: getCashValue(yesterdayValue, cashTemplateName[item]),
        isGrow: getCashValue(xmlDoc, cashTemplateName[item]) > getCashValue(yesterdayValue, cashTemplateName[item])
    }));
};