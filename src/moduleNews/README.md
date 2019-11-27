# Модуль новостной ленты
Редактировать и удалять могут только авторизованные пользователи, доступно для любой роли.
Процесс редактирования происходит с помощью графического текстового редактора Quill.

## TODO
* Теги для новостей хранить в базе с возможностью их редактирования

## Как подключить
* Добавить модуль хранилища в VUEX проекта ~/store/index.js
* Добавить в Vue Router маршруты до:
    * ~/views/index.vue - и отображение и редактирование новостей


## Взаимодействие с bakend
Происходит через Store который вызывает методы сети (работает через Socket).

## Как выглядит
### Лента новостей
![Лента новостей](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleNews/assets/readme/news-feed.jpg)

### Просмотр новости
![Просмотр новости](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleNews/assets/readme/news.jpg)

### Редактирование новости
![Просмотр статьи](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleNews/assets/readme/news-edit.jpg)
