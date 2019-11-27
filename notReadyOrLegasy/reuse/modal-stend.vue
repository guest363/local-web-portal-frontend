<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModalOnMask($event.target)" id="modal-slider">
      <div class="modal-wrapper">
        <div class="modal-container grid-stend">
          <div class="modal-header">
            <img class="modal--logo--img" src="../../../assets/img/logo.png" alt="" srcset="">
          </div>
          <div class="modal-date">
            <div class="modal-date--date">
              <span class="modal-date--date--day">{{date}}</span>
              <br>
              <span class="modal-date--date--time">{{time}}</span>
            </div>

            <div class="modal-date--holyday">
              <h3>С днем рождения:</h3>
              <ul>
                <li>NAME</li>
              </ul>
            </div>
          </div>

          <div class="modal-body">
            <div class="modal-body-header">
              <h5 class="modal--logo--text">ORG NAME</h5>
              <div class="line"></div>
            </div>
            
            <div class="yandex-news">
              <div v-for='(item, index) in this.yandexNews' class="hw-100" v-bind:key="item.title">
                <article class="card card__modal" :class="indexClass(index)" v-show="index === counter">
                  <div class="card--header card--header__modal">{{item.title}} 
                </div>
                  <div class="card--content card--content__modal"><span v-html="item.content"></span></div>
                </article>
              </div>
            </div>

          </div>

          <div class="modal-footer">
            <weather 
              api-key="KEY"
              title="Погода"
              latitude="57.1497673"
              longitude="65.5111825"
              v-bind:update-interval=Number(600000)
              v-bind:hide-header=true
              language="ru"
              units="si">
            </weather>
            <curs-widget :prop = toCashWidjet></curs-widget>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VueWeatherWidget from "./vue-weather-widget.js";
import "vue-weather-widget/dist/css/vue-weather-widget.css";
import cursWidget from "./course-widget.vue";
import newsRss from "./newsYandex.js";

let modalElemSlider;

const ModalSlider = {
  data: () => {
    return {
      time: "",
      date: "",
      toCashWidjet: {
        showHeader: true,
        textHeader: "Курсы валют",
        cash: ["USD", "EUR", "GBP", "INR", "JPY", "KRW"],
        round: 1000
      },
      yandexNews: "",
      counter: 0
    };
  },
  components: {
    weather: VueWeatherWidget,
    "curs-widget": cursWidget
  },
  computed: {},
  props: ["prop"],
  methods: {
    closeModalCommon(e) {
      if (e.keyCode === 27) {
        modalElemSlider.style.display = "none";
      } else return;
    },
    closeModalOnMask(target) {
      target.id === "modal-slider"
        ? (modalElemSlider.style.display = "none")
        : "";
    },
    closeModalOnExit() {
      modalElemSlider.style.display = "none";
    },
    indexClass(index) {
      return `news-number-${index}`;
    }
  },
  mounted() {
    const newsCounter = () => {
      setInterval(() => {
        this.counter = this.counter > 5 ? 1 : this.counter + 1;
      }, 20000);
    };
    newsCounter();
    newsRss().then(item => (this.yandexNews = item.items));
    modalElemSlider = document.querySelector("#modal-slider");
    document.addEventListener("keydown", this.closeModalCommon);
    setInterval(() => {
      const hours = new Date().getHours();
      const minuts =
        new Date().getMinutes() > 9
          ? new Date().getMinutes()
          : `0${new Date().getMinutes()}`;
      this.time = `${hours}:${minuts}`;

      const months = {
        0: "января",
        1: "февраля",
        2: "марта",
        3: "апреля",
        4: "мая",
        5: "июня",
        6: "июля",
        7: "августа",
        8: "сентября",
        9: "октября",
        10: "ноября",
        11: "декабря"
      };
      const month = new Date().getMonth();
      this.date = `${new Date().getDate()} ${months[month]}`;
    }, 1000);
    const imgFinder = () => {
      /* Находит первое изображение и вытаскивает его из тега p
      затем все оставшиеся теги p вносит в div с классом  card--content--all-text*/
      setTimeout(() => {
        const img = document.querySelector(".card--content__modal img");
        const parent = img.parentElement;
        const container = parent.parentElement;
        container.appendChild(img);
        parent.remove();
        const p = document.querySelectorAll(".card--content__modal p");
        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        div.className = "card--content--all-text";
        fragment.appendChild(div);
        for (let i = 0; i < p.length; i++) {
          fragment.firstElementChild.appendChild(p[i]);
        }
        container.appendChild(fragment);
      }, 1000);
    };
    imgFinder();
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.closeModalCommon);
  }
};

