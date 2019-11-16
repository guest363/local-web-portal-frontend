export const today = new Date();
export const yesterday = new Date(new Date().setDate(today.getDate() - 1));
/**
 * Нормализует дату до 2-х цифр.
 * Например 2 становится 02
 *
 * @param {Date} day обьект дата который нужно нормализовать
 * @return {string} Нормализованная строка даты.
 */
const normolizeDate = day => (day > 9) ? day : `0${day}`;

/**
 * Формирует строку запрос для обращения к конкретной дате выдачи ЦБ РФ
 * Вид строки '?date_req=01/02/2000'
 *
 * @param {Date} day обьект дата на которую нужно сформировать запрос.
 * @return {string} Строка запроса.
 */
export const dayReq = day => `?date_req=${normolizeDate(day.getDate())}/${normolizeDate(day.getMonth())}/${day.getFullYear()}`;