import Editor from "../packages/my-editor/src/index.js";

function render(id){
    return new Editor({
        id:id
    })
}
const editor = render('editor-area');
const editor2 = render('editor-area2');

document.querySelector('#submit').addEventListener('click', () => {
    console.log('get', editor.editorObj.getData());
});

document.querySelector('#submit2').addEventListener(
    'click',
    () => {
        console.log('get', editor2.editorObj.getData());
    },
    false
);

