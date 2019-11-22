<template functional>
    <div>
        <div class="news--controll">
            <button class="news--controll--button" title="Назад" v-on:click="props.goBack()">Назад</button>
        </div>
        <div>
            <input
                type="text"
                placeholder="Заголовок новости"
                class="news--controll--edit--input-header"
                :value="props.newPost.header"
                @change="listeners.changeHeader($event)"
            >
        </div>
        <div id="editor-container" ref="quill" class="news--controll--card"></div>
        <div class="news--controll--edit--tags">
            <select :value="props.newPost.tag" @change="listeners.changeTag($event)">
                <option v-for="tag in props.allTags" v-bind:key="tag">{{ tag }}</option>
            </select>
        </div>
        <button
            class="news--controll--edit--button-post"
            title="Опубликовать"
            v-on:click="props.addNews()"
            
        >Опубликовать</button>
    </div>
</template>
 
