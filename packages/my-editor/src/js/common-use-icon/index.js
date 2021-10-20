import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
export class InsertTextIcon1 extends Plugin {
    init() {
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
export class InsertTextIcon2 extends Plugin {
    init() {
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
