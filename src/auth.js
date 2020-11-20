import axios from 'axios'
import Vue from 'vue';
import Auth from './component/Auth.vue';

new Vue({
    render: h => h(Auth)
}).$mount('#app');