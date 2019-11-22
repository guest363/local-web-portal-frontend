<template functional>
    <article
        class="wiki-edit--card wiki-edit--card__clikabl"
        @click="props.onclick(props.wiki.url)"
    >
        <div class="wiki-edit--card--header">{{props.wiki.header}}</div>
        <div class="wiki-edit--card--content">
            <span v-html="props.wiki.content.substring(0,500)"></span>
        </div>
        <div class="wiki-edit--card--footer">
            <div class="wiki-edit--card--footer--date">Дата изменения:{{ props.wiki.date}}</div>
        </div>
    </article>
</template>
<script>
