import Editor from "../packages/my-editor/src/index.js";
// import Editor from '../packages/my-editor/dist/my-editor.min.js';
function render(){
    return new Editor({
        id:"editor-area"
    })
}
const editor = render();