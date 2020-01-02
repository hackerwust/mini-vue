import MiniVue from '../src/index.js';

new MiniVue({
    el: '#app',
    data: {
        user: {
            name: '张三',
            age: 20,
            city: '北京'
        },
        count: 0
    },
    mounted () {
        setInterval(() => {
            this.count++;
        }, 1000);
    }
});