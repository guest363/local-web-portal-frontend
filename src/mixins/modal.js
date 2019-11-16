export default {
    data() {
        return {
            isShowModal: false
        }
    },
    methods: {
        showModal() {
            this.isShowModal = true;
        },
        closeModal() {
            this.isShowModal = false;
        },
    }
}