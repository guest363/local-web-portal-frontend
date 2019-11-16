import { serverIP } from '../../constants.js';
const io = require('socket.io-client');
const socket = io(`http://${serverIP}`);

const dataToChart = (obj, exercise, type) => {
  if (exercise === "tag") {
    return new Promise((resolve, reject) => {
      const dbName = "wiki";
      const query = [[dbName, obj], "countByTag"];
      socket.emit("getPost", query);
      socket.on("countReturn", objFromServer => {
        const count = objFromServer.data;
        const propertys = {};
        const col = [];
        objFromServer.newTagArray.reduce((acc, item) => {
          col.push([item, count[acc]]);
          acc++;
          return acc;
        }, 0);

        //-----==== Обьект нужного формата для передачи в chart.data ======-------
        propertys.data = {
          columns: col,
          type: type
        };
        // ------------------------------------------------------------------------
        //-----====  Передается новый список тегов для привяки события в wiki ======-------
        propertys.newTagArray = objFromServer.newTagArray;
        // ------------------------------------------------------------------------
        resolve(propertys);
        // ------------------------------------------------------------------------
      });
    });
  } else {
    const result = {
      //Сет дат для построение оси X, значения не повторяются
      month: [],
      //Сет ФИО, значения не повторяются
      fio: [],
      data: []
    };
    //-----==== Занести значения в Наборы Set преобразуя в массив ======-------
    const monthSet = new Set();
    const fioSet = new Set();
    obj.map(x => {
      monthSet.add(x.month);
      fioSet.add(x.fio);
    });
    result.fio = [...fioSet];
    result.month = [...monthSet];
    // ------------------------------------------------------------------------

    //--------========= Шаблон для заполнения =======--------
    // без него не получится отобразить график правильно,
    // так как одна лишь фильтрация по ФИО приведет к пропускам в
    // месяцах и график челолвека который сдает не регулярно будет короче
    const template = result.month.map(item => {
      return {
        month: item,
        val: 0
      };
    });
    // -------------------------------------------------------------------------
    // -----======== Получение нового обьекта отфильтрованного по ФИО ===== ---
    const filterByFio = fio => {
      return obj.filter(item => item.fio === fio);
    };
    // -------------------------------------------------------------------------
    // ---===== нормализация беговых значений вида 00:00:00 до 00.00  =====-----
    const normolize = item => {
      return item.replace("00:", "").replace(/:/g, ".");
    };
    // --------------------------------------------------------------

    // ---===== Получение 1 строки массива data column  =====-----
    const singleData = (obj, exercise, template) => {
      return template.map(item => {
        return obj.reduce((acc, element) => {
          if (item["month"] === element["month"]) {
            return normolize(element[exercise]);
          } else {
            return acc;
          }
        }, 0);
      });
    };
    // --------------------------------------------------------------

    // ---===== Замена 0 на значение из предыдущего месяца  =====-----
    const replaceZero = arr => {
      let result = [];
      arr.reduce((acc, item) => {
        if (item === 0 || item === "" || item === false) {
          result.push(acc);
          return acc;
        } else {
          result.push(item);
          return item;
        }
      }, 0);
      return result;
    };
    // --------------------------------------------------------------
    // ---===== Получение массива data  =====-----
    result.fio.forEach(fio => {
      const oneArray = replaceZero(
        singleData(filterByFio(fio), exercise, template)
      );
      oneArray.unshift(fio);
      result.data.push(oneArray);
    });
    // ------------------------------------------
    const propertys = {};
    //-----==== Обьект нужного формата для передачи в chart.data ======-------

    propertys.data = {
      columns: result.data,
      type: type,
      keys: {
        // x: 'name', // it's possible to specify 'x' when category axis
        value: result.fio,
        x: "month",
        z: "fio"
      },
      names: {
        // занести значение упражнения напрямую не выйдет, т.к. заранее не известно
        // упражнение
      }
    };
    propertys.data.names[exercise] = result.fio;
    propertys.data.month = result.month;
    // ------------------------------------------------------------------------

    //-----==== Обьект нужного формата для передачи в chart.axis ======-------
    // Т.е. формирование осей
    // ----=======Выбрать диапозон оси Y в зависимости от упражнения===------
    const y = {};
    switch (exercise) {
      case "pull":
        y.max = 20;
        y.min = 0;
        break;
      case "short":
        y.max = 30;
        y.min = 25;
        break;
      case "long":
        y.max = 6;
        y.min = 3;
        break;
      default:
        break;
    }

    propertys.axis = {
      x: {
        type: "category",
        categories: propertys.data.month
      },
      y: y
    };
    // ------------------------------------------------------------------------
    return propertys;
  }
};

export default dataToChart;
/*
--------======= На входе такой обьект у dataToChart.prepare =========-----------------
 newResult: {
        fio: "",
        month: "",
        pull: "",
        short: "",
        long: "",
        sex: "Мужской",
        mark: "",
        squad: "1 Отделение",
        mark: "5"
      },
--------======= На выходе такой обьект у dataToChart.send =========-----------------
data: {
     columns: [
        ["data1", 30, 200, 100, 400, 150, 250],
        ["data2", 50, 20, 10, 40, 15, 25]
    ],
    type: "spline",
    keys: {
      // x: 'name', // it's possible to specify 'x' when category axis
      value: ["data1", 'data2'],
      x: "month",
      z: "fio"
    },
    names: {
      pull: fio
    }
  }, 
*/
