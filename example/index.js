import ClassicEditor from '../packages/my-editor/src/index.js';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
ClassicEditor.create(document.querySelector('#editor-area'))
    .then((editor) => {
        
        CKEditorInspector.attach(editor);
        document.querySelector('#submit').addEventListener('click', () => {
            console.log('get', editor.getData());
        });
        console.log('進去=--', editor);
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    });
// ClassicEditor.create(document.querySelector('#editor-area2'))
//     .then((editor) => {
//         CKEditorInspector.attach(editor);
//         document.querySelector('#submit2').addEventListener(
//             'click',
//             () => {
//                 console.log('get', editor.getData());
//             },
//             false
//         );
//     })
//     .catch((error) => {
//         console.error('There was a problem initializing the editor.', error);
//     });    






