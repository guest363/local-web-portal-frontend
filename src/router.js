/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import store from './localStore/store.js';

Vue.use(Router);

const router = new Router({
   /*  mode: 'history', */
    routes: [{
        path: '/',
        name: 'Главная страница портала',
        component: () => import('./moduleWiki/views/index.vue'),
    },
    {
        path: '/news',
        name: 'Новости Центра',
        component: () => import('./moduleNews/views/index.vue'),
    },
    {
        path: '/wiki',
        name: 'Локальная Википедия',
        component: () => import('./moduleWiki/views/index.vue'),
    },
    {
        path: '/userPanel',
        name: 'Панель пользователя',
        component: () => import('./views/userPanel/userPanel.vue'),
    },
    {
        path: '/wiki/:name',
        name: 'Добаввление новой записи в Википедию',
        component: () => import('./moduleWiki/views/wiki-add.vue'),
    },
    {
        path: '/shoot',
        name: 'Контроль стрельб',
        component: () => import('./views/shoot/Shoot.vue'),
    },
    {
        path: '/monitoring',
        name: 'Администрирование сети ЗЛВС',
        component: () => import('./views/monitoring/monitoring.vue'),
    },
    {
        path: '/bigbrother',
        name: 'Большой брат',
        component: () => import('./moduleUSB/views/index.vue'),
    }
    ],
});

export default router;

