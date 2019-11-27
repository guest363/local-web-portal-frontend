# Модуль Википедии
Хранилище знаний. 
Редактировать и удалять могут только авторизованные пользователи, доступно для любой роли.
Процесс редактирования происходит с помощью графического текстового редактора Quill.

## TODO
* Канбан доска для редактирования способа организации статей. Сейчас это сделано крайне плохо через обьект js который в файле cards-template. И сама структура должна храниться в базе.
* Отказаться, по возможности, от взаимодействия через свойства компонентов в пользу общения через хранилище.

## Как подключить
* Добавить модуль хранилища в VUEX проекта ~/store/index.js
* Добавить в Vue Router маршруты до:
    * ~/views/index.vue - общая раскладка каталога
    * ~/views/wiki-add.vue - отображение одной статьи

При этом модуль зависит от файла /src/backendContext.js где заданы общие заголовки для инструмента общения по сети (выбран axios) и функция отлова ошибок tryCatchFunctionAxios.

## Взаимодействие с bakend
Происходит через Store который вызывает методы сети (работает через HTTP).

## Как выглядит
### Каталог статей
![Каталог статей](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleWiki/assets/readme/wiki-catalog.jpg)

### Предпросмотр статей
![Предпросмотр статей](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleWiki/assets/readme/wiki-catalog-searche.jpg)

### Просмотр статьи
![Просмотр статьи](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleWiki/assets/readme/wiki-article.jpg)

### Редактирование статьи
![Редактирование статьи](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleWiki/assets/readme/wiki-article-edit.jpg)