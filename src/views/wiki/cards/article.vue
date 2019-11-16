<template functional>
    <article class="wiki-edit--card" id="card-content">
        <div class="wiki-edit--card--header">
            {{props.wiki.header}}
            <button
                class="wiki-edit--card--header--select"
                v-on:click="props.state.editButtonClicked()"
            >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
            <div class="wiki-edit--card--button__wraper" v-show="props.state.editButtons">
                <button
                    class="wiki-edit--card--button wiki-edit--card--button__del"
                    v-on:click="props.delPost(props.wiki['_id'])"
                >Удалить</button>
                <button
                    class="wiki-edit--card--button wiki-edit--card--button__edit"
                    v-on:click="props.editPost(props.wiki.url)"
                >Редактировать</button>
                <button class="wiki-edit--card--button" v-on:click="props.state.opening()">Отмена</button>
            </div>
        </div>
        <div class="wiki-edit--card--content" id="content">
            <span v-html="props.wiki.content"></span>
        </div>
        <div class="wiki-edit--card--footer">
            <div class="wiki-edit--card--footer--tags">
                <div
                    class="wiki-edit--card--footer--tags--tag"
                    v-for="tag in props.wiki.tag[0].split(`,`)"
                    v-bind:key="tag"
                >{{tag}}</div>
            </div>
            <div class="wiki-edit--card--footer--date">{{ props.wiki.date}}</div>
        </div>
    </article>
</template>
