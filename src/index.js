import Observer from './observer/index.js';
import Compile from './compile/index.js';

const noop = () => {};

class MiniVue {
    constructor (options) {
        this.$el = options.el;
        this.$data = options.data;
        this.initLifeCycle(options);
        this.proxyData(this.$data);

        if (this.$el) {
            new Observer(this.$data);
            new Compile(this);
            this.$mounted();
        }
    }

    initLifeCycle (options) {
        this.$mounted = options.mounted || noop;
    }

    // 对this.$data代理，让this[xxx]指向this.$data[xxx]
    proxyData (data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get () {
                    return data[key];
                },
                set (value) {
                    data[key] = value;
                }
            });
        });
    }
}
export default MiniVue;