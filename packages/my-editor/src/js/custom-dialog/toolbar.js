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
            console.log('---產生');

        // TOOLBAR_NAME__LINK -> 'ck-link'
        editor.ui.componentFactory.add(TOOLBAR_NAME__LINK, (locale) => {
            console.log('產生');
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
                console.log('editor', editor, 'val', val, listArr, chinesObj);
                const currArr = val.map(item => {
                    return chinesObj[item];
                });
                const keyName = `cus${Object.keys(listArr).length + 1}`;
                updateArr(keyName, currArr);
                console.log('editor----', listArr);
                console.log('getData----', editor.getData());

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
                    console.log('data', data);

		            sessionStorage.setItem(editorId, JSON.stringify(data));
                    
                    ClassicEditor.create(document.querySelector('#editor-area'))
                        .then((editor) => {
                            console.log('Editor was initialized', editor);
                            CKEditorInspector.attach(editor);
                        })
                        .catch((err) => {
                            console.error(err.stack);
                        });
                });
                
                











                // editor.ui.componentFactory.add(
                //     'numberedList',
                //     getSplitButtonCreator({
                //         editor,
                //         parentCommandName: 'numberedList',
                //         buttonLabel: t('Numbered List'),
                //         buttonIcon: numberedListIcon,
                //         toolbarAriaLabel: t('Numbered list styles toolbar'),
                //         styleDefinitions: [
                //             {
                //                 label: t('test1'),
                //                 tooltip: t('test1'),
                //                 type: 'test1',
                //                 icon: personal,
                //             },
                //             {
                //                 label: t('test2'),
                //                 tooltip: t('test2'),
                //                 type: 'test4',
                //                 icon: personalBlue,
                //             },
                //             {
                //                 label: t('test3'),
                //                 tooltip: t('test3'),
                //                 type: 'test3',
                //                 icon: personal,
                //             },
                //             {
                //                 label: t('test4'),
                //                 tooltip: t('test4'),
                //                 type: 'test4',
                //                 icon: personalBlue,
                //             },
                //         ],
                //     })
                // );
                console.log('ui', editor.ui.componentFactory);
                function getSplitButtonCreator({
                    editor,
                    parentCommandName,
                    buttonLabel,
                    buttonIcon,
                    toolbarAriaLabel,
                    styleDefinitions,
                }) {
                    const parentCommand =
                        editor.commands.get(parentCommandName);
                    const listStyleCommand = editor.commands.get('listStyle');
                        console.log(
                            '進-----------------------------',
                            listStyleCommand,
                            parentCommand
                        );

                    // @param {module:utils/locale~Locale} locale
                    // @returns {module:ui/dropdown/dropdownview~DropdownView}
                    return locale => {
                        console.log('進-----------------------------2222');
                        
                        const dropdownView = createDropdown(
                            locale,
                            SplitButtonView
                        );
                        const splitButtonView = dropdownView.buttonView;
                        const styleButtonCreator = getStyleButtonCreator({
                            editor,
                            parentCommandName,
                            listStyleCommand,
                        });

                        addToolbarToDropdown(
                            dropdownView,
                            styleDefinitions.map(styleButtonCreator)
                        );

                        dropdownView.bind('isEnabled').to(parentCommand);
                        dropdownView.toolbarView.ariaLabel = toolbarAriaLabel;
                        dropdownView.class = 'ck-list-styles-dropdown';

                        splitButtonView.on('execute', () => {
                            editor.execute(parentCommandName);
                            editor.editing.view.focus();
                        });

                        splitButtonView.set({
                            label: buttonLabel,
                            icon: buttonIcon,
                            tooltip: true,
                            isToggleable: true,
                        });

                        splitButtonView
                            .bind('isOn')
                            .to(parentCommand, 'value', (value) => !!value);
                        return dropdownView;
                    };
                }

                // A helper that returns a function (factory) that creates individual buttons used by users to change styles
                // of lists.
                //
                // @param {Object} options
                // @param {module:core/editor/editor~Editor} options.editor
                // @param {module:list/liststylecommand~ListStylesCommand} options.listStyleCommand The instance of the `ListStylesCommand` class.
                // @param {'bulletedList'|'numberedList'} options.parentCommandName The name of the higher-order command associated with a
                // particular list style (e.g. "bulletedList" is associated with "square" and "numberedList" is associated with "roman").
                // @returns {Function} A function that can be passed straight into {@link module:ui/componentfactory~ComponentFactory#add}.
                function getStyleButtonCreator({
                    editor,
                    listStyleCommand,
                    parentCommandName,
                }) {
                    const locale = editor.locale;
                    const parentCommand =
                        editor.commands.get(parentCommandName);

                    // @param {String} label The label of the style button.
                    // @param {String} type The type of the style button (e.g. "roman" or "circle").
                    // @param {String} icon The SVG string of an icon of the style button.
                    // @param {String} tooltip The tooltip text of the button (shorter than verbose label).
                    // @returns {module:ui/button/buttonview~ButtonView}
                    return ({ label, type, icon, tooltip }) => {
                        const button = new ButtonView(locale);

                        button.set({ label, icon, tooltip });

                        listStyleCommand.on('change:value', () => {
                            button.isOn = listStyleCommand.value === type;
                        });

                        button.on('execute', () => {
                            // If the content the selection is anchored to is a list, let's change its style.
                            if (parentCommand.value) {
                                // If the current list style is not set in the model or the style is different than the
                                // one to be applied, simply apply the new style.
                                if (listStyleCommand.value !== type) {
                                    editor.execute('listStyle', { type });
                                }
                                // If the style was the same, remove it (the button works as an off toggle).
                                else {
                                    editor.execute('listStyle', {
                                        type: listStyleCommand._defaultType,
                                    });
                                }
                            }
                            // If the content the selection is anchored to is not a list, let's create a list of a desired style.
                            else {
                                editor.model.change(() => {
                                    editor.execute(parentCommandName);
                                    editor.execute('listStyle', { type });
                                });
                            }

                            editor.editing.view.focus();
                        });

                        return button;
                    };
                }
            },
        });
    }
}
