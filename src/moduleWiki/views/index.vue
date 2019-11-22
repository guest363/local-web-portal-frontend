<template>
  <div class="wiki">
    <!-- Навигация и поиск -->
    <wikiNav @showModal="showModal"/>
    <!-- Результаты поиска, по умолчанию последняя статья -->
    <div v-show="wikiSearchResult[0] !== void 0">
      <h2 class="wiki--posts--header">Результаты поиска:</h2>
      <div class="wiki--grid--2col">
        <div v-for="wiki in wikiSearchResult" v-bind:key="wiki.id">
          <wikiArticlePre :wiki="wiki" :onclick="goToWiki"/>
        </div>
      </div>
    </div>
    <!-- Modal Add new Article -->
    <modal :id="`wiki-add`" @close="closeModal" v-show="isShowModal">
      <template v-slot:header>
        <h2>Начальная настройка статьи:</h2>
      </template>
      <p>
        Название статьи, имя должно быть уникальным. В случае
        совпадения имени с имеющейся статьей вы попадете на странице ее редактирования.
      </p>
      <input class="modal--input" type="text" v-model="url">
      <template v-slot:footer>
        <button class="button--add" @click="goToWiki(url)">Создать</button>
      </template>
    </modal>
    <!-- <custom-alert v-show="showWikiAdd" :text="`text`"/> -->
  </div>
</template>

<script>
import wikiArticlePre from "./cards/article-pre.vue";
import wikiNav from "./cards/nav.vue";

const wiki = {
  name: "Wiki",
  data() {
    return {
      url: ""
    };
  },
  components: { wikiArticlePre, wikiNav },
  computed: {
    wikiSearchResult() {
      return this.$store.getters.GET_SEARCHE_RESULT;
    }
  },
  methods: {
    goToWiki(url) {
      this.$router.replace({ path: `wiki/${url}` });
    },
  }
};

export default wiki;
</script>

<style src="../css/wiki.less"></style>
