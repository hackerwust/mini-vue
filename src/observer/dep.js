
let uid = 0;
export default class Dep {
    constructor () {
        this.subs = [];
        this.uid = uid++;
    }

    addSub (watcher) {
        this.subs.push(watcher);
    }

    notify () {
        this.subs.forEach(item => {
            item && item.update && item.update();
        });
    }
}