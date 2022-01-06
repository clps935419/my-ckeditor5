import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
export class InsertTextIcons extends Plugin {
    init() {
        const editor = this.editor;
        const targetIcons = ['【】', '，','--'];
        targetIcons.forEach((item,index,arr) => {
            editor.ui.componentFactory.add(`InsertTextIcon${index}`, (locale) => {
                const view = new ButtonView(locale);
                const target = item;

                view.set({
                    label: target,
                    withText: true,
                    tooltip: true,
                });

                view.on('execute', () => {
                    editor.model.change((writer) => {
                        const insertPosition =
                            editor.model.document.selection.getFirstPosition();
                        writer.insertText(target, insertPosition);
                    });
                });
                return view;
            });
        });
    }
}
