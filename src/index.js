
import Vue from "vue";
import App from './App.vue';
import router from './router.js';
import store from './localStore/store.js';
import VueSocketio from 'vue-socket.io';
import { socket } from './constants.js';

Vue.use(new VueSocketio({
  connection: socket,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

/* api для взаиможействия с backend rest */
import backend from './backend/context.js';
Vue.use(backend);

/* Свои компоненты с глобальной регистрацией */
import customAlert from './components/modals/custom-alert.vue';
import modal from './components/modals/common-modal.vue';

Vue.component('custom-alert', customAlert);
Vue.component('modal', modal);

Vue.config.productionTip = false;
/* eslint-disable no-new */
/* Глобальные миксины */
import modalMixin from './mixins/modal';
import alertMixin from './mixins/alert';
Vue.mixin(modalMixin);
Vue.mixin(alertMixin);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    notification: function (objFromServer) {
      Notification.requestPermission(perm => {
        new Notification(objFromServer.username, {
          body: objFromServer.message
        });
      });
    }
  },
});
