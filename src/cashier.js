import axios from 'axios'
import Vue from 'vue';
import Auth from './component/Cashier.vue';

new Vue({
    render: h => h(Auth)
}).$mount('#app');