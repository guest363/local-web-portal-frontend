<template functional>
    <div class="big-bro--alert big-bro--wrapper" v-show="props.show === 'alertUSB'">
        <h1 class="big-bro--h3">Нарушения политики безопасности:</h1>
        <div class="page--wrapper__bigbrother">
            <span
                v-for="page in props.pages"
                @click="listeners.setCurrentPage(page)"
                class="page"
                :key="page"
                v-bind:class="{'page-active': (page === props.alertChunk + 1)}"
            >{{`${page}`}}</span>
        </div>
        <table class="big-bro--table">
            <thead class="big-bro--table--head">
                <th @click="listeners.filter('mountTime')">Дата подключения</th>
                <th @click="listeners.filter('hostid')">Host</th>
                <th @click="listeners.filter('product')">Тип устройства</th>
                <th @click="listeners.filter('manufacture')">Производитель</th>
                <th>Присвоенное имя</th>
                <th @click="listeners.filter('USBnameSave')">Серийный номер</th>
                <th @click="listeners.filter('username')">Пользователь</th>
                <th>Рег. Номер</th>
            </thead>
            <transition-group name="fade" tag="tbody">
                    <tr
                        class="big-bro--list"
                        v-for="option in props.alertUSBList"
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
            </transition-group>
        </table>
    </div>
</template>