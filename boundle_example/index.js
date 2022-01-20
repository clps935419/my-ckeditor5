//如果各系統需要客製化個別參數可以使用下列AJAX方法，在取得客製參數後去產生編輯器
//AJAX呼叫編輯器範例
async function ajaxCreatEditor(editorId,url = "") {
    try {
        const response = await fetch(url);
        const resJson = await response.json();
        //拿到上面回傳後就能使用回傳JSON參數去創建編輯器
        ClassicEditor.create(document.querySelector(`#${editorId}`), resJson)
            .then((editor) => {
                document
                    .querySelector('#submit')
                    .addEventListener('click', () => {
                        console.log('get', editor.getData());
                        document.querySelector('.show-content1').innerText =
                            editor.getData();
                        document.querySelector('.outputArea').innerHTML =
                            editor.getData();
                    });
            })
            .catch((error) => {
                console.error(
                    'There was a problem initializing the editor.',
                    error
                );
            });
    } catch (error) {
        console.log('error',error)
    }
}
//直接呼叫編輯器的範例    
ClassicEditor.create(document.querySelector('#editor-area'), {
        //這邊是各系統可以個別設定要顯示的功能，如果不寫toolbar就是預設全部顯示
        toolbar: {
            items: [
                'undo', //回復功能
                'redo',
                '|',
                'bold', //粗體
                'italic', //斜體
                'underline', //底線文字
                'bulletedList', //清單
                'numberedList', //清單
                '|',
                'outdent', //縮排
                'indent',
                '|',
                'specialCharacters', //特殊符號
                '|',
                'InsertTextIcon0', //常用符號
                //下面註解掉的就是不顯示的
                // 'InsertTextIcon1',
                // 'InsertTextIcon2',
                '|',
            ],
        },
        //帶入自訂的中文格式
        //format1、format2如果改名字需一併調整chinesFormatData.js、coverter.js
        renewFormat: {
            format1: {
                data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
                attr: ['(T)', 'T、'], //T代表上面的字這邊就是顯示兩種(一) 一、
            },
            format2: {
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                attr: ['T、', '(T)', '(T).'], //這邊就是顯示兩種(1) (1).
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
                attr: ['T、', '(T)', '(T).'],
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
                attr: ['T、', '(T)'],
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
                    '亥'
                ],
                attr: ['T、', '(T)'],
            },
        },
    })
    .then((editor) => {
        document.querySelector('#submit').addEventListener('click', () => {
            console.log('get', editor.getData());
            document.querySelector('.show-content1').innerText =
                editor.getData();
            document.querySelector('.outputArea').innerHTML = editor.getData();
        });
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    });
ClassicEditor.create(document.querySelector('#editor-area2'), {
    //帶入自訂的中文格式
    //format1、format2如果改名字需一併調整chinesFormatData.js、coverter.js
    renewFormat: {
        format1: {
            data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            attr: ['(T)', 'T、'], //T代表上面的字這邊就是顯示兩種(一) 一、
        },
        format2: {
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            attr: ['T、', '(T)', '(T).'], //這邊就是顯示兩種(1) (1).
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
            attr: ['T、', '(T)', '(T).'],
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
            attr: ['T、', '(T)'],
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
                '亥',
            ],
            attr: ['T、', '(T)'],
        },
    },
})
    .then((editor) => {
        document.querySelector('#submit2').addEventListener(
            'click',
            () => {
                console.log('get', editor.getData());
                document.querySelector('.show-content2').innerText =
                    editor.getData();
                document.querySelector('.outputArea').innerHTML =
                    editor.getData();
            },
            false
        );
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    });