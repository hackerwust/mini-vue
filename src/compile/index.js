import compileTextNode from './compileTextNode.js';
import compileElementNode from './compileElementNode.js';

export default class Compile {
    constructor (miniVm) {
        const el = miniVm.$el;
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = miniVm;
        if (this.el) {
            const fragment = this.copyToFragment(this.el);
            this.compileNode(fragment);

            this.el.appendChild(fragment);
        }
    }

    isElementNode (el) {
        return el && el.nodeType === 1;
    }

    isTextNode (el) {
        return el && el.nodeType === 3;
    }

    // node.firstchild & node.childNodes会保留空白节点，避免使用node.children
    copyToFragment (el) {
        let fragment = document.createDocumentFragment();
        let firstChild = null;
        while ((firstChild = el.firstChild)) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }

    compileNode (fragment) {
        const childNodes = Array.prototype.slice.call(fragment.childNodes, 0);
        childNodes.forEach((node) => {
            // dom节点
            if (this.isElementNode(node)) {
                compileElementNode(node, this.vm);
                this.compileNode(node);
            // 文本节点
            } else if (this.isTextNode(node)) {
                compileTextNode(node, this.vm);
            }
        });
    }
}