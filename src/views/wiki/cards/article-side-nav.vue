<template>
    <div >
        <side-navi v-if="state.sideNavi" :data="{sourceID: `content`}"></side-navi>
        <div class="edit--tags__wrapper" v-show="!state.sideNavi && !state.newPost">
            <h2>Теги:</h2>
            <input
                class="edit--cloud--tags"
                type="text"
                placeholder="По клавише enter добавить к статье"
                autocomplete="on"
                list="tagList"
                spellcheck="true"
                @keyup.enter="sendNewTag($event.target)"
            >
            <datalist id="tagList">
                <option v-for="item in allTags" v-bind:key="item">{{ item }}</option>
            </datalist>
            <div class="edit--tags">
                <div
                    class="edit--tags--tag"
                    v-for="tag in selectedTags"
                    v-bind:key="tag"
                    @click="removeTag(tag)"
                >{{tag}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import sideNavi from "../../../components/common/makeSideNavi.vue";
export default {
  components: {
    "side-navi": sideNavi
  },
  data() {
    return {
      selected: []
    };
  },
  props: {
    state: Object,
    allTags: Array,
    selectedTags: Set,
    addWikiTag: Function,
    removeWikiTag: Function
  },
  methods: {
    /**
     * Пересоздает свойство selected так как vue не может
     * отслеживать изменения Set
      */
    updateSelected() {
      this.selected = "";
      this.selected = this.selectedTags;
    },
    sendNewTag(newTag) {
      this.addWikiTag(newTag.value);
      newTag.value = "";
      this.updateSelected();
    },
    removeTag(tag) {
      this.removeWikiTag(tag);
      this.updateSelected();
    }
  },
  mounted() {
    this.updateSelected();
  }
};
</script>
