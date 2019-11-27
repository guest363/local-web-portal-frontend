<template>
  <div>
    <canvas
      height="315"
      width="315"
      :id="`target${randomID}`"
    >Браузер не поддерживает canvas, обновитесь</canvas>
  </div>
</template>

<script>
import targetBase64ForResults from "../assets/img/target4-forResults.jpg";
import holeBase64 from "../assets/img/shootSmall.png";

export default {
  name: "shootTargetForResult",
  props: {
    shootsArray: {
      default: []
    }
  },
  data() {
    return {
      rundomID: "",
      ctx: ""
    };
  },
  watch: {
    shootsArray() {
      this.setShoots();
    }
  },
  methods: {
    canva() {
      const img = new Image();
      img.src = targetBase64ForResults;
      img.onload = () => {
        // Событие onLoad, ждём момента пока загрузится изображение
        this.ctx.drawImage(img, 0, 0); // Рисуем изображение от точки с координатами 0, 0
        /* Если данные сразу передаются а не в модальном окне */
        /*   console.log(Array.isArray(this.shootsArray)); */
        if (Array.isArray(this.shootsArray) || this.shootsArray !== "") {
          this.setShoots();
        }
      };
    },
    setShoots() {
      /*       console.log("draw"); */
      const drawHole = coord => {
        const x = coord[0] / 2;
        const y = coord[1] / 2;
        const img = new Image();
        img.src = holeBase64;
        img.onload = () => {
          // Событие onLoad, ждём момента пока загрузится изображение
          this.ctx.drawImage(img, x - 6, y - 7);
          // Рисуем изображение от точки с координатами, минусы чтобы
          // центр выстрела совпадал с центров клика
        };
      };
      this.shootsArray.forEach(coord => {
        drawHole(coord);
      });
    }
  },
  beforeMount() {
    this.randomID = Math.random();
  },
  mounted() {
    const target = document.getElementById(`target${this.randomID}`);
    this.ctx = target.getContext("2d");
    this.canva();
  }
};
</script>