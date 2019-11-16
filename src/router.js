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
        component: () => import('./views/wiki/wiki.vue'),
    },
    {
        path: '/news',
        name: 'Новости Центра',
        component: () => import('./views/news/News.vue'),
    },
    {
        path: '/wiki',
        name: 'Локальная Википедия',
        component: () => import('./views/wiki/wiki.vue'),
    },
    {
        path: '/userPanel',
        name: 'Панель пользователя',
        component: () => import('./views/userPanel/userPanel.vue'),
    },
    {
        path: '/wiki/:name',
        name: 'Добаввление новой записи в Википедию',
        component: () => import('./views/wiki/wiki-add.vue'),
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
        component: () => import('./views/bigBrother/bigBrother.vue'),
    }
    ],
});
/* 
router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    let requiresAdmin = to.matched.some(
      (record) => record.meta.accessTo === 'ADMIN',
    );
    const isAdmin = store.getters.getRoles.includes('ADMIN');
    if (requiresAuth) {
      if (requiresAdmin && !isAdmin) {
        next('/');
        return;
      }
      if (authenticated) {
        next();
        return;
      }
      next('/');
    } else {
      next();
    }
  }); */


export default router;

