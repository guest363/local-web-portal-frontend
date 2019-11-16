<template >
  <nav class="nav">
    <router-link to="/">
      <div class="nav--logo">
        <img class="nav--logo--img" src="../../assets/img/logo.png" alt="" srcset="">
        <h5 class="nav--logo--text">{{portalName}}
        </h5>
      </div>
    </router-link>
    <ul class="nav--list">
      <li v-for="item in menuElements" :key="item.text" @click="setNewRoute(item)">
        <menu-list-item :param="item" :currentRoute="currentRoute"></menu-list-item>
      </li>
    </ul>
  </nav>
</template>
<script>
import menuElements from "./mainNaviElements.js";
import menuListItem from "./mainNaviListItem.vue";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      menuElements: "",
      currentRoute: ""
    };
  },
  components: { menuListItem },
  computed: {
    hasRights() {
      return this.$store.getters.getAuthRights === "admin" ? true : false;
    },
    auth() {
      return this.$store.getters.getAuth;
    },
     portalName() {
      return this.$store.getters.getPortalName;
    }
  },
  methods: {
    setNewRoute(route) {
      this.$router.push({ path: `/${route.link}` });
    }
  },
  created() {
    this.menuElements = menuElements;
    this.currentRoute = this.$router.currentRoute.path;
  }
};
</script>
