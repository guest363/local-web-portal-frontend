<template>
  <div>
    <div class="wiki-edit--wrapper" v-if="showMachine.loaded">
      <articleWiki
        :editPost="editPost"
        :delPost="delPost"
        :wiki="returnedWiki"
        :state="showMachine"
        v-if="showMachine.article"
      ></articleWiki>
      <articleEditing
        :path="$route.params.name"
        :addPost="addPost"
        :state="showMachine"
        v-show="showMachine.quill"
      ></articleEditing>
      <div  v-show="showMachine.quill" class="wiki-edit--placeholder"></div>
      <articleSideNav
        :allTags="returnedTags"
        :selectedTags="newPost.tag"
        :addWikiTag="addWikiTag"
        :state="showMachine"
        :removeWikiTag="removeWikiTag"
      ></articleSideNav>
      <noArticle :context="this" :state="showMachine" v-if="showMachine.newPost"></noArticle>
    </div>
  </div>
</template>

<script>
import articleWiki from "./cards/article.vue";
import articleEditing from "./cards/article-editing.vue";
import articleSideNav from "./cards/article-side-nav.vue";
import noArticle from "./cards/no-article.vue";
import showMachine from "./func/showMachine.js";
import makeQuill from "./func/makeQuill.js";

const wikiAdd = {
  name: "WikiAdd",
  components: { articleWiki, articleEditing, articleSideNav, noArticle },
  data() {
    return {
      showMachine: "",
      newPostContent: "",
      newTag: "",
      newPost: {
        content: "",
        date: "",
        url: "",
        header: "",
        tag: new Set()
      }
    };
  },

  methods: {
    addPost() {
      const noConten = () => {
        alert("Заполните все данные для публикации раздела");
        this.showMachine.editing();
      };
      const hasContent = async () => {
        this.newPost.content = this.newPostContent.root.innerHTML;
        this.newPost.url = this.$route.path;
        this.newPost.date = Date.now();
        this.newPost.header = this.$route.params.name;
        /* Преобразовать Set в Массив */
        this.newPost.tag = [...this.newPost.tag];
        const result = await this.$store.dispatch("ADD_WIKI", this.newPost);
        await this.$store.dispatch("GET_WIKI", this.$route.path);
        alert(result);
        this.hasArticle();
      };

      this.newPostContent.root.innerHTML === "<p><br></p>"
        ? noContent()
        : hasContent();
    },
    delPost: function(id) {
      this.$store.dispatch("DELETE_WIKI", id);
      this.showMachine.opening();
    },
    editPost: function() {
      this.showMachine.editing();
      makeQuill(this, "editor-container");
      this.newPost.content = this.returnedWiki.content;
      this.newPost.header = this.returnedWiki.header;
      this.newPostContent.root.innerHTML = this.newPost.content;
    },
    async addWikiTag(newTag) {
      newTag !== "" ? this.newPost.tag.add(newTag.toUpperCase()) : "";
    },
    removeWikiTag(tag) {
      this.newPost.tag.delete(tag);
    },
    hasArticle() {
      this.showMachine.opening();
      this.returnedWiki.tag =
        this.returnedWiki.tag[0] === void 0
          ? ["Без тега"]
          : this.returnedWiki.tag;
      this.newPost.tag = new Set(this.returnedWiki.tag);
    },
    noArticle() {
      this.showMachine.noArticle();
    }
  },
  computed: {
    returnedWiki() {
      return this.$store.getters.GET_WIKI;
    },
    returnedTags() {
      return this.$store.getters.GET_TAGS;
    }
  },
  async created() {
    this.showMachine = showMachine;
    await this.$store.dispatch("GET_WIKI", this.$route.path);
    this.returnedWiki.content === void 0 ? this.noArticle() : this.hasArticle();
    this.$store.dispatch("GET_TAGS", this.$route.path);
    this.showMachine.loadedFinished();
  },
  beforeDestroy() {
    this.showMachine.closeWiki();
  }
};

export default wikiAdd;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../css/pages/wiki.less"></style>
<style src="../../components/common/quillSnow.css"></style>
