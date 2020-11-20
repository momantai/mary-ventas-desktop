<template>
    <stack-modal :show="true" title="Abrir Caja" :modal-class="{ [classModal]: true }">
        <div slot="default">
            <label>
                <h4>
                    Ingrese la cantidad inicial en caja
                </h4>
                <div class="grid-x">
                    <input class="no-margin box-currency" ref="inputcash" v-model.lazy="cash" v-money="money" @keyup.enter="continueRegister">
                </div>
            </label>
            <div class="text-right mb-2">
                <button class="btn btn-primary mb-2" @click="continueRegister">Continuar</button>
            </div>
        </div>
        <div slot="modal-footer" class="m-0"></div>
    </stack-modal>
</template>

<script>
import axios from 'axios';
import StackModal from '@innologica/vue-stackable-modal';
import { VMoney } from 'v-money';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken();

export default {
    name: 'CashRegister',
    components: { StackModal },
    data() {
        return {
            classModal: 'modal-border-0',
            cash: 0,
            url: 'http://localhost:8000/api/',
            money: {
                decimal: '.',
                thousands: '',
                prefix: 'MXN$ ',
                suffix: '',
                precision: 2
            }
        }
    },
    directives: {
        money: VMoney
    },
    methods: {
        continueRegister: function() {
            if(confirm(`Su apertura de caja es de ${this.cash}\n ¿Esta seguro de continuar?`)) {
                axios.post(`${this.url}ventas/caja/apertura`, {
                    cash: this.cashc()
                })
                    .then((r) => {
                        if(r.data.estado) {
                            alert('¡Bienvenido!')

                            this.$emit('openbox', r.data);
                        } else {
                            alert('¡Ocurrio un error!\nSe iniciara sin registro de apertura de caja.')
                        }
                    })
                    .catch((err) => alert('¡Ocurrio un error!\nVuelve a intentarlo.'));
            }
            
            return;
        },
        cashc() {
            return (this.cash).toString().split(" ")[1];
        }

    },
    mounted() {
        this.$refs.inputcash.focus();
    }
}
</script>