<template functional>
    <div class="section--actions">
        <div class="section--actions--section__2size">
            <div class="monitoring--wrapper">
                <h1 class="monitoring--h3">Мониторинг устройств сети:</h1>
                <table class="monitoring--table">
                    <tbody>
                        <tr>
                            <th>Статус</th>
                            <th>Имя</th>
                            <th>IP адрес</th>
                            <th>Тип устройства</th>
                        </tr>
                        <tr class="monitoring--list" v-for="host in props.allHosts" :key="host['_id']">
                            <td>
                                <img
                                    class="monitoring--img__status"
                                    :src="props.imageSrcGen(host.online)"
                                >
                            </td>
                            <td>{{host.name}}</td>
                            <td>{{host.ip}}</td>
                            <td>
                                <span v-html="props.iconGenerator(host.hostType)"></span>
                                {{ host.hostType}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

