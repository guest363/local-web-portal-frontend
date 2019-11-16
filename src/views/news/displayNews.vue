<template functional>
    <div class="news">
        <article
            v-for="news in props.allNews"
            v-bind:key="news['_id']"
            class="news--card news--card__clikabl"
            @click="props.selectNews(news['_id'])"
        >
            <div class="news--card--header">{{news.header}}</div>
            <div class="news--card--content news--card--content__prev">
                <span v-html="news.content"></span>
            </div>
            <div class="news--card--footer">
                <div class="news--card--footer--tag">{{news.tag}}</div>
                <div class="news--card--footer--date">{{news.date}}</div>
            </div>
        </article>
    </div>
</template>
 
