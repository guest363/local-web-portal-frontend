import Quill from "quill";
require("../../components/common/quillSnow.css");
export default function (context, container) {
    const makeEdit = elem => {
        const wrapper = document.getElementById(elem);
        if (wrapper === void 0) { alert('Ошибка в форматироавнии страницы'); return; }
        wrapper.innerHTML = '<div id="editor-container" class="card"></div>';
        const container = document.getElementById('editor-container');
        const toolbarOptions = {
            container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", "italic", "color", "underline"],
                ["blockquote", "align", "formula"],
                [{ color: [] }, { background: [] }],
                ["link", "image", "code-block"],
                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"]
            ]
        };
        const editor = new Quill(container, {
            modules: {
                toolbar: toolbarOptions
            },

            theme: "snow"
        });
        return editor;
    };
    // ql-toolbar
    context.newPostContent = makeEdit(container); // Передаем обьект editor
    // из которого в дальнейшем будем извлекать текст поста
    // через замыкания он доступен глобально
}