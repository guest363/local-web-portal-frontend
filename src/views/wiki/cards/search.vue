/* Отвечает только за отобраджение окна поиска */
<template>
  <div class="wiki--search">
    <input
      placeholder="Поиск в Википедии"
      class="wiki--search--input"
      @keyup.enter="search()"
      v-model="content"
    >
    <button class="wiki--search--button" v-on:click="search()">
      <i class="fa fa-search" aria-hidden="true"></i>
    </button>
    <!-- С текущей скоростью поиска он не нужен-->
    <!-- Лоадер -->
    <!--         <div class="loading-spinner">
            <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-show="loader"></i>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  props: {
    tag: {
      default: [''],
      type: Array
    }
  },
  methods: {
    search() {
      const query = {
        tag: this.tag,
        content: this.content
      };
      this.$store.dispatch("SEARCHE_WIKI", query);
    }
  }
};
</script>
