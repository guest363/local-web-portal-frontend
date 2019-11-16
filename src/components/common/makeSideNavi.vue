<template>
<div class="content">
    <h4 id="content--header">Содержание:</h4>
    <ul id="addingElement">
        <li>Загрузка содержания</li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'sideChapter',
    props: ['data'],
    data() {
        return {};
    },
    methods: {
        makeMenu: function () {
                const el = document.getElementById(this.data.sourceID); // контейнер с содержимым Вики страницы
                let allH = el.querySelectorAll("h1, h2, h3, h4, h5, h6"); // Найти все заголовки
                const add = document.getElementById('addingElement'); // Список ul где выводится содержимое
                const fragment = document.createDocumentFragment(); // Чтобы не отрисовывать каждый раз страницу
                // элементы списка добавляются во фрагмент а затем уже весь фрагмент в DOM
                allH = Array.prototype.slice.call(allH); // теперь allH - массив, так удобнее работать
                // в частности появляется метот reduce
                const addList = (item, position) => {
                    item.setAttribute("id", `C${position}`); // присвоить заголовку в ВИКИ страничке id с нумерацией
                    // для навигации по разделам
                    let newLi = document.createElement("li");
                    let link = document.createElement("a");
                    link.title = "Навигация";
                    link.innerHTML = `<${item.tagName}> ${item.textContent} </${
                                item.tagName
                              }> `; // добавть к ссылке тег и содержимое заголовка
                    link.href = `#C${position}`; // присвоить закладку на заголовок в ВИКИ
                    newLi.appendChild(link);
                    fragment.appendChild(newLi);
                };

                allH.reduce((acc, item) => {
                    // Создать раздел содержимое
                    addList(item, acc);
                    return acc + 1;
                }, 0);
                add.innerHTML = ""; // удаляет всех потомков элемента. 
                add.appendChild(fragment); // загружает . 
        }
    },
    mounted() {
        this.makeMenu();
    }

};
</script>

<style scoped>
.content {
    position: sticky;
    top: 10px;
}

.content ul {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0 0 0 10px;
    width: 100%;
}

#content--header {
    font-size: 14px;
    font-weight: bold;
    padding: 0;
}

>>>#addingElement h1,
>>>#addingElement h2,
>>>#addingElement h3,
>>>#addingElement h4,
>>>#addingElement h5,
>>>#addingElement h6 {
    font-size: 12px;
    font-weight: normal;
}

>>>#addingElement h2 {
    padding-left: 10px;
}

>>>#addingElement h3 {
    padding-left: 20px;
}

>>>#addingElement h4 {
    padding-left: 30px;
}

>>>#addingElement h5 {
    padding-left: 40px;
}

>>>#addingElement h6 {
    padding-left: 50px;
}

>>>#addingElement a {
    text-decoration: none;
    color: #424c55;
}
</style>
