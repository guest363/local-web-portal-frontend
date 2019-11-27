<template>
  <div v-bind:class="prop.className">
  </div>
</template>


<script>
// ----==== Создает график === -----
// принимает следующие параметры
import bb from "billboard.js";
export default {
  name: "vue-chart",
  data() {
    return {
      line: ""
    };
  },
  mounted() {
    this.makeChart();
  },
  props: ["prop"],
  methods: {
    makeChart() {
      var chart = bb.generate({
        data: this.prop.data.data,
        axis: this.prop.data.axis,
        bindto: `.${this.prop.className}`
      });
    }
  },
};
</script>
<style>

</style>
