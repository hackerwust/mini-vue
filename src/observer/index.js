import Dep from './dep.js';

class Observer {
    constructor (data) {
        this.data = data;
        this.walk(data);
    }

    walk (data) {
        if (Array.isArray(data)) {
            this.observeArray(data);
        } else {
            this.observe(data);
        }
    }

    observe (data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
            // 对value也进行响应式拦截
            this.walk(data[key]);
        });
    }

    observeArray (data) {
        data.forEach(val => {
            this.walk(val);
        });
    }

    defineReactive (obj, key, value) {
        const dep = new Dep();
        let oldValue = value;
        const self = this;
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 收集依赖，在watch取值会触发这里的get，
                // 提前将watcher实例保存到Dep.target以便这里能去到对应的watcher
                dep.addSub(Dep.target);
                return oldValue;
            },
            set (newValue) {
                if (newValue === oldValue) {
                    return;
                }
                self.walk(newValue);
                oldValue = newValue;
                dep.notify();
            }
        });
    }
}

export default Observer;