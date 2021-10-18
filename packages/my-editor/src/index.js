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

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';




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
    editor.plugins.get('SpecialCharacters').addItems('常用', [
        {
            title: '大括號',
            character: '【】',
        },
        {
            title: '--',
            character: '{}',
        },
        {
            title: 'simple arrow up',
            character: '↑',
        },
        {
            title: 'simple arrow right',
            character: '→',
        },
        {
            title: 'simple arrow down',
            character: '↓',
        },
    ]);
}

class InsertTextIcon1 extends Plugin {
    init() {
        console.log('執行')
        const editor = this.editor;

        editor.ui.componentFactory.add('InsertTextIcon1', (locale) => {
            const view = new ButtonView(locale);

            view.set({
                label: '【】',
                withText: true,
                tooltip: true,
                // icon: imageIcon,
                // tooltip: true,
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {
                // const imageURL = prompt('Image URL')
                editor.model.change((writer) => {
                    const insertPosition =
                        editor.model.document.selection.getFirstPosition();
                    writer.insertText('【】', insertPosition);
                });
            });

            return view;
        });
        editor.ui.componentFactory.add('InsertTextIcon2', (locale) => {
            const view = new ButtonView(locale);

            view.set({
                label: '，',
                withText: true,
                tooltip: true,
                // icon: imageIcon,
                // tooltip: true,
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {
                // const imageURL = prompt('Image URL')
                editor.model.change((writer) => {
                    const insertPosition =
                        editor.model.document.selection.getFirstPosition();
                    writer.insertText('，', insertPosition);
                });
            });

            return view;
        });
    }
}
class InsertTextIcon2 extends Plugin {
    init() {
        console.log('執行');
        const editor = this.editor;
        
        editor.ui.componentFactory.add('InsertTextIcon2', (locale) => {
            const view = new ButtonView(locale);

            view.set({
                label: '，',
                withText: true,
                tooltip: true,
                // icon: imageIcon,
                // tooltip: true,
            });

            // Callback executed once the image is clicked.
            view.on('execute', () => {
                // const imageURL = prompt('Image URL')
                editor.model.change((writer) => {
                    const insertPosition =
                        editor.model.document.selection.getFirstPosition();
                    writer.insertText('，', insertPosition);
                });
            });

            return view;
        });
    }
}

class ListStartAttribute extends Plugin {
    init() {
        console.log('ListStartAttribute is init');
        const editor = this.editor;

        // 1.extend schema
        editor.model.schema.extend('listItem', { allowAttributes: 'start' });

        // 2.set conversion up/down
        editor.conversion.for('downcast').add((dispatcher) => {
            dispatcher.on('attribute', (evt, data, conversionApi) => {
                console.log('data', data.item, data.item.name);
                if (data.item.name != 'listItem') {
                    return;
                }

                const viewWriter = conversionApi.writer;
                const viewElement = conversionApi.mapper.toViewElement(
                    data.item
                );
                const containerElement = viewElement.parent;

                if (
                    data.attributeNewValue &&
                    !containerElement.getAttribute('start')
                ) {
                    viewWriter.setAttribute(
                        data.attributeKey,
                        data.attributeNewValue,
                        containerElement
                    );
                }
            });
        });

        editor.conversion.for('upcast').attributeToAttribute({
            model: {
                name: 'listItem',
                key: 'start',
            },
            view: {
                name: 'ol',
                key: 'start',
            },
            converterPriority: 'low',
        });
        editor.execute('listStyle', { type: 'lower-roman' });
    }
}


export default class MyEditor {
    constructor(props) {
        Object.assign(
            this, {
                id: 'editor-area',
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
                InsertTextIcon1,
                InsertTextIcon2,
                ListStartAttribute,
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
                    'InsertTextIcon1',
                    'InsertTextIcon2',
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