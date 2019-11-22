<template functional>
    <div class="news__one">
        <div class="news--controll">
            <button class="news--controll--button" title="Назад" v-on:click="props.goBack()">Назад</button>
            <button
                class="news--controll--button news--controll--button__del"
                title="Удалить"
                v-on:click="props.delNews(props.news)"
            >Удалить</button>
        </div>
        <article class="news--card news--card__clikabl">
            <div class="news--card--header">
                {{props.news.header}}
                <button
                    class="news--card--header--select"
                    v-on:click="props.editNews(props.news['_id'])"
                >
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
            </div>
            <div class="news--card--content">
                <span v-html="props.news.content"></span>
            </div>
            <div class="news--card--footer">
                <div class="news--card--footer--tag">{{props.news.tag}}</div>
                <div class="news--card--footer--date">{{props.news.date}}</div>
            </div>
        </article>
    </div>
</template>
 
