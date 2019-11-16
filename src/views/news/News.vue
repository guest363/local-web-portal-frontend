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
      <display-select-news :delNews="delNews" :news="editingNews" :editNews="editNews" :goBack="goStartShowState"></display-select-news>
    </div>
    <!-- ======================== Show All News ================================ -->
    <div v-show="showMachine.articles">
      <display-all-news :allNews="allNews" :selectNews="selectNews"></display-all-news>
    </div>
  </div>
</template>

<script>
import showMachine from "./func/showMachine.js";
import makeQuill from "./func/makeQuill.js";

import displayAllNews from "./displayNews.vue";
import displaySelectNews from "./displaySelectNews.vue";
import editNews from "./editNews.vue";

import dateOpt from "../../localStore/support/dateOpt.js";

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
    showAlert(header, text) {
      this.$store.commit("SET_ALERT_MSG", {
        header: header,
        text: text
      });
      this.$store.commit("SHOW_ALERT");
      setTimeout(this.closeAlert, 2000);
    },
    closeAlert() {
      this.$store.commit("HIDE_ALERT");
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
      this.showMachine.opening();
    },
    selectNews(id) {
      this.getSelectedNews(id);
      this.showMachine.selectArticle();
    },
    addNews: function() {
      this.newPost.content = this.newPostContent.root.innerHTML;
      this.newPost.date = new Date();
      this.newPost.author = this.$store.state.user; // this.$store.getters.getName; геттеры вызываются так
      if (
        this.newPostContent.root.innerHTML === "<p><br></p>" ||
        this.newPost.header === void 0 ||
        this.newPost.tag === void 0
      ) {
        this.showAlert("Ошибка", "Заполните все данные для публикации новости");
      } else {
        this.$store.dispatch("ADD_NEWS", this.newPost);
        this.showAlert("Результат", "Новость добавлена");
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