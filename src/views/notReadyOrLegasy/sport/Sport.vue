<template>

    <div class="sport">

       <button class="sport--prepare--button" 
       v-on:click="createAddForm" v-if="hasRights" 
       v-show="!hasPrepare">{{prepareButton}}</button>
       <div class="sport--add sport--search--step" action="" v-show="hasPrepare">
         <div class="sport--add--block">
             <span>ФИО</span> 
            <input class="sport--add--block--fio" type="text" placeholder="" autocomplete="on" list="fioList"
           v-model="newResult.fio">
            <datalist id="fioList">
              <option v-for='item in returndPersone'>
                {{ item.fio }}
              </option>
            </datalist>
            <i class="fa fa-check sport--add--block--check" v-show="newResult.fio !== ''"></i>
            </div>
         <div class="sport--add--block">
            <span>Пол</span>
            <select name="" id="" v-model="newResult.sex">
              <option>Мужской</option>
              <option>Женский</option>
            </select>
            <i class="fa fa-check sport--add--block--check" v-show="newResult.sex !== ''"></i>
          </div>
          <div class="sport--add--block">
            <span>Отделение</span>
            <select name="" id="s1" v-model="newResult.squad">
              <option>1 Отделение</option>
              <option>2 Отделение</option>
              <option>3 Отделение</option>
              <option>Руководство</option>
              <option>4 Отделение</option>
              <option>5 Группа</option>
              <option>8 Группа</option>
            </select>
            <i class="fa fa-check sport--add--block--check" v-show="newResult.squad !== ''"></i>
          </div>
          <div class="sport--add--block">
            <span>Месяц сдачи</span>
            <input type="month" name="" id="" v-model="newResult.month">
            <i class="fa fa-check sport--add--block--check" v-show="newResult.month !== ''"></i>
          </div>
         <div class="sport--add--block">
            <span>Подтягивания</span>
            <input type="number" min="0" max="50" v-model="newResult.pull">
            <i class="fa fa-check sport--add--block--check" v-show="newResult.pull !== ''"></i>
          </div>
          <div class="sport--add--block">
            <span>10 по 10</span>
            <input type="time" step='1' min="00:24:00" max="00:40:00" v-model="newResult.short">
            <i class="fa fa-check sport--add--block--check" v-show="newResult.short !== ''"></i>
          </div>
          <div class="sport--add--block">
            <span>1 км.</span>
            <input type="time" step='1' min="00:02:30" max="00:08:00" v-model="newResult.long">
            <i class="fa fa-check sport--add--block--check" v-show="newResult.long !== ''"></i>
          </div>
           <div class="sport--add--block">
            <span>Итоговая оценка за месяц</span>
             <select name="" id="sMark" v-model="newResult.mark">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
            </select>
            <i class="fa fa-check sport--add--block--check" v-show="newResult.mark !== ''"></i>
          </div>
       </div>
       <button class="sport--add--button" title="Опубликовать" 
                v-on:click="addSportResult" v-show="hasPrepare">Опубликовать</i></i></button>
        <br>

      <div class="sport--search" v-show="showSelectionResult">
       <h3>Выборка результатов *Работает только по ФИО и отделению</h3>

       <div class="sport--search--step  sport--search--step__1">
         <h3>Шаг 1. Выборка людей.</h3>
         <span>По</span>
          <select id="s2" v-model="select.step" class="sport--search--step--selectStep1">
                <option value="squad">отделению</option>
                <option value="fio">ФИО</option>
                <option value="top">топ 10</option>
                <option value="mark">оценкам</option>
                <option value="total">средний показатель отделений</option>
            </select>
        <div class="sport--underline"></div>

        <transition-group name="fade" mode="out-in">
        <div class="sport--search--block" v-show="select.step === 'squad'" key="squad">
            <h4>По отделениям</h4>
            <div class="sport--search--block--category">
               <div v-for='item in allSquad' class="sport--search--block--category--item">
                 <div>
                  <input class="sport--search--block--input--radio" type="radio" v-bind:id="item" 
                  v-bind:value="item" v-model="select.squad">
                  <label v-bind:for="item">{{ item }}</label>
                </div>
              </div>
            </div>
        </div>

        <div class="sport--search--block" v-show="select.step === 'fio'" key="fio">
            <h4>По ФИО</h4>
                <input class="sport--add--block--100" type="text" placeholder="" autocomplete="on" list="fioList"
           v-model="select.fio">
            <datalist id="fioList">
              <option v-for='item in returndPersone'>
                {{ item.fio }}
              </option>
            </datalist>
         </div>
        


        <div class="sport--search--block" v-show="select.step === 'top'" key="top">
            <h4>Топ 10 в категории</h4>
              <select id="s2" v-model="select.category" class="sport--add--block--100">
                <option>Бег на дистанции 1 км.</option>
                <option>10 по 10 метров</option>
                <option>Подтягивания</option>
            </select>
        </div>
      

        <div class="sport--search--block" v-show="select.step === 'mark'" key="mark">
            <h4>По оценкам</h4>
              <select id="s2" v-model="select.mark" class="sport--add--block--100">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
            </select>
        </div>

         <div class="sport--search--block" v-show="select.step === 'total'" key="total">
            <h4>Средний показатель для выбранных подразделений</h4>
              <div class="sport--search--block--category">
               <div v-for='item in allSquad' class="sport--search--block--category--item">
                 <div>
                  <input class="sport--search--block--input--radio" type="radio" v-bind:id="item" 
                  v-bind:value="item" v-model="select.squad">
                  <label v-bind:for="item">{{ item }}</label>
                </div>
              </div>
            </div>
        </div>
        </transition-group>
        </div>
      <br>
      <div class="sport--search--step">
         <h3>Шаг 2. Выбор периода.</h3>
        <div class="sport--add--block">
            <span>Начальный месяц</span>
            <input type="month" name="" id="" v-model="select.startMonth">
          </div>
          <div class="sport--add--block">
            <span>Конечный месяц</span>
            <input type="month" name="" id="" v-model="select.endMonth">
  
          </div>
         <div class="sport--add--block">
            <span>*Если начальный и конечный месяц не выбран будет выведена статистика за все время</span>
          </div>
          <h4>Тип графика</h4>
              <select v-model="select.type" class="sport--search--step--selectType">
                <option value="spline">Сплайн</option>
                <option value="bar">Столбиковая</option>
                <option value="pie">Пирог</option>
                <option value="bubble">Пузыри</option>
            </select>
        </div>

      <br>
       <button class="sport--show--button" v-on:click="showResult"  v-show="showSelectionResult"
               >Показать результат</button>
        <br>
        <div class="loading-spinner">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-show="showLoad"></i>
        </div>

      </div>

       <button class="sport--show--button" v-on:click="showNewSelect" v-show="!showSelectionResult"
               >Создать новую выборку</button>
      
      <div class="sport--result" v-if="!showSelectionResult">
          <h3>Подтягивания</h3>
          <chart v-bind:prop="pullProp"></chart>

          <h3>Бег на 1 км.</h3>
          <chart v-bind:prop="longProp"></chart>

          <h3>10 по 10 метров</h3>
          <chart v-bind:prop="shortProp"></chart>
      </div>


  </div>
