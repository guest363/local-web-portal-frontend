export default {
    editButtons: false,
    quill: false,
    addBlock: false,
    sideNavi: false,
    article: false,
    newPost: false,
    loaded: false,
    /**
     * 
     * @param {Boolean} editButtons 
     * @param {Boolean} quill 
     * @param {Boolean} addBlock 
     * @param {Boolean} sideNavi 
     * @param {Boolean} article 
     * @param {Boolean} newPost 
     */
    stateSetter: function (editButtons, quill, addBlock, sideNavi, article, newPost = false) {
        this.editButtons = editButtons;
        this.quill = quill;
        this.addBlock = addBlock;
        this.sideNavi = sideNavi;
        this.article = article;
        this.newPost = newPost;
    },
    noArticle: function () {
        this.stateSetter(false, false, false, false, false, true);
        return this;
    },
    opening: function () {
        this.stateSetter(false, false, false, true, true);
        return this;
    },
    editing: function () {
        this.stateSetter(false, true, false, false, false);
        return this;
    },
    editButtonClicked: function () {
        this.stateSetter(true, false, false, true, true);
        return this;
    },
    loadedFinished() {
        this.loaded = true;
        return this;
    },
    closeWiki(){
        this.loaded = false;
        return this;
    }
};