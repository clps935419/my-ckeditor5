// link-form.js

import Dialog from './dialog.js';
// import '@/css/test.css';

export default class LinkForm {
    constructor(props) {
        Object.assign(
            this,
            {
                value: undefined, // 初始值
                onSubmit: () => {},
            },
            props || {}
        );

        this.render();
    }

    render() {
        const content = template(this.value);
        this.$form = new Dialog({
            content,
            width: '420px',
            onSubmit: this._submit.bind(this),
        });

        const dialog = this.$form.$pop;
        this.$select = dialog.querySelectorAll(`select[name=linkValue]`);
        this.$cleanButton = dialog.querySelector('.link-form-button');

        this._bind();
    }

    destroy() {
        this._unbind();
    }

    _bind() {
        // this.$cleanButton.addEventListener(
        //     'click',
        //     this._handleCleanup.bind(this)
        // );
    }

    _unbind() {
        try {
            this.$cleanButton.removeEventListener(
                'click',
                this._handleCleanup.bind(this)
            );
        } catch (e) {
            console.error('LinkForm Unbind Error: ', e);
        }
    }

    _submit() {
        if (typeof this.onSubmit !== 'function') {
            return;
        }
        let tmpDataArr = [];
        console.log('ie', this.$select);

        this.$select.forEach((item) => {
            console.log('ie',item.value);
            tmpDataArr.push(item.value);
        })
        return this.onSubmit(tmpDataArr);
    }

    _handleCleanup() {
        this.$input.value = '';
    }
}

function template(initialValue) {
    const dataArr =['一','甲'];
    const body = `
    <div class="link-form">
      <div>
        <span>第一層</span>
        <span>
            <select name=linkValue>
                <option value ="a">一、二</option>
                <option value ="b">甲、乙</option>
                <option value ="c">1、2</option>
                <option value ="d">子</option>
            </select >
        </span>
      </div>  
      <div>
        <span>第二層</span>
        <span>
            <select name=linkValue>
                <option value ="a">一、二</option>
                <option value ="b">甲、乙</option>
                <option value ="c">1、2</option>
                <option value ="d">子</option>
            </select>
        </span>
      </div> 
      <div>
        <span>第三層</span>
        <span>
            <select name=linkValue>
                <option value ="a">一、二</option>
                <option value ="b">甲、乙</option>
                <option value ="c">1、2</option>
                <option value ="d">子</option>
            </select>
        </span>
      </div> 
      <div>
        <span>第四層</span>
        <span>
            <select name=linkValue>
                <option value ="a">一、二</option>
                <option value ="b">甲、乙</option>
                <option value ="c">1、2</option>
                <option value ="d">子</option>
            </select>
        </span>
      </div> 
    </div>
  `;

    return {
        classes: 'link-form-dialog',
        title: '請選擇樣式',
        body,
    };
}
