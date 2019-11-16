<template >
  <button :class="isActiveClass">
    <router-link :to="param.link" :class="(param.inWork) ? 'in-Work' : ''">
      <i :class="param.icon" aria-hidden="true"></i>
      <span>{{param.text}}</span>
    </router-link>
  </button>
</template>
<script>
export default {
  props: {
    param: {
      link: String,
      icon: String,
      text: String,
      inWork: {
        default: false,
        type: Boolean
      }
    },
    currentRoute: ""
  },
  computed: {
    isActiveClass() {
      console.log(this.param.link);
      let result =
        this.currentRoute === `/${this.param.link}`
          ? "nav--list--button__active nav--list--button"
          : "nav--list--button";
      return result;
    }
  },
  methods: {}
};
</script>
