/**
 * Парсит XML документ.
 * Имеет fallback для IE.
 *
 * @param {XML} xmlDoc Полученный с сайта XML документ.
 * @return {string} Распарсенная строка.
 */
export default item => {
    let xmlDoc;
    try {
      if (window.DOMParser) {
        let parser = new DOMParser();
        xmlDoc = parser.parseFromString(item, "text/xml");
      } else // Internet Explorer
      {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(item);
      }
    } catch (error) {
      console.log('Не удалось распарсить XML документ')
    }
    return xmlDoc;
  };