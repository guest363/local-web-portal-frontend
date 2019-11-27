# Модуль мониторинга устройств
Отображает следующие таблицы:
* Примонтированные устройства
* Нарушения политики безопасности
* Белый список устройст 
Редактировать и удалять могут только администраторы, доступно для любой роли.

## TODO


## Как подключить
* Добавить модуль хранилища в VUEX проекта ~/store/index.js
* Добавить в Vue Router маршруты до:
    * ~/views/index.vue - все 3 таблицы


## Взаимодействие с bakend
Происходит через Store который вызывает методы сети (socket.io).

## Как выглядит
### Нарушения политики безопасности
![Нарушения политики безопасности](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleUSB/assets/readme/alert.jpg)

### Белый список устройст 
![Белый список устройст ](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleUSB/assets/readme/white.jpg)

### Примонтированные устройства
![Примонтированные устройства](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleUSB/assets/readme/mount.jpg)

### Редактирование носителя
![Редактирование носителя](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleUSB/assets/readme/edit.jpg)