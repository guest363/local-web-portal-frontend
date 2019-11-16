export default {
    methods: {
        showAlert(header, text) {
            this.$store.commit("SET_ALERT_MSG", {
                header: header,
                text: text
            });
            this.$store.commit("SHOW_ALERT");
            setTimeout(this.closeAlert, 2000);
        },
        closeAlert() {
            this.$store.commit("HIDE_ALERT");
        },
    }
}