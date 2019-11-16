import parceCash from './cb-rf-cash.js.js';
import {yesterday, dayReq} from './cb-rf-date.js.js';
import cbHttpReq from './cb-rf-cashDataHttp.js.js';
import dailyHttpReq from './cbr-xml-dailyDataHttp.js.js';

/**
 * Делает запрос к ЦБ связывая все вспомогательные функции

 * @param {Array} cashName Массив сокращенных наименований валют со значением
 *                         по умолчанию ['USD', 'EUR'].
 * @param {number} round Степень округления значений курса.
 * @return {promise} Возвращает промисс, который по своему завершению вернет 
 *                   обьект для виджета.
 */
export default (cashName = ['USD', 'EUR'], round) => {
  const roundCash = (round, item) => Math.round(item * round) / round;
  const normolize = (round, item) => {
    return item.map(elem => {
      return {
        name: elem.name,
        current: roundCash(round, elem.current),
        previous: roundCash(round, elem.previous),
        isGrow: elem.isGrow
      };
    });
  };
  const promise = new Promise((resolve, reject) => {
    const typeOfRequest = {
      'ЦБ': () => {
        /* today это частично примененная функция parceCash */
        cbHttpReq(parceCash, '', cashName, typeOfRequest).then(today => {
          cbHttpReq(today, dayReq(yesterday), cashName, typeOfRequest).then(result => {
            resolve(normolize(round, result));
          });
        })
      },
      'cbr-xml-daily': () => {
        dailyHttpReq(cashName).then(result => resolve(normolize(round, result)));
      }
    };
    /*  */
    typeOfRequest['ЦБ']();

  });

  return promise;
};