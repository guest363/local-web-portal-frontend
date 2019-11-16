<template>
  <div id="app">
    <div class="header">
      <router-link to="/userPanel">
        <div class="header--user-panel">
          <i class="header--user-panel-icon fa fa-user-circle-o" aria-hidden="true"></i>
          <span>{{displayName}}</span>
        </div>
      </router-link>
    </div>
    <main class="main">
      <transition name="fade--page" tag="div" mode="out-in">
        <router-view/>
      </transition>
    </main>
    <!-- Основная навигационная панель -->
    <main-navi/>
    <custom-alert></custom-alert>
  </div>
</template>

<script>
import mainNavi from "./components/navi/mainNavi.vue";
const App = {
  name: "App",
  components: { mainNavi },
  computed: {
    displayName() {
      return this.$store.getters.GET_DISPLAY_NAME;
    }
  },
  beforeMount() {
    /* Инициализация vuex нужными данными */
    this.$store.commit("INIT_USER_FROM_LOCAL_STORAGE");
    this.$store.dispatch("INIT_PERSON_FROM_SERVER");
  }
};
export default App;
</script>

<style src="./css/imports-main.less">
</style>