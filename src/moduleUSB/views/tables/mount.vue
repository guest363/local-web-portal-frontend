<template functional>
    <div class="big-bro--mount big-bro--wrapper" v-show="props.show === 'mountUSB'">
        <h1 class="big-bro--h3">Сейчас подключены {{props.usbCount}} устр. :</h1>
        <table class="big-bro--table">
                <tr>
                    <th>Дата монтирования</th>
                    <th>Host</th>
                    <th>Тип устройства</th>
                    <th>Производитель</th>
                    <th>Присвоенное имя</th>
                    <th>Серийный номер</th>
                    <th>Пользователь</th>
                    <th>Рег. Номер</th>
                </tr>
                <tr
                    class="big-bro--list"
                    v-for="option in props.mountUSBActualList"
                    :key="option['_id']"
                    @click="props.showModal(option)"
                >
                    <td>{{new Date(option.mountTime).toLocaleString("ru")}}</td>
                    <td>
                        <span v-html="props.iconGenerator(option.product)"></span>
                        {{ option.hostid}}
                    </td>
                    <td>{{ option.product}}</td>
                    <td>{{ option.manufacture }}</td>
                    <td>{{ option.serial }}</td>
                    <td>{{ option.USBnameSave }}</td>
                    <td>{{ option.username }}</td>
                    <td>{{ option.regNumber }}</td>
                </tr>
        </table>
    </div>
</template>
