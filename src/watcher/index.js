import Dep from '../observer/dep.js';

export default class Watcher {
    constructor (vmContext, expr, cb) {
        this.vm = vmContext;
        this.expr = expr;
        this.cb = cb;
        this.get();
    }

    /**
     *
     * @param {*} vm
     * @param {*} expr like 'data.user.name'
     */
    getVal (vm, exprs) {
        exprs.map(expr => {
            expr = expr.split('.');
            return expr.reduce((prev, next) => {
                if (!prev || typeof prev !== 'object') {
                    return undefined;
                }
                return prev[next];
            }, vm.$data);
        });
    }

    get () {
        Dep.target = this;
        this.getVal(this.vm, this.expr);
        Dep.target = null;
    }

    update () {
        this.cb && this.cb();
    }
}