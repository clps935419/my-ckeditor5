import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
// import List from '@ckeditor/ckeditor5-list/src/list';
// import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle.js';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

//客製樣式
import './css/custom.css';

//常用按鈕
import {
    InsertTextIcon1,
    InsertTextIcon2,
} from './js/common-use-icon/index.js';



//增加符號
import { SpecialCharactersArrowsExtended } from './js/special-characters/index.js';
//客製list-style
import customList from './js/custom-list/src/list';

import customListStyle from './js/custom-list/src/ListStyle';

function ClipboardButtons(editor) {
    addButton('copy', 'Copy');
    addButton('cut', 'Cut');
    addButton('paste', 'Paste');

    function addButton(action, label) {
        editor.ui.componentFactory.add(action, (locale) => {
            const view = new ButtonView(locale);

            view.set({
                label: label,
                // Or use the 'icon' property.
                withText: true,
                tooltip: true,
            });

            view.on('execute', () => {
                if (action === 'paste') {
                    alert('Sorry man, no can do!');
                    document.execCommand(action);
                } else {
                    document.execCommand(action);
                }
            });

            return view;
        });
    }
}
class ListStartAttribute extends Plugin {
    init() {
        const editor = this.editor;

        // 1.extend schema
        editor.model.schema.extend('listItem', {
            allowAttributes: 'data-content',
        });

        // 2.set conversion up/down
        editor.conversion.for('downcast').add((dispatcher) => {
            dispatcher.on(
                'attribute:data-content',
                (evt, data, conversionApi) => {
                    if (data.item.name != 'listItem') {
                        return;
                    }

                    const viewWriter = conversionApi.writer;
                    const viewElement = conversionApi.mapper.toViewElement(
                        data.item
                    );
                    const containerElement = viewElement.parent;
                    const listStyle = data['item']['_attrs'].get('listStyle');
                    const indent = data['item']['_attrs'].get('listIndent');
                    if (true) {
                        // console.log(
                        //     'data',
                        //     containerElement,
                        //     viewElement,
                        //     data,
                        //     data.attributeKey,
                        //     data.attributeNewValue
                        // );
                        // console.log(
                        //     'data',
                        //     data,
                        //     data['item']['_attrs'],
                        //     data['item']['_attrs'].get('listStyle')
                        // );
                        viewWriter.setAttribute(
                            data.attributeKey,
                            data.attributeNewValue,
                            viewElement
                        );
                    }
                }
            );
        });
    }
}
export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
    Alignment,
    Essentials,
    Paragraph,
    Bold,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Indent,
    IndentBlock,
    Italic,
    BlockQuote,
    // Heading,
    Link,
    // List,
    // ListStyle,
    Underline,
    SpecialCharacters,
    SpecialCharactersText,
    SpecialCharactersArrowsExtended,
    ClipboardButtons,

    customList,
    customListStyle,
    ListStartAttribute,
    InsertTextIcon1,
    InsertTextIcon2,
];
// Editor configuration.
ClassicEditor.defaultConfig = {
    fontFamily: {
        options: ['default', '標楷體'],
    },
    toolbar: {
        // viewportTopOffset: 10,
        shouldNotGroupWhenFull: true,
        // isSticky: false,
        items: [
            // 'heading',
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'underline',
            // 'link',
            'bulletedList',
            'numberedList',
            // 'alignment',
            '|',
            'outdent',
            'indent',
            // 'fontColor',
            // 'fontFamily',
            // 'fontSize',
            // 'fontBackgroundColor',
            '|',
            // 'blockQuote',

            '|',
            'specialCharacters',
            // '|',
            // 'copy',
            // 'cut',
            // 'paste',
            '|',
            'InsertTextIcon1',
            'InsertTextIcon2',
            'ck-dialog',
            '|',
        ],
    },
    indentBlock: {
        classes: [
            'custom-block-indent-a', // First step - smallest indentation.
            'custom-block-indent-b',
            'custom-block-indent-c', // Last step - biggest indentation.
        ],
    },
    fontSize: {
        options: [12, 14, '預設', 16, 18, 20, 22, 24, 26, 28, 30],
    }, // if(indent === 0){
    //     viewWriter.setAttribute(
    //         'listStyle',
    //         listStyle,
    //         containerElement
    //     );
    // }
};
