<template>
  <transition name="modal">
    <div
      v-show="$store.getters.GET_ALERT_SHOW"
      class="custom-alert"
      id="customAlert"
      @click="close"
    >
      <div class="custom-alert--window-decor">
        <div class="custom-alert--window-decor--one"></div>
        <div class="custom-alert--window-decor--two"></div>
        <div class="custom-alert--window-decor--three"></div>
        <div class="custom-alert--window-decor--four"></div>
        <div class="custom-alert--window-decor--five"></div>
      </div>
      <div class="custom-alert--body">
        <h2>{{$store.getters.GET_ALERT_HEADER}}</h2>
        <p>{{$store.getters.GET_ALERT_TEXT}}</p>
      </div>
    </div>
  </transition>
</template>
 
<script>
export default {
  methods: {
    close() {
      this.$store.commit("HIDE_ALERT");
    }
  }
};
</script>
