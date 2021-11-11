// toolbar-ui.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import linkIcon from '@ckeditor/ckeditor5-link/theme/icons/link.svg';

import LinkForm from './test.js';
import ListStyleUI from '../custom-list/src/liststyleui';



import numberedListIcon from '../custom-list/theme/icons/numberedlist.svg';
import personal from '../custom-list/theme/icons/personal.svg';
import personalBlue from '../custom-list/theme/icons/personal-blue.svg';
import ClassicEditor from '../../../src/index.js';
import { listArr, chinesObj, updateArr } from '../custom_data/index';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import {
    COMMAND_NAME__LINK,
    TOOLBAR_NAME__LINK,
    TOOLBAR_LABEL__LINK,
} from './constant';

export default class LinkToolbarUI extends Plugin {
    init() {
        this._createToolbarButton();
    }

    _createToolbarButton() {
        const editor = this.editor;
        // COMMAND_NAME__LINK -> 'link'
        const linkCommand = editor.commands.get(COMMAND_NAME__LINK);

        // TOOLBAR_NAME__LINK -> 'ck-link'
        editor.ui.componentFactory.add(TOOLBAR_NAME__LINK, (locale) => {
            const view = new ButtonView(locale);
            view.set({
                // TOOLBAR_LABEL__LINK -> '超链接'
                label: TOOLBAR_LABEL__LINK,
                tooltip: true,
                icon: linkIcon,
                class: 'toolbar_button_link',
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {
                // const imageURL = prompt('Image URL')
                this._openDialog();
            });
            return view;
        });
    }

    // value 为已设置的超链接，作为初始值传给弹窗表单
    _openDialog(value) {
        const editor = this.editor;
        const t = editor.locale.t;
        const _this = this;
        const editorId = editor.sourceElement.id;


        // 在弹窗中触发命令
        new LinkForm({
            value,
            onSubmit: (val) => {
                const currArr = val.map(item => {
                    return chinesObj[item];
                });
                const keyName = `cus${Object.keys(listArr).length + 1}`;
                const lastData = editor
                    .getData()
                    .replace(/list-style="/g, 'style="list-style-type:');
                updateArr(keyName, currArr);
                console.log('getData----', editor.getData().replace(/list-style="/g,'style="list-style-type:'));

                //write dynamically add item in dropdown
                editor.destroy().then(() => {
                    let data = JSON.parse(sessionStorage.getItem(editorId));
                    data.push(
                        {
                            label: t(keyName),
                            tooltip: t(keyName),
                            type: keyName,
                            icon: personal,
                        }
                    );

		            sessionStorage.setItem(editorId, JSON.stringify(data));
                    
                    ClassicEditor.create(document.querySelector('#editor-area'))
                        .then((editor) => {
                            editor.setData(lastData);
                            console.log('Editor was initialized', editor.getData());
                            CKEditorInspector.attach(editor);
                        })
                        .catch((err) => {
                            console.error(err.stack);
                        });
                });
            },
        });
    }
}
