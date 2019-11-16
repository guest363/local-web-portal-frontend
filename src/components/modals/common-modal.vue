<template>
  <transition name="modal">
    <div
      class="modal--mask modal"
      @keyup.esc="closeModalCommon($event)"
      @click="closeModalOnMask($event.target)"
      :id="id"
    >
      <div class="modal--wrapper">
        <div class="modal--grid">
          <div class="modal--header">
            <div class="modal--header__close" @click="close()">
              <i class="fa fa-close" aria-hidden="true"></i>
            </div>
            <slot name="header"></slot>
            <div class="line"></div>
          </div>
          <div class="modal--body">
            <slot></slot>
          </div>
          <div class="modal--footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* За отображаемость компонента модальное окно отвечает его родитель
   Компонент только эмитит событие close, родитель слушает событие @close="closeModal" */
const modal = {
  props: {
    id: {
      type: String,
      default: `modal`
    }
  },
  methods: {
    closeModalCommon(e) {
      if (e.keyCode === 27) {
        this.close();
      } else return;
    },
    closeModalOnMask(target) {
      target.id === `${this.id}` ? this.close() : "";
    },
    close() {
      this.$emit("close");
    }
  }
};

export default modal;
</script>
