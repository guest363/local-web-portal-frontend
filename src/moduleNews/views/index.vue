<template>
  <div class="news--wrapper">
    <!-- ======================== Controlls  ================================ -->
    <button v-on:click="preparePost" class="news--new-post-button" title="Добавить новость">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
    <h1 v-show="showMachine.noArticle">Новостей нет</h1>
    <!-- ======================== Show Edit News ================================ -->
    <div v-show="showMachine.quill">
      <edit-news
        :newPost="newPost"
        :addNews="addNews"
        @changeHeader="changeHeader"
        @changeTag="changeTag"
        :allTags="allTags"
        :goBack="goStartShowState"
      ></edit-news>
    </div>
    <!-- ======================== Show Select News ================================ -->
    <div v-show="showMachine.selectedArticle">
      <display-select-news
        :delNews="delNews"
        :news="editingNews"
        :editNews="editNews"
        :goBack="goStartShowState"
      ></display-select-news>
    </div>
    <!-- ======================== Show All News ================================ -->
    <div v-show="showMachine.articles">
      <display-all-news :allNews="allNews" :selectNews="selectNews"></display-all-news>
    </div>
  </div>
</template>

<script>
import showMachine from "../stateMachins/displayNews.js";
import makeQuill from "../support/makeQuill.js";

import displayAllNews from "./displayNews.vue";
import displaySelectNews from "./displaySelectNews.vue";
import editNews from "./editNews.vue";

import dateOpt from "../support/dateOpt.js";

const news = {
  name: "News",
  data() {
    return {
      showMachine: "",
      newPostContent: "",
      newPost: {}
    };
  },
  components: { displayAllNews, displaySelectNews, editNews },
  computed: {
    allNews: function() {
      return this.$store.getters.GET_ALL_NEWS;
    },
    allTags: function() {
      return this.$store.getters.GET_NEWS_TAGS;
    },
    editingNews: function() {
      return this.$store.getters.GET_EDIT_NEWS;
    },
    postResult: function() {
      if (this.$store.getters.GET_POST_RESULT_NEWS !== "") {
        this.showAlert("Результат", this.$store.getters.GET_POST_RESULT_NEWS);
        this.$store.commit("RESET_POST_RESULT");
      }
    }
  },
  methods: {
    changeHeader(header) {
      this.newPost.header = header.target.value;
    },
    changeTag(tag) {
      this.newPost.tag = tag.target.value;
    },
    preparePost() {
      this.showMachine.editButtonClicked();
      makeQuill(this, "editor-container");
    },
    getSelectedNews(id) {
      this.$store.dispatch("GET_NEWS", id);
      this.newPost = this.editingNews;
    },
    goStartShowState() {
      this.$refs.quill.innerHTML = "";
      const qlTollbar = document.querySelector(".ql-toolbar");
      qlTollbar ? qlTollbar.remove() : '';
      this.showMachine.opening();
    },
    selectNews(id) {
      this.getSelectedNews(id);
      this.showMachine.selectArticle();
    },
    addNews: function() {
      this.newPost.content = this.newPostContent.root.innerHTML;
      this.newPost.date = Date.now();
      this.newPost.author = this.$store.state.user;
      if (
        this.newPostContent.root.innerHTML === "<p><br></p>" ||
        this.newPost.header === void 0 ||
        this.newPost.tag === void 0
      ) {
        this.showAlert("Ошибка", "Заполните все данные для публикации новости");
      } else {
        this.$store.dispatch("ADD_NEWS", this.newPost);
      }
      this.showMachine.opening();
    },
    delNews: function(news) {
      this.$store.dispatch("DEL_NEWS", news);
      this.showMachine.opening();
    },
    editNews(id) {
      this.showMachine.editButtonClicked();
      this.getSelectedNews(id);
      this.preparePost();
      this.newPostContent.root.innerHTML = this.editingNews.content;
    }
  },
  created() {
    this.dateOpt = dateOpt;
    this.showMachine = showMachine;
    this.showMachine.opening();
    this.$store.dispatch("GET_ALL_NEWS");
  }
};

export default news;
</script>

<style src="../css/news.less"></style>