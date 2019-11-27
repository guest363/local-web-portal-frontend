<template>
    <div class="shoot">
        <!-- Секция управления -->
        <div class="section--actions">
            <!-- ======================== Занести данные стрелка ================================ -->
            <div
                class="section--actions--section"
                v-bind:style="`background-color: var(--wiki--card--newArticle)`"
            >
                <h2>Занести данные стрелка</h2>
                <p>Для занесения новых в базу введите данные стрелка и роставьте все выстрелы:</p>
                <div class="section--block">
                    <span>Упражнение стрельб</span>
                    <select
                        name=""
                        id="s1"
                        class="section--block--select"
                        v-on:input="selectLesson($event)"
                    >
                        <option value="0"></option>
                        <option value="1">1 упражнение учебных стрельб</option>
                        <option value="2">2 упражнение учебных стрельб</option>
                        <option value="3">3 упражнение учебных стрельб</option>
                    </select>
                </div>
                <div class="section--block">
                    <span>ФИО</span>
                    <input
                        class="section--block--input"
                        type="text"
                        placeholder=""
                        autocomplete="on"
                        list="fioList"
                        v-model="shoot.fio"
                    >
                    <datalist id="fioList">
                        <option v-for="item in returndPersone" v-bind:key="item.fio">{{ item.fio }}</option>
                    </datalist>
                </div>
                <div class="section--block">
                    <span>День сдачи</span>
                    <input class="section--block--input" type="date" v-model="shoot.day">
                </div>
                <button class="section--actions--button" v-on:click="showModal">Добавить</button>
            </div>
            <!-- ======================== Сформировать ведомость на стрельбы ================================ -->
            <div
                class="section--actions--section"
                v-bind:style="`background-color: var(--wiki--card--internet)`"
            >
                <h2>Сформировать ведомость на стрельбы</h2>
                <div class="section--block">
                    <span>Колличество людей на стрельбах:</span>
                    <input
                        class="section--block--input"
                        type="number"
                        min="1"
                        max="100"
                        v-model="printCount"
                    >
                </div>
                <div class="section--block">
                    <span>День сдачи</span>
                    <input class="section--block--input" type="date" v-model="forPrint.day">
                </div>
                <button class="section--actions--button" v-on:click="print">Печать</button>
            </div>
            <!-- ======================== Посмотреть историю стрельбы ================================ -->
            <div
                class="section--actions--section"
                v-bind:style="`background-color: var(--wiki--card--resti)`"
            >
                <h2>Посмотреть историю стрельбы</h2>
                <div class="section--block">
                    <span>ФИО</span>
                    <input
                        class="section--block--input"
                        type="text"
                        placeholder=""
                        autocomplete="on"
                        list="fioList"
                        v-model="shoot.fio"
                    >
                    <datalist id="fioList">
                        <option v-for="item in returndPersone" v-bind:key="item.fio">{{ item.fio }}</option>
                    </datalist>
                </div>
                <div class="section--block">
                    <span>Начальная дата</span>
                    <input
                        class="section--block--input"
                        type="date"
                        v-model="shooterResult.startDate"
                    >
                </div>
                <div class="section--block">
                    <span>Конечная дата</span>
                    <input
                        class="section--block--input"
                        type="date"
                        v-model="shooterResult.endDate"
                    >
                </div>
                <div class="section--block">
                    <span>*Если начальный и конечный месяц не выбран будет выведена статистика за все время</span>
                </div>
                <button class="section--actions--button" v-on:click="showHistory">Показать</button>
            </div>
            <!-- <button class="shoot--actions--button" v-on:click="addShootData">Добавить</button> -->
        </div>
        <div id="printContent" class="shoot--print">
            <h1 class="shoot--print--header">Стрельбы {{forPrint.day}}</h1>
            <shoot-print class="shoot--print--targets" v-for="n in this.returnCount" v-bind:key="n"></shoot-print>
        </div>
        <div class="shoot--targets" v-if="display === 'newResult'">
            <h1>Мишень для занесения результатов стрельбы</h1>
            <h2>Стрелок: {{shoot.fio}}</h2>
            <shoot-target
                class="shoot--aim"
                :data="dataToTarget"
                v-on:shootResult="newShootResult($event)"
            ></shoot-target>
        </div>
        <!-- ======================== История стрельб ================================ -->
        <shoot-history
            :display="display"
            :shoot="shoot"
            :dataToTargetsHistory="dataToTargetsHistory"
        ></shoot-history>
        <!-- ======================== Modal ================================ -->
        <modal v-show="isShowModal" @close="closeModal">
            <template v-slot:header>
                <h2>Данные стрелка: {{shoot.fio}}</h2>
            </template>
            <p>День сдачи</p>
            <h3>{{new Date(shoot.day).toLocaleString("ru", dateOpt)}}</h3>
            <p>Набранно балов</p>
            <h3>{{shoot.sum}}</h3>
            <p>Оценка</p>
            <h3>{{shoot.mark}}</h3>
            <shoot-target-for-results
                class="shoot--aim__result"
                :shootsArray="dataToTargetResult.shootsArray"
            ></shoot-target-for-results>
            <div class="modal--usb--grid--footer"></div>
            <template v-slot:footer>
                <button class="button--del" @click="closeModal()">Отмена</button>
                <button class="button--add" @click="addShootData()">Занести новые данные</button>
            </template>
        </modal>
    </div>
