# Фронтенд локального сайта
Инструмент помогающий в повседневной деятельности организации.
Дизайн не адаптивен.
В процессе создания были удалены модули:
* Чат - за ненадобность
* Спорт - за ненадобностью. Строил графики ддинамики спортивных показателей людей.
* Доска обьявлений. Включала парсер яндекс новостей, отображение погоды с dark weather, напоминания о ДР, на ряду с новостями яндекса отображались в таком же виде локальные новости.

# Запуск
Проект состоит из двух частей: 
* [backend](https://github.com/guest363/local-web-portal-backend) 
* frontend - этот репозиторий.

## Шаги
1. Нужно скачать оба репозитория и положить их на один уровень вложенности в папках:
    * RootFolder
        * |- frontend (этот репозиторий)
        * |- backend 
1. Если есть docker то перейти к настройке [backend](https://github.com/guest363/local-web-portal-backend). На этом настройка frontend заканчивается.
1. В папке frontend выполнить команду ` npm install `.
1. В файле ./src/constants.js изменить:
    * serverName - ip адрес или имя backend без порта
    * serverIP - полный адрес backend
1. В папке frontend выполнить команду ` npm run build `
1. Перейти к настройке [backend](https://github.com/guest363/local-web-portal-backend)

## Компоненты
Сгруппированы по папкам и должны зависит от минимума деталий за их рамками.
Компоненты в проекте:
* [Новости](https://github.com/guest363/local-web-portal-frontend/tree/master/src/moduleNews)- новостная лента
* [Мониторинг](https://github.com/guest363/local-web-portal-frontend/tree/master/src/moduleMonitoring) - на данный момент только отображения статуса устройст в ЛВС. Проверяется пингом. @TODO добавить возможность подключения к устройствам по SSH, все в рамках Web.
* [Задачи](https://github.com/guest363/local-web-portal-frontend/tree/master/src/moduleTasks) - канбан доска @TODO доделать
* [Википедия](https://github.com/guest363/local-web-portal-frontend/tree/master/src/moduleWiki) - хранилище знаний
* [Стрельба](https://github.com/guest363/local-web-portal-frontend/tree/master/src/moduleShoot) - сохранение результатов стрельбы
* [Большой брат](https://github.com/guest363/local-web-portal-frontend/tree/master/src/moduleUSB) - контроль usb от тонких клиентов

## Идеи
По задумке хотел реализовать следующие идеи:
* Компоненты *.vue должны отвечать только за отображение обьектов
* Стараться выделять функциональные компоненты
* Vuex хранилище истины и замена части props
* Используются веб сокеты(socket.io) для интерактивных разделов и http (axios) для остального. *Имеет ли смысл оставить только сокеты?*
* Легкость подключения и отключения модулей.


## Глобальные обьекты
* Миксины:
    * showAlert(header, text) - показывает alert
    * closeAlert() - принудительно скрывает alert, но как правило вызвать его нет смысла принудительно, showAlert вызывает его сам через 2 с.
    * showModal() - показать модальное окно
    * closeModal() - скрыть модальное окно
    * isShowModal: false - состояние v-show модального окна. Так как только одно может единовременно отображаться на странице флаго вполне достаточно.
* Компоненты:
    * custom-alert - как замена метода alert()
    * modal - модальное окно со слотами
* Префиксы для Vuex:
    * actionPrefix: 'SOCKET_' для удобного взаимодействия с сокетами.
    * mutationPrefix: 'SOCKET_' для удобного взаимодействия с сокетами. Например  SOCKET_RETURN_NEWS сработает при передачи в сокет с bakend 'RETURN_NEWS'
* Сокеты в Vue как отдельное свойство обьекта на ряду с methods и т.д. Пример:      
```
sockets: {
    connect: function () {
      console.log("socket connected");
    }
}
```
* Для отправки в сокет данные `this._vm.$socket.emit(EVENT, DATA)`
* В локальном хранилище информация о пользователе:
    * token
    * displayName
    * role

## Как выглядит
![Пример того как выглядит](https://github.com/guest363/local-web-portal-frontend/blob/master/src/assets/readme/main.png)