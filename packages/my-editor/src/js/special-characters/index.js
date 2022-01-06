export function SpecialCharactersArrowsExtended(editor) {
    console.log('----', editor.plugins.get('SpecialCharacters'));
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
