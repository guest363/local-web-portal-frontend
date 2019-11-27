<template>
    <div class="user-panel--persons">
        <h1 class="user-panel--persons--header h3">Кадровый состав:</h1>
        <table class="user-panel--persons--table">
            <tbody>
                <tr>
                    <th>Фото</th>
                    <th>ФИО</th>
                    <th>Подразделение</th>
                    <th>День рождения</th>
                </tr>
                <tr
                    class="big-bro--list"
                    v-for="man in persons"
                    :key="man['_id']"
                    @click="showModal(man)"
                >
                    <td><img class="user-panel--persons--table--avatar" :src="getPhoto(man.photo)"></td>
                    <td>{{ man.fio }}</td>
                    <td>{{ man.squad }}</td>
                    <td>{{new Date(man.date).toLocaleString("ru")}}</td>
                </tr>
            </tbody>
        </table>
        <button @click="showModal(person)">Дабавить пользователя</button>
        <!-- ======================== Modal ================================ -->
        <modal :prop="person" v-show="isShowModal" @close="closeModal">
            <template v-slot:header>
                <h2><img class="user-panel--persons--table--avatar" :src="getPhoto(person.photo)">   Изменение данных человека:</h2>
            </template>
            <p>Фотография</p>
            <dnd @dropThumbnail="setPhoto" />
            <p>ФИО</p>
            <input type="text" v-model="person.fio">
            <p>Подразделение</p>
            <input type="text" v-model="person.squad">
            <p>Дата рождения</p>
            <input type="date" v-model="person.date">
            <template v-slot:footer>
                <button class="button--del" @click="delPost()">Удалить запись</button>
                <button class="button--add" @click="editPost()">Занести новые данные</button>
            </template>
        </modal>
    </div>
</template>
<script>
import dnd from "../../components/dnd.vue";
const defaultPhoto = require('../../assets/img/avatar.jpg')
export default {
  data() {
    return {
      person: {
        fio: "",
        squad: "",
        photo: undefined,
        birthDay: ""
      }
    };
  },
  components: {dnd},
  computed: {
    persons() {
      return this.$store.getters.GET_PERSONS;
    }
  },
  methods: {
    delPost() {
      this.$store.dispatch("DELETE_PERSON", this.person["_id"]);
      this.closeModal();
    },
    editPost() {
      this.$store.dispatch("ADD_PERSON", this.person);
      this.closeModal();
    },
    setPhoto(base64) {
      this.person.photo = base64;
    },
    getPhoto(base64){
      return base64 === void 0 ? defaultPhoto :`data:imange/jpeg;base64, ${base64}`;
    },
  }
};
</script>
