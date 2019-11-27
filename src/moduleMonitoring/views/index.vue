<template>
  <div class="section">
    <!-- Секция управления -->
    <div class="section--actions">
      <div
        class="section--actions--section"
        v-bind:style="`background-color: var(--wiki--card--newArticle)`"
      >
        <h2>Занести новый хост для мониторинга</h2>
        <div class="section--block">
          <span>IP адрес</span>
          <input
            class="section--block--input"
            type="text"
            zize="16"
            :pattern="ipPattern"
            placeholder="xxx.xxx.xxx.xxx"
            v-model="newHost.ip"
          >
        </div>
        <div class="section--block">
          <span>Имя хоста</span>
          <input class="section--block--input" type="text" zize="50" v-model="newHost.name">
        </div>
        <div class="section--block">
          <span>Тип хоста</span>
          <select name="" id="s1" class="section--block--select" v-model="newHost.hostType">
            <option value="Тонкий клиент">Тонкий клиент</option>
            <option value="Принтер">Принтер</option>
            <option value="МФУ">МФУ</option>
          </select>
        </div>
        <button class="section--actions--button" v-on:click="addNewHost">Добавить</button>
      </div>
    </div>
    <!-- ======================== ПИНГ ================================ -->
    <ip-table :allHosts="allHosts" :imageSrcGen="imageSrcGen" :iconGenerator="iconGenerator"></ip-table>
  </div>
</template>

<script>
import inputPatterns from "../../components/custom-html/inputPatterns.js";
import iconGenerator from "../support/icon-generator.js";
import greenCircle from "../../assets/img/green-circle.png";
import greyCircle from "../../assets/img/grey-circle.png";
import { clearInterval } from "timers";
import ipTable from "./pingTable.vue";

export default {
  name: "monitoring",
  data() {
    return {
      iconGenerator: "",
      ipPattern: "",
      newHost: {
        ip: "",
        name: "",
        hostType: ""
      }
    };
  },
  components: { ipTable },
  computed: {
    allHosts() {
      return this.$store.getters.GET_HOSTS;
    }
  },
  methods: {
    async addNewHost() {
      const result = await this.$store.dispatch("ADD_HOST", this.newHost);
      this.showAlert("Результат", JSON.stringify(result.data));
    },
    imageSrcGen(str) {
      return str ? greenCircle : greyCircle;
    }
  },
  async created() {
    this.ipPattern = inputPatterns("ip");
    this.$store.dispatch("GET_HOSTS");
    this.intervalID = setInterval(this.$store.dispatch("GET_HOSTS"), 180000);
    this.iconGenerator = iconGenerator;
  },
  beforeDestroy() {
    clearTimeout(this.intervalID);
  }
};
</script>


<style src="../css/monitoring.less"></style>