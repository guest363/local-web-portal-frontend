<template>
  <div class="big-bro">
    <!-- ======================== Nav ================================ -->
    <bb-nav>
      <button
        class="big-bro--nav--button"
        v-on:click="show = 'mountUSB'"
        v-bind:class="{ 'big-bro--nav--button__active': (show === 'mountUSB') }"
      >
        <i class="fa fa-usb" aria-hidden="true"></i>
      </button>
      <button
        class="big-bro--nav--button"
        v-on:click="show = 'alertUSB'"
        v-bind:class="{ 'big-bro--nav--button__active': (show === 'alertUSB') }"
      >
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
      </button>
      <button
        class="big-bro--nav--button"
        v-on:click="show = 'whiteListUSB'"
        v-bind:class="{ 'big-bro--nav--button__active': (show === 'whiteListUSB') }"
      >
        <i class="fa fa-check-circle" aria-hidden="true"></i>
      </button>
    </bb-nav>
    <!-- ======================== MOUNT ================================ -->
    <mount-table
      :show="show"
      :mountUSBActualList="mountUSBActualList"
      :iconGenerator="iconGenerator"
      :showModal="showModal"
      :usbCount="mountCounter"
    ></mount-table>
    <!-- ======================== Alert ================================ -->
    <alert-table
      @filter="filter($event)"
      @setCurrentPage="setCurrentPage($event)"
      :show="show"
      :pages="pagesAlert"
      :alertUSBList="alertUSBList"
      :iconGenerator="iconGenerator"
      :showModal="showModal"
      :alertChunk="alertChunk"
    ></alert-table>
    <!-- ======================== White ================================ -->
    <white-table
      :show="show"
      :whiteUSBActualList="whiteUSBActualList"
      :usbCount="whiteCounter"
      :iconGenerator="iconGenerator"
      :showModal="showModal"
    ></white-table>
    <!-- ======================== Modal ================================ -->
    <modal :prop="modalProp" v-show="isShowModal" @close="closeModal">
      <template v-slot:header>
        <h2>
          Изменение учетных данных носителя:
          <br>
          <span v-html="iconGenerator(modalProp.usb.product)"></span>
          <span>{{modalProp.usb.serial}} ({{modalProp.usb.USBnameSave}})</span>
        </h2>
      </template>
      <p>Читаемое имя</p>
      <input type="text" v-model="modalProp.usb.serial">
      <p>Регистрационный номер</p>
      <input type="text" v-model="modalProp.usb.regNumber">
      <p>Предписание</p>
      <input type="text" v-model="modalProp.usb.docNumber">
      <p>Находится в белом списке</p>
      <div class="modal--usb--grid--body--radio">
        <label for="yes">Да</label>
        <input type="radio" name="r1" id="yes">
        <label for="no">Нет</label>
        <input type="radio" name="r1" id="no">
      </div>
      <template v-slot:footer>
        <button class="button--del" @click="delPost(modalProp.usb['_id'], show)">Удалить запись</button>
        <button
          class="button--add"
          @click="editPost(modalProp.usb['_id'], show)"
        >Занести новые данные</button>
      </template>
    </modal>
  </div>
</template>

<script>
import iconGenerator from "./icon-generator.js";
import mountTable from "./tables/mount.vue";
import alertTable from "./tables/alert.vue";
import whiteTable from "./tables/white.vue";
import bbNav from "./BBnav.vue";

const bigBrother = {
  name: "bigBrother",
  data() {
    return {
      show: "alertUSB",
      modalProp: {
        usb: {
          serial: "1234212",
          product: "default",
          USBnameSave: "",
          docNumber: ""
        }
      },
      alertChunk: 0,
      filterChunk: "none"
    };
  },
  components: { mountTable, alertTable, whiteTable, bbNav },
  computed: {
    mountUSBActualList() {
      return this.$store.getters.GET_LIST_MOUNT;
    },
    whiteUSBActualList() {
      return this.$store.getters.GET_LIST_WHITE;
    },
    alertUSBList() {
      return this.$store.getters.GET_LIST_ALERT;
    },
    pagesAlert() {
      return this.$store.getters.GET_PAGE_ALERT;
    },
    mountCounter() {
      return this.$store.getters.GET_COUNTER_MOUNT;
    },
    whiteCounter() {
      return this.$store.getters.GET_COUNTER_WHITE;
    }
  },
  methods: {
    setCurrentPage(page) {
      this.alertChunk = page - 1;
      this.$store.dispatch("UPDATE_ALL_LIST", {
        chunk: this.alertChunk,
        filter: this.filterChunk
      });
    },
    filter(option) {
      this.filterChunk = option;
      this.$store.dispatch("UPDATE_ALL_LIST", {
        chunk: this.alertChunk,
        filter: this.filterChunk
      });
    },
    updateTableInfo() {
      this.$store.dispatch("UPDATE_ALL_LIST", {
        chunk: this.alertChunk,
        filter: this.filterChunk
      });
    },
    showModal(usb) {
      const modalDOM = document.querySelector("#modal");
      const yesRadio = document.querySelector("#yes");
      const noRadio = document.querySelector("#no");
      this.isShowModal = true;
      this.modalProp.usb = usb;
      const saveName = this.modalProp.usb.USBnameSave;
      const serial = this.modalProp.usb.serial;
      const inWhiteListSaveName = this.whiteUSBActualList.find(
        item => item.USBnameSave === saveName
      );
      const inWhiteList = inWhiteListSaveName !== void 0;
      inWhiteList
        ? yesRadio.setAttribute("checked", true)
        : noRadio.setAttribute("checked", true);
      if (inWhiteList) {
        this.modalProp.usb.docNumber = inWhiteListSaveName.docNumber;
      }
    },
    editPost() {
      const isInWhite = document.querySelector("#yes").checked;
      if (isInWhite) {
        this.addToWhiteListUSB(this.modalProp.usb);
      } else {
        this.$store.dispatch("DEL_USB", {
          table: "whiteListUSB",
          msg: this.modalProp.usb["_id"]
        });
      }
      this.$store.dispatch("EDIT_USB", this.modalProp.usb);
      this.updateTableInfo();
      this.closeModal();
    },
    iconGenerator(deviceType) {
      return iconGenerator(deviceType);
    },
    addToWhiteListUSB(item) {
      this.$store.dispatch("ADD_TO_WHITE", item);
    },

    delPost(id, dbName) {
      this.$store.dispatch("DEL_USB", {
        table: dbName,
        msg: this.modalProp.usb["_id"]
      });
      this.updateTableInfo();
      this.closeModal();
    }
  },
  created() {
    this.updateTableInfo();
  }
};

export default bigBrother;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../css/pages/bigBrother.less"></style>