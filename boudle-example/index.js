function $ (str){
    return document.querySelector(str);
}

ClassicEditor.create(document.querySelector('#editor-area'))
    .then((editor) => {
        document.querySelector('#submit').addEventListener('click', () => {
            console.log('get', editor.getData());
            $('.show-content1').innerText = editor.getData();
        });
        console.log('進去=--', editor);
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    });
ClassicEditor.create(document.querySelector('#editor-area2'))
    .then((editor) => {
        document.querySelector('#submit2').addEventListener(
            'click',
            () => {
                console.log('get', editor.getData());
                $('.show-content2').innerText = editor.getData();
            },
            false
        );
    })
    .catch((error) => {
        console.error('There was a problem initializing the editor.', error);
    }); 
