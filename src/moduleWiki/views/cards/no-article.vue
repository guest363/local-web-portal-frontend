<template>
  <div class="wiki-edit--card">
    <div>
      <h2 class="wiki-edit--card--header">Запись отсутствует, хотите добавить?</h2>
      <button v-on:click="createQuill">Добавить</button>
      <button v-on:click="$router.push('/wiki')">Отмена</button>
    </div>
  </div>
</template>
<script>
import makeQuill from "../../support/makeQuill.js";

export default {
  props: {
    state: Object,
    context: Object
  },
  methods: {
    createQuill() {
      this.state.editing();
      makeQuill(this.context, "editor-container");
    }
  }
};
</script>