export default ModalSlider;
</script>

<style>
#modal {
  display: none;
}
.grid-stend {
  width: 100%;
  display: grid;
  grid-template-columns: 350px auto 350px;
  grid-template-rows: auto 1fr 300px;
  grid-template-areas:
    "head-logo body footer"
    "date body footer"
    "date body footer";
}

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--nav-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: inline-block;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
}

.modal-container {
  width: 100%;
  height: 100%;
  margin: 0px auto;
  padding: 0;
  border-radius: 2px;
  transition: all 0.3s ease;
  font-family: "Montserrat";
  position: relative;
}

.modal-body,
.modal-date,
.modal--logo--img {
  margin: 20px;
}
.modal--logo--text {
  font-size: 30px;
  text-align: left;
  display: inline-block;
  font-family: "Montserrat";
  margin: 0;
  color: var(--nav-bg-color--border);
}
.modal-header {
  grid-area: head-logo;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal--logo--img {
  max-height: 200px;
  width: auto;
  margin: 20px auto;
}
.modal--logo {
  display: flex;
  align-items: center;
}

.modal-body-img {
  max-height: 80vh;
  height: auto;
  width: 100%;
  max-width: 900px;
}
.modal-date {
  font-size: 40px;
  font-family: "Montserrat";
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 40px;
}
.modal-date--holyday {
  font-size: 30px;
}
.modal-date--holyday ul {
  padding: 0;
  margin: 0;
}
.modal-date--holyday li {
  list-style: none;
}

.modal-date--date {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: end;
  flex-wrap: wrap;
}
.modal-date--date span {
  display: inline-block;
}
.modal-date--date--day,
.modal-date--date--time {
  width: 100%;
}
.modal-date--date--time {
  font-size: 120px;
}
.modal-body {
  margin: 0;
  grid-area: body;
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: #f8f9f9;
  padding: 40px 40px 0 40px;
}
.card--header__modal {
  font-family: "Montserrat-Extra";
  padding: 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 70px;
  line-height: normal;
  text-align: left;
  display: inline-block;
  color: var(--nav-bg-color--border);
  border: none;
}
.card__modal {
  width: 100%;
  font-size: 32px;
  height: 100%;
  box-shadow: none;
  background: none;
  border: none;
  margin-top: 40px;
}
.line {
  display: inline-grid;
  width: 100%;
  background-color: var(--nav-bg-color--border);
  padding-top: 2px;
  margin-top: 40px;
}
.card--content__modal {
  width: 100%;
  padding: 0;
  margin-top: 20px;
  line-height: normal;
  color: var(--nav-bg-color--border);
  border: none;
}
.card--content__modal span,
.card--content__modal p {
  max-width: 900px;
  display: inline-block;
}
.card--content img {
  width: 100%;
  grid-area: img;
}
.card--content--all-text {
  grid-area: text;
}
.card--content--all-text p {
  /*   font-family:  "Montserrat-Bold"; */
}
.card--content__modal span {
  display: grid;
  grid-template-rows: 1fr minmax(0, 400px);
  grid-row-gap: 30px;
  grid-template-areas: "text" "img";
}
.modal-default-button {
  float: right;
}
.modal-date {
  grid-area: date;
}

.modal-footer {
  grid-area: footer;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.yandex-news {
  margin-top: 80px;
}
#forecast_embed {
  max-width: 100% !important;
  height: auto !important;
  padding: 0px;
  display: flex;
  justify-content: left;
}
.fe_currently {
  margin: 0 0 20px 0;
  width: 200px !important;
}
.fe_container .fe_forecast {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  padding: 20px 0;
}
.fe_container .fe_daily .fe_day .fe_temp_bar {
  font-size: 20px !important;
}
.fe_container .fe_daily .fe_day .fe_high_temp {
  top: -22px !important;
  left: 20px !important;
}
.fe_container .fe_daily .fe_day .fe_low_temp {
  bottom: -22px !important;
  left: 20px !important;
}
.fe_container .fe_daily {
  font-size: 42px !important;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
