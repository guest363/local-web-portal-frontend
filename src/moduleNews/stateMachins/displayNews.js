export default {
    quill: false,
    articles: false,
    selectedArticle: false,
    noArticle: false,
    stateSetter: function (quill, articles, selectedArticle, noArticle = false) {
        this.quill = quill;
        this.articles = articles;
        this.selectedArticle = selectedArticle;
        this.noArticle = noArticle;
    },
    noArticle: function () {
        this.stateSetter(false, false, false, true);
        return this;
    },
    opening: function () {
        this.stateSetter(false, true, false);
        return this;
    },
    selectArticle: function () {
        this.stateSetter(false, false, true);
        return this;
    },
    editButtonClicked: function () {
        this.stateSetter(true, false, false);
        return this;
    }
};