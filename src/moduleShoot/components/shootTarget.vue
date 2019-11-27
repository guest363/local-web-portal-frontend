<template>
    <div>
        <canvas
            height="630"
            width="630"
            id="target"
            v-on:click="setShoot"
        >Браузер не поддерживает canvas, обновитесь</canvas>
        <!-- v-bind:height="data.height" v-bind:width='data.width' -->
    </div>
</template>

<script>
import targetBase64 from "../assets/img/target4.jpg";
import holeBase64 from "../support/holeBase64.js";

export default {
  name: "shootTarget",
  props: ["data"],
  data() {
    return {
      shoot: {
        count: 0,
        values: [],
        sum: "",
        mark: "",
        x: [],
        y: []
      }
    };
  },
  computed: {},
  methods: {
    canva: function() {
      const target = document.getElementById("target");
      const ctx = target.getContext("2d");
      const img = new Image();
      img.src = targetBase64;
      img.onload = function() {
        // Событие onLoad, ждём момента пока загрузится изображение
        ctx.drawImage(img, 0, 0); // Рисуем изображение от точки с координатами 0, 0
      };
    },
    getShooValue(x, y) {
      const validator = (x, y, r) => {
        return (x - 315) ** 2 + (y - 315) ** 2 <= r ** 2 ? true : false;
        // Попадание имеет координаты (x, y), центр круга (X1, Y1), радиус круга R
        // Тогда формула для рассчета попадания точки в круг ((x - X1)^2 + (y - Y1)^2) <= R^2
      };

      if (((x < 183 || x > 453) && y < 228) || y > 603 || x < 24 || x > 610) {
        // белые граници мишени
        return 0;
      } else if (validator(x, y, 60)) {
        return 10;
      } else if (validator(x, y, 120)) {
        return 9;
      } else if (validator(x, y, 180)) {
        return 8;
      } else if (validator(x, y, 238)) {
        return 7;
      } else if (validator(x, y, 298)) {
        return 6;
      } else return 5;
    },
    result(values) {
      const sum = values.reduce((acc, item) => acc + item);
      const max = this.data.maxCount * 10;
      const percent = (sum / max) * 100;
      switch (this.data.exercise) {
        case "1":
          return percent < 60 ? 2 : percent < 70 ? 3 : percent < 83 ? 4 : 5;
          break;
        case "3":
          return percent < 65 ? 2 : percent < 75 ? 3 : percent < 85 ? 4 : 5;
          break;
        default:
          return percent < 60 ? 2 : percent < 70 ? 3 : percent < 80 ? 4 : 5;
          break;
          break;
      }
    },
    sumOfShoots(values) {
      return values.reduce((acc, item) => acc + item);
    },
    setShoot() {
      if (this.data.maxCount === this.shoot.count) {
        this.$emit("shootResult", this.shoot);
      } else {
        const c = document.getElementById("target");
        const ctx = c.getContext("2d");
        const x = event.layerX;
        const y = event.layerY;
        this.shoot.x.push(x);
        this.shoot.y.push(y);
        this.shoot.values.push(this.getShooValue(x, y));
        this.shoot.mark = this.result(this.shoot.values);
        this.shoot.sum = this.sumOfShoots(this.shoot.values);
        this.shoot.count = this.shoot.count + 1;
        this.$emit("shoot", this.shoot);
        const img = new Image();
        img.src = holeBase64;
        img.onload = () => {
          // Событие onLoad, ждём момента пока загрузится изображение
          ctx.drawImage(img, x - 9, y - 11);
          // Рисуем изображение от точки с координатами, минусы чтобы
          // центр выстрела совпадал с центров клика
        };
      }
    }
  },
  mounted() {
       this.canva();
  }
};
</script>