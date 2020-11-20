import axios from 'axios'
import Vue from 'vue';
import money from 'v-money'
import App from './component/App.vue';

Vue.use(money, {precision: 2, prefix: 'MXN$ ', decimal: '.', thousands: ','})

new Vue({
    render: h => h(App)
}).$mount('#app');