</template>

<script>
import chart from "../../components/charts/chart";
import dataToChart from "../../components/charts/dataToChart";

var moment = require("moment");

const sport = {
  name: "Sport",
  components: { chart },
  data() {
    return {
      allSquad: [
        "1 Отделение",
        "2 Отделение",
        "3 Отделение",
        "Руководство",
        "4 Отделение",
        "5 группа",
        "8 группа"
      ],
      prepareButton: "Занести результаты",
      hasPrepare: false,
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
      select: {
        step: 0,
        category: "",
        squad: "",
        endMonth: "",
        startMonth: "",
        allMonth: "",
        mark: "",
        fio: "",
        query: "",
        type: "spline"
      },
      showSelectionResult: true,
      pullProp: {
        data: "",
        className: "chart--pull"
      },
      shortProp: {
        data: "",
        className: "chart--short"
      },
      longProp: {
        data: "",
        className: "chart--long"
      },
      returndResult: [],
      showLoad: false
    };
  },
  computed: {
    returndPersone: function() {
      return this.$store.getters.getPersone;
    },
    newFIO() {
      return {
        fio: this.newResult.fio,
        squad: this.newResult.squad
      };
    },
    hasRights() {
      return this.$store.getters.getAuth.name === "shmakov" ? true : false;
    }
  },
  sockets: {
    sportSearchReturn(objFromServer) {
      if (objFromServer[0] === undefined) {
        alert("Данные отсутсвтуют");
        this.showLoad = false;
        return;
      }
      function compare(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
      }
      // ------ ====== Сортируем данные из сокета и записываем в локальный массив =====-----
      this.returndResult = objFromServer.sort((a, b) =>
        compare(a.month, b.month)
      );
      // -------------------------------------------------------------------------------
      // -----========= Подготовить данные для построения графика ========-------------
      this.pullProp.data = dataToChart(
        this.returndResult,
        "pull",
        this.select.type
      );
      this.shortProp.data = dataToChart(
        this.returndResult,
        "short",
        this.select.type
      );
      this.longProp.data = dataToChart(
        this.returndResult,
        "long",
        this.select.type
      );
      // ------------------------------------------------------------------------------
      this.showSelectionResult = false;
      this.showLoad = false;
    }
  },
  methods: {
    createAddForm: function() {
      this.hasPrepare = !this.hasPrepare;
    },
    addSportResult: function() {
      this.hasPrepare = !this.hasPrepare;
      this.newResult.fio = this.newResult.fio.toUpperCase();
      if (this.newResult.fio === "" || this.newResult.month === "") {
        alert("ФИО и Месяц обязательны");
      } else {
        this.addPerson();
        this.$socket.emit("addPost", [this.newResult, "sport"]);
        alert("Результаты занесены");
      }
    },
    addPerson() {
      this.$socket.emit("addPost", [this.newFIO, "persone"]);
    },

    // ------======== Формирование поисковой выборки ======-----------
    makeSearchQuery() {
      switch (this.select.step) {
        case "fio":
          this.select.query = [
            [
              this.select.step,
              this.select.fio,
              this.select.startMonth,
              this.select.endMonth
            ],
            "sportSearch"
          ];
          break;
        case "squad":
          this.select.query = [
            [
              this.select.step,
              this.select.squad,
              this.select.startMonth,
              this.select.endMonth
            ],
            "sportSearch"
          ];
          break;
        case "mark":
          this.select.query = [
            [
              this.select.step,
              this.select.mark,
              this.select.startMonth,
              this.select.endMonth
            ],
            "sportSearch"
          ];
          break;

        default:
          alert("Данный метод пока не поддерживается");
          this.select.query = false;
          break;
      }
    },
    // ----------------------------------------------------------------
    makeResult() {
      // После отсылки запроса сокет слушает когда появится событие sportSearchReturn
      this.$socket.emit("getPost", this.select.query);
      // Показываем анимацию загрузки которая отключится в колбэке сокета
      this.showLoad = true;
    },
    showResult: function() {
      this.returndResult.length = 0;
      this.makeSearchQuery();
      if (this.select.query !== false) {
        this.makeResult();
      }
    },
    showNewSelect() {
      this.showLoad = false;
      this.showSelectionResult = true;
    }
  },
  mounted() {}
};

export default sport;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Sport.css"></style>