import ClassicEditor from '../packages/my-editor/src/index.js';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
ClassicEditor.create(document.querySelector('#editor-area'), {
    //帶入自訂的中文格式
    //format1、format2如果改名字需一併調整chinesFormatData.js、coverter.js
    renewFormat: {
        format1: {
            data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            attr: ['(T)', 'T、', 'T*.', 'T*/*/*/'], //T代表上面的字這邊就是顯示兩種(一) 一、
        },
        format2: {
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            attr: ['(T)', '(T).'], //這邊就是顯示兩種(1) (1).
        },
        format3: {
            data: [
                '１',
                '２',
                '３',
                '４',
                '５',
                '６',
                '７',
                '８',
                '９',
                '１０',
            ],
            attr: ['(T)', '(T).'],
        },
        format4: {
            data: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ],
            attr: ['T.'],
        },
        format5: {
            data: ['壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖', '拾'],
            attr: ['T、'],
        },
        format6: {
            data: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            attr: ['(T)'],
        },
        format7: {
            data: [
                '子',
                '丑',
                '寅',
                '卯',
                '辰',
                '巳',
                '午',
                '未',
                '申',
                '酉',
                '戌',
            ],
            attr: ['(T)'],
        },
    },
})
    .then((editor) => {
        console.log('ed', editor);
        CKEditorInspector.attach(editor);
        document.querySelector('#submit').addEventListener('click', () => {
            console.log('get', editor.getData());
            document.querySelector('.outputArea').innerHTML = editor.getData();
        });
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    });
ClassicEditor.create(document.querySelector('#editor-area2'))
    .then((editor) => {
        CKEditorInspector.attach(editor);
        document.querySelector('#submit2').addEventListener(
            'click',
            () => {
                console.log('get', editor.getData());
                document.querySelector('.outputArea').innerHTML = editor.getData();

            },
            false
        );
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    });