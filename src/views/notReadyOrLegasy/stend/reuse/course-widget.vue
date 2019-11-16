<template>
    <div class="cash--wrapper">
        <h5 v-show="prop.showHeader">{{prop.textHeader}}</h5>
        <div v-for='item in cashVaule' v-bind:key="item.name">
            <div class="cash--text">
                <span class="cash--text--ico" :class="iconClass(item.name)"></span>
                <span class="cash--text--text">{{item.current}}</span>
                <span class="cash--text--isgrow" :class="isGrow(item.isGrow)"></span>
            </div>      
        </div>
    </div>
</template>

<script>
import curs from "./course-support/course-mane.js";

export default {
  data: () => {
    return {
      cashVaule: ""
    };
  },
  props: {
    prop: {
      type: Object,
      validator: function(value) {
        // Значение каждого эл. массива должно соответствовать одной из этих строк
        let isCorrect = true;
        value.cash.forEach(element => {
          if (
            ["USD", "EUR", "GBP", "INR", "JPY", "KRW"].indexOf(element) === -1
          ) {
            isCorrect = false;
            console.error(
              'допустимы только значения из множества "USD", "EUR", "GBP", "INR", "JPY", "KRW"'
            );
          }
        });
        if (typeof value.round !== "number") {
          console.error("параметр round должен быть числом!");
          isCorrect = false;
        }
        return isCorrect;
      },
      default: function() {
        return {
          cash: {
            type: Array,
            default: ["USD", "EUR"]
          },
          showHeader: true,
          textHeader: "Курсы валют",
          round: 1000
        };
      }
    }
  },
  methods: {
    iconClass(item) {
      return `icon-${item}`;
    },
    isGrow(item) {
      if (item === "unset") return "";
      return item ? `icon-up` : `icon-down`;
    }
  },
  mounted() {
    curs(this.prop.cash, this.prop.round).then(item => (this.cashVaule = item));
    /* Обновление курсов каждые 10 минут */
    setInterval(() => {
      curs(this.prop.cash, this.prop.round).then(
        item => (this.cashVaule = item)
      );
    }, 600000);
  }
};
</script>

<style>
/* 
  Поддерживает иконки:
    Доллар
    Евро
    Фунт
    Рупий
    Йен
    Рубли
    Биткоин
    Вон
    Стрелка вниз
    Стредка вверх
 */
@font-face {
  font-family: "fontello-cash";
  src: url("data:application/octet-stream;base64,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");
}
.icon-down:before {
  content: "\e800";
} /* '' */
.icon-up:before {
  content: "\e801";
} /* '' */
.icon-EUR:before {
  content: "\f153";
} /* '' */
.icon-GBP:before {
  content: "\f154";
} /* '' */
.icon-USD:before {
  content: "\f155";
} /* '' */
.icon-INR:before {
  content: "\f156";
} /* '' */
.icon-JPY:before {
  content: "\f157";
} /* '' */
.icon-RUB:before {
  content: "\f158";
} /* '' */
.icon-KRW:before {
  content: "\f159";
} /* '' */
.icon-BTC:before {
  content: "\f15a";
} /* '' */

[class^="icon-"]:before,
[class*=" icon-"]:before {
  font-family: "fontello-cash";
  font-style: normal;
  font-weight: normal;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: 0.2em;
  text-align: center;
  /* opacity: .8; */

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;

  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;

  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: 0.2em;

  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */

  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}

.cash--text--ico,
.cash--text--isgrow {
  font-family: "fontello-cash";
}
.cash--text--ico {
  width: 70px;
}
.cash--text--text {
  width: 150px;
}
.cash--wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(51, 51, 51);
  margin-bottom: 20px;
}
.cash--wrapper h5 {
  font-size: 24px;
}
.cash--text {
  font-size: 44px;
  display: flex;
  align-items: center;
}
.cash--text--isgrow {
  font-size: 20px;
  padding: 0 10px;
}
</style>
