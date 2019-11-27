<template functional>
    <transition name="modal">
        <div class="shoot--targets" v-if="props.display === 'historyResults'">
            <h1 class="shoot--targets--header">Стрелок: {{props.shoot.fio}}</h1>
            <div class="shoot--targets--history">
                <div
                    class="shoot--targets--history--card"
                    v-for="result in props.dataToTargetsHistory"
                    v-bind:key="result[`_id`]"
                >
                    <h2
                        class="shoot--targets--history--card--date"
                    >Дата: {{new Date(result.day).toLocaleDateString("ru")}}</h2>
                    <h3
                        class="shoot--targets--history--card--result"
                    >{{result.mark}} / {{result.sum}}</h3>
                    <shoot-target-for-results
                        class="shoot--aim__result"
                        :shootsArray="result.shootsCoords"
                    ></shoot-target-for-results>
                </div>
            </div>
        </div>
    </transition>
</template>
 
