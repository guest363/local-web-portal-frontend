import Vue from "vue";
import Vuex from "vuex";

import usb from '../moduleUSB/store/index';
import wiki from '../moduleWiki/store/index';
import monitoring from '../moduleMonitoring/store/index.js';
import shoot from '../moduleShoot/store/index';
import persone from '../moduleUserPanel/store/index.js';
import news from '../moduleNews/store/index';
import alert from './modules/alert';
import auth from './modules/auth/index';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    portalName: 'Компания'
  },
  mutations: {
    add(state, data) {
      state.message.push(data);
    },

    addWikiTag(state, data) {
      state.wikiTag.push(data);
    }

  },
  getters: {
    getPortalName(state){
      return state.portalName;
    }
  },
  modules: {
    usb,
    wiki,
    monitoring,
    shoot,
    persone,
    news,
    alert,
    auth
  }
});

export default store;
