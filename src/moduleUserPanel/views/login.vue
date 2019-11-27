<template>
  <div class="user-panel--login__wrapper">
    <div class="user-panel--login">
      <div class="user-panel--login--input-wrap">
        <label for="login">Логи</label>
        <input type="text" v-model="user.login" id="login">
      </div>
      <div class="user-panel--login--input-wrap">
        <label for="password">Пароль</label>
        <input type="password" v-model="user.password" id="password">
      </div>
      <button @click="logAction">{{(displayName === '') ? `Войти`:`Выйти`}}</button>
      <button @click="showModal">Дабавить пользователя</button>
    </div>
    <!-- ======================== Modal ================================ -->
    <modal :prop="user" v-show="isShowModal" @close="closeModal" @createUser="createUser">
      <template v-slot:header>
        <h2>Создание нового пользовател</h2>
      </template>
      <div class="user-panel--login--input-wrap">
        <label for="displayName">Имя</label>
        <input type="text" v-model="user.displayName" id="displayName">
      </div>
      <div class="user-panel--login--input-wrap">
        <label for="new--login">Логи</label>
        <input type="text" v-model="user.login" id="new--login">
      </div>
      <div class="user-panel--login--input-wrap">
        <label for="new--password">Пароль</label>
        <input type="password" v-model="user.password" id="new--password">
      </div>
      <template v-slot:footer>
        <button @click="createUser">Создать пользователя</button>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        displayName: "",
        login: "",
        password: ""
      }
    };
  },
  computed: {
    authResult() {
      return this.$store.getters.GET_AUTH_RESULT;
    },
    displayName() {
      return this.$store.getters.GET_DISPLAY_NAME;
    }
  },
  methods: {
    logAction() {
      this.displayName === "" ? this.makeLogin() : this.makeLogout();
    },
    makeLogin() {
      this.$store.dispatch("LOGIN", this.user);
    },
    createUser() {
      if (this.user.login === "" || this.user.password === "")
        return this.showAlert("Внимание", "Имя и пароль не могут быть пустыми");
      const result = this.$store.commit("CREATE_USER", this.user);
      this.showAlert("Результат", this.authResult);
    },
    makeLogout() {
      this.$store.dispatch("LOGOUT");
    }
  }
};
</script>
