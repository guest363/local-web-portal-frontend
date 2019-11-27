# Модуль мониторинга устройств в ЛВС
На данный момент монитроинг использует нативный пинг windows

## TODO
* SSH web клиент до хостов

## Как подключить
* Добавить модуль хранилища в VUEX проекта ~/store/index.js
* Добавить в Vue Router маршруты до:
    * ~/views/index.vue 

При этом модуль зависит от файла /src/backendContext.js где заданы общие заголовки для инструмента общения по сети (выбран axios) и функция отлова ошибок tryCatchFunctionAxios.

## Взаимодействие с bakend
Происходит через Store который вызывает методы сети (работает через HTTP).

## Как выглядит
![Лента новостей](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleMonitoring/assets/readme/init.jpg)
