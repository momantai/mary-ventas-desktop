<template>
    <stack-modal :show="true" title="Pagar" @close="$emit('cancel'), efectivo = 0.0" :modal-class="{ [classModal]: true }">
        <div slot="default">
        <label>El cliente ha pagado con (Ingrese cantidad)
            <div class="grid-x">
            <!-- <money class="no-margin box-currency" v-model="cash" @keyup.native.enter="pay"></money> -->
            <input class="no-margin box-currency" ref="inputcash" v-model.lazy="cash" v-money="money" @keyup.enter="pay">
            </div>
        </label><br/><br/><span>
            <div class="grid-x">
            <div class="cell small-9 text-right"><b style="font-size: 1.1em;"> Cambio:</b></div>
            <div class="cell small-3 text-center"><span style="font-size: 1.1em; color: green;">${{ change() }}</span></div>
            </div></span><span>
            <div class="grid-x">
            <div class="cell small-9 text-right"><b style="font-size: 1.1em;">Restan:</b></div>
            <div class="cell small-3 text-center"><span style="font-size: 1.1em;">${{ remain() }}</span></div>
            </div></span><span>
            <div class="grid-x">
            <div class="cell small-9 text-right"><b style="font-size: 1.1em;">Total:</b></div>
            <div class="cell small-3 text-center"><span style="font-size: 1.1em; color: green;">${{ total }}</span></div>
            </div></span>
        </div>
        <div slot="modal-footer"></div>
    </stack-modal>
</template>

<script>
import StackModal from '@innologica/vue-stackable-modal';
import { VMoney } from 'v-money';

export default {
    name: 'PayPurchase',
    components: { StackModal },
    props: ['payable'],
    data() {
        return {
            classModal: 'modal-border-0',
            cash: 0,
            total: parseFloat(this.payable),
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
        remain: function() {
            const remain = Math.round(this.total - this.cashc());
            return remain >= 0 ? remain : 0;
        },
        change: function() {
            const change = Math.round(this.cashc() - this.total);

            return change >= 0 ? change : 0;
        }, 
        pay: function() {
            if(this.remain() > 0) {
                alert("La venta no se puedo realizar porque la cantidad \n que ingreso es menor a la cantidad ha pagar.");

                return;
            }

            if(confirm(`¿Desea continuar?\nCambio:\t $${this.change()} MXN\nPago:\t\t $${this.cashc()} MXN\nTotal:\t\t $${this.total} MXN`)) {
                this.$emit('pay', {
                    cash: this.cashc(),
                    change: this.change()
                });
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