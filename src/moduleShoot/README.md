# Модуль истории стрельб
Для сохранения не только колличество попаданий и оценкb а и позиции каждого выстрела. С целью оценки кучности и смещений.

## TODO
* Отображение элементов в stateMachine
* Стили для печати ведомостей

## Как подключить
* Добавить модуль хранилища в VUEX проекта ~/store/index.js
* Добавить в Vue Router маршруты до:
    * ~/views/index.vue


## Взаимодействие с bakend
Происходит через Store который вызывает методы сети (работает через Socket).

## Как выглядит
### Начальный экран
![Начальный экран](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleShoot/assets/readme/init.jpg)

### Дабввление новых результатов
![Дабввление новых результатов](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleShoot/assets/readme/add.jpg)

### Просмотр истории
![Просмотр истории](https://github.com/guest363/local-web-portal-frontend/blob/master/src/moduleShoot/assets/readme/history.jpg)
