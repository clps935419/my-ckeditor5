// packages/my-editor/src/index.js
import './css/styles.css';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
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
import List from '@ckeditor/ckeditor5-list/src/list';
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

import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle.js';




function ClipboardButtons(editor) {
    addButton('copy', 'Copy');
    addButton('cut', 'Cut');
    addButton('paste', 'Paste');
    addButton('test', 'test');
    addButton('test2', 'test2');
    addButton('test3', 'test3');

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
                console.log('this', this, locale,action);
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

function SpecialCharactersArrowsExtended(editor) {
    editor.plugins.get('SpecialCharacters').addItems('常用', [{
            title: '大括號',
            character: '{}'
        },
        {
            title: 'simple arrow up',
            character: '↑'
        },
        {
            title: 'simple arrow right',
            character: '→'
        },
        {
            title: 'simple arrow down',
            character: '↓'
        }
    ]);
}


export default class MyEditor {
    constructor(props) {
        Object.assign(
            this, {
                id: 'editor',
            },
            props
        );
        this.render();
    }

    render() {
        ClassicEditor.create(document.querySelector(`#${this.id}`), {
            plugins: [
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
                Heading,
                Link,
                List,
                Underline,
                SpecialCharacters,
                // SpecialCharactersArrows,
                // SpecialCharactersCurrency,
                // SpecialCharactersEssentials,
                // SpecialCharactersLatin,
                // SpecialCharactersMathematical,
                SpecialCharactersText,
                SpecialCharactersArrowsExtended,
                ClipboardButtons,
                ListStyle,
            ],
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'alignment',
                    '|',
                    'fontColor',
                    'fontFamily',
                    'fontSize',
                    'fontBackgroundColor',
                    '|',
                    'blockQuote',
                    'undo',
                    'redo',
                    '|',
                    'specialCharacters',
                    '|',
                    'copy',
                    'cut',
                    'paste',
                    'test',
                    'test2',
                    'test3',
                    '|',
                    'outdent',
                    'indent',

                ],
                viewportTopOffset: 10,
                shouldNotGroupWhenFull: true,
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
            },
        })
            .then((editor) => {
                console.log('Editor was initialized', editor);
            })
            .catch((error) => {
                console.error(error.stack);
            });
    }
}