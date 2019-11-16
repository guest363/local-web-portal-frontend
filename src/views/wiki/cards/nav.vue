<template>
  <div>
    <div class="wiki--grid">
      <div
        class="wiki--grid--card"
        v-for="card in cardTemplate"
        v-bind:key="card.title"
        v-bind:style="`background-color: ${card.bgColor}`"
        @click="changeTemplate(card)"
      >
        <h3>{{card.title}}</h3>
        <span>{{card.info}}</span>
        <div class="wiki--grid--card--counter">{{card.counter}}</div>
      </div>
      <!-- WIKI Search -->
      <wikiSearch :tag="searchTags"/>
      <!-- ------------- -->
    </div>
  </div>
</template>

<script>
import cardTemplates from "../cards-template.js";
import wikiSearch from "./search.vue";

export default {
  data() {
    return {
      cardTemplate: 'default',
      searchTags: []
    };
  },
  components: { wikiSearch },
  methods: {
    searchFunc() {
      const query = {
        tag: this.searchTags || "",
        content: ""
      };
      this.$store.dispatch("SEARCHE_WIKI", query);
    },
    changeTemplate(card) {
      this.searchTags = card.tags === "" ? [""] : card.tags;
      if (card.link !== "createNewArticle") {
        card.link === null
          ? this.searchFunc()
          : (this.cardTemplate = cardTemplates[card.link]);
      } else {
        this.$emit("showModal");
      }
      this.recount();
    },
    async articleCounterByTags(tagsArray) {
      return tagsArray === ""
        ? "0"
        : this.$store.dispatch("GET_TAG_COUNT", tagsArray);
    },
    recount() {
      this.cardTemplate.map(async card => {
        card.counter = await this.articleCounterByTags(card.tags);
      });
    }
  },
  computed: {
    tags() {
      return this.$store.getters.GET_TAGS;
    }
  },
  async created() {
    this.$store.dispatch("GET_TAGS", this.$route.path);
    this.cardTemplate = cardTemplates['default'];
    this.recount();
  }
};
</script>
