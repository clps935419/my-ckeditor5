import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';

import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';


//客製樣式
import './css/custom.css';

//常用按鈕
import {
    InsertTextIcons,
} from './js/common-use-icon/index.js';



//增加符號
import { SpecialCharactersArrowsExtended } from './js/special-characters/index.js';
//客製list-style
import customList from './js/custom-list/src/list';

import customListStyle from './js/custom-list/src/ListStyle';

import { renewFormat } from './js/custom-list/src/chinesFormatData.js';
//顯示中文的處理，這邊是把data-contetn加入至HTML上
import showDataContentProcess from './js/custom-list/src/showDataContentProcess.js';


export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
    Alignment,
    Essentials,
    Paragraph,
    Bold,
    Indent,
    IndentBlock,
    Italic,
    Underline,
    SpecialCharacters,
    SpecialCharactersArrowsExtended,
    renewFormat,
    customList,
    customListStyle,
    showDataContentProcess,
    InsertTextIcons,
];
// Editor configuration.
ClassicEditor.defaultConfig = {
    fontFamily: {
        options: ['default', '標楷體'],
    },
    toolbar: {
        shouldNotGroupWhenFull: true,
        items: [
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'underline',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'specialCharacters',
            '|',
            'InsertTextIcon0',
            'InsertTextIcon1',
            'InsertTextIcon2',
            '|',
        ],
    },
    indentBlock: {
        offset: 1,
        unit: 'em',
    },
};
