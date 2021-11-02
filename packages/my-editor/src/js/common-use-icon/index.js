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
export class InsertTextIcon3 extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('InsertTextIcon3', (locale) => {
            const view = new ButtonView(locale);
            const _this = this;
            view.set({
                label: '彈',
                withText: true,
                tooltip: true,
                // icon: imageIcon,
                // tooltip: true,
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
        // 在弹窗中触发命令
        // this.editor.execute();
    }
}
