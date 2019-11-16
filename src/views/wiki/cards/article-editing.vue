<template>
  <div class="wiki-edit--card">
    <div class="edit">
      <div class="edit---wrapper">
        <div>
          <h2 class="edit--input-header">Запись будет называться - " {{ $route.params.name }} "</h2>
        </div>
        <div id="editor-container" class="card"></div>
        <div class="edit--button--wrapper">
          <button
            class="edit--button-post button--del"
            title="Отмена"
            v-on:click="state.opening()"
          >Отмена</button>
          <button
            class="edit--button-post button--add"
            title="Опубликовать"
            v-on:click="addPost"
          >Опубликовать</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    state: Object,
    addPost: Function
  }
};
</script>
