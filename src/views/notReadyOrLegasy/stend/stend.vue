<template>

    <div class="stend flex-center">
      
      <div class="edit">
        <div class="edit--button--wrapper">
          <button v-on:click="preparePost('Текст новости')" class="edit--button-add-New" v-show="!quillShow" title="Добавить новую запись"> <i class="fa fa-plus" aria-hidden="true"> Новость</i></button>
          <button  class="edit--button-post" title="Опубликовать" v-show="quillShow" v-on:click="addPost">Опубликовать</i></i></button>
        </div>
        <div  v-show="quillShow">
          <div> <input type="text" placeholder="Заголовок новости" class="edit--input-header" v-model="newPost.header"> </div>
          <div id='editor-container' class= "card" v-show="quillShow"></div>
          <div class="edit--tags">
              <select v-model="newPost.tag">
                <option v-for="option in this.$store.state.tags">
                  {{ option }}
                </option>
              </select>
          </div>
        </div>
      </div>

      <div class="edit">
        <div class="edit--button--wrapper">
          <button v-on:click="showModal()" class="edit--button-add-New" v-show="!quillShow" title="Режим презинтации">Перейти в режим презинтации</button>
        </div>
      </div>

    <modal-slider :prop="modal">
    </modal-slider>

      
      <br>

     <!--  Отображение новостей
         <div v-for='item in returndNews'>
        <article class="card">
          <div class="card--header">{{item.header}} 
            <button class="card--header--select" v-on:click="showingEdit()" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <div class="card--button__wraper" v-show="showEdit">
            <button class="card--button card--button__del" v-on:click="delPost(item['_id'])">Удалить</button>
            <button class="card--button card--button__edit" v-on:click="editPost(item['_id'])">Редактировать</button>
          </div>
        </div>
          <div class="card--content"><span v-html="item.content"></span></div>
          <div class="card--footer">
            <div class="card--footer--tag">{{item.tag}}</div>
            <div class="card--footer--date">{{item.date}}</div>
            <div class="card--footer--author">{{item.author}}</div>
          </div>
        </article>
      </div>
     -->
  </div>
</template>

<script>
import Modal from "./reuse/modal-stend.vue";
import Quill from "quill";
require("../../components/common/quillSnow.css");

const stend = {
  name: "Stend",
  data() {
    return {
      quillShow: false,
      isEditCreate: false,
      newPostContent: "",
      newPost: {},
      showEdit: false,
      returndNews: '',
      dateOpt: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      modal: {
        news: '',
        img: ""
      }
    };
  },
  computed: {
  },
  components: {
    "modal-slider": Modal
  },
  methods: {
    preparePost: function(state) {
      this.quillShow = true;
      const makeEdit = elem => {
        const container = document.getElementById(elem);
        const toolbarOptions = {
          container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "color", "underline"],
            ["blockquote", "align", "formula"],
            ["image", "video", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"]
          ]
        };
        const editor = new Quill(container, {
          modules: {
            toolbar: toolbarOptions
          },
          placeholder: state,
          theme: "snow"
        });
        return editor;
      };
      // ql-toolbar
      if (this.isEditCreate === false) {
        this.newPostContent = makeEdit("editor-container"); // Передаем обьект editor
        // из которого в дальнейшем будем извлекать текс поста
        // через замыкания он доступен глобально
        //this.newPostContent2 = makeEdit('editor-container-2'); // ????
        this.isEditCreate = true;
      }
    },
    addPost: function() {
      this.quillShow = false;
      let allData = false;
      this.newPost.content = this.newPostContent.root.innerHTML;
      this.newPost.date = new Date().toLocaleString("ru", this.dateOpt);
      this.newPost.author = this.$store.state.user; // this.$store.getters.getName; геттеры вызываются так
      if (
        this.newPostContent.root.innerHTML === "<p><br></p>" ||
        this.newPost.header === undefined ||
        this.newPost.tag === undefined
      ) {
        alert("Заполните все данные для публикации новости");
      } else {
        this.$socket.emit("addPost", [this.newPost, "news"]);
        alert("Новость добавлена");
      }
      this.showEdit = false;
    },
    delPost: function(id) {
      console.log(id);
      this.$socket.emit("delPost", [id, "news"]);
      this.$store.commit("delNews", id);
      this.showEdit = false;
    },
    editPost: function(id) {
      this.$socket.emit("getPost", [id, "news"]);
      this.preparePost("Загрузка содержимого...");
      setTimeout(() => {
        this.newPost.content = this.$store.state.returnNews[0].content;
        this.newPost["_id"] = this.$store.state.returnNews[0]["_id"];
        this.newPost.header = this.$store.state.returnNews[0].header;
        this.newPost.tag = this.$store.state.returnNews[0].tag;
        this.newPostContent.root.innerHTML = this.newPost.content;
        this.showEdit = false;
      }, 2000);
    },
    showingEdit: function() {
      this.showEdit = !this.showEdit;
    },
    showModal() {
      document.getElementById("modal-slider").style.display = "flex";
    }
  },
  mounted(){
      this.returndNews = this.$store.getters.getNews.reverse();
      this.modal.news = this.returndNews;
  }
};

export default stend;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./stend.css"></style>