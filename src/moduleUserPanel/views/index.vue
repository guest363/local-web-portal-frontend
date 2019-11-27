<template>
  <div class="user-panel">
    <div class="user-panel--grid">
      <persons/>
    </div>
    <login/>
  </div>
</template>

<script>
import login from "./login.vue";
import persons from "./persons.vue";
export default {
  components: { login, persons },
  name: "userPanel",

  created() {}
};
</script>

<style src="../css/userPanel.less"></style>
