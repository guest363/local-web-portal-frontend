let Parser = require('./rss-parser');
let parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
export default () => {
    const promise = new Promise((resolve, reject) => {
        try{
        parser.parseURL(CORS_PROXY + 'https://news.yandex.ru/daily.rss', function(err, feed) {
            resolve(feed);
          });
        } catch (error) {
            reject(new Error(""));
        }
    });
    return promise;
  };