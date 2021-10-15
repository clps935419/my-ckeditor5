import Editor from "../packages/my-editor/src/index.js";

function render(){
    return new Editor({
        id:"editor-area"
    })
}
const editor = render();