</template>

<script>
import ShootPrint from "./ShootPrint.vue";
import ShootTarget from "../components/shootTarget.vue";
import ShootTargetForResults from "../components/shootTargetForResults.vue";
import shootHistory from "./shootHistory.vue";

export default {
  name: "Shoot",
  components: { ShootPrint, ShootTarget, ShootTargetForResults, shootHistory },
  data() {
    return {
      count: 0,
      shoot: {
        leson: 1,
        day: new Date(),
        fio: "",
        mark: "",
        sum: "",
        values: [],
        x: [],
        y: []
      },
      dateOpt: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      },
      shooterResult: {
        startDate: "",
        endDate: ""
      },
      dataToTarget: {
        exercise: "1",
        maxCount: ""
      },
      dataToTargetResult: {
        shootsArray: ""
      },
      forPrint: {
        day: ""
      },
      display: "none",
      hasPrepare: false,
      printCount: 12,
      alert: {
        header: "",
        text: ""
      }
    };
  },
  computed: {
    returnCount() {
      return parseInt(this.printCount);
    },
    returndPersone: function() {
      return this.$store.getters.GET_PERSONS;
    },
    dataToTargetsHistory() {
      return this.$store.getters.GET_HISTORY;
    }
  },
  methods: {
    selectLesson(event) {
      this.shoot.leson = event.target.value;
      if (this.shoot.leson === 0) return;
      this.dataToTarget.maxCount = this.$store.getters.GET_SHOOT_ON_LESSON(
        this.shoot.leson
      );
      this.dataToTarget.exercise = this.shoot.leson;
      this.display = "newResult";
    },
    newShootResult(shoot) {
      this.shoot.values = shoot.values;
      this.shoot.x = shoot.x;
      this.shoot.y = shoot.y;
      this.shoot.mark = shoot.mark;
      this.shoot.sum = shoot.sum;
      this.dataToTargetResult.shootsArray = this.shoot.x.map((x, index) => {
        return [x, shoot.y[index]];
      });
      this.showModal();
    },
    showHistory() {
      const query = {
        fio: this.shoot.fio,
        startDate: this.shooterResult.startDate,
        endDate: this.shooterResult.endDate
      };
      this.$store.dispatch("GET_SHOOT_HISTORY", query);
      this.display = "historyResults";
    },
    print() {
      this.display = "print";
      setTimeout(() => {
        const prtContent = document.getElementById("printContent");
        window.print();
      }, 0);
    },
    addShootData() {
      if (this.shoot.fio === "") {
        this.showAlert("Ошибка", "ФИО обязательное поле");
      } else {
        this.$store.dispatch("SET_RESULT", this.shoot);
        this.shoot = {};
        this.display = "";
        this.showAlert("Успех", "Результаты занесены");
        this.closeModal();
      }
    }
  }
};
</script>

<style src="../css/shoot.less"></style>