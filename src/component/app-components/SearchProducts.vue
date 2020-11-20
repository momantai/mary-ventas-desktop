<template>
<div>

    <stack-modal :show="windowOpen" title="Buscar producto" @close="closeWindow()" :modal-class="{ [modalClass]: true }">
        <div slot="default">
            <div class="grid-container">
                <div class="grid-x">
                    <div class="cell small-6">
                        <!-- Input para buscar producto por nombre -->
                        <input autofocus type="text" ref="buspro" v-model="querySearch" placeholder="Nombre del producto">
                    </div>
                    <div class="cell small-3" style="margin-left: 15px;">
                        <!-- Boton para realizar busqueda -->
                        <button class="button primary no-margin">Buscar</button>
                    </div>
                    <div class="cell large-12 boxes grid-x">
                        <!-- Caja de resultados de busqueda -->
                        <div class="cell large-12 grid-x grid-padding-y"
                            style="font-weight: bold; background-color: #79e9bc; color: darkslategray; border-radius: 5px 5px 0 0;">
                            <div class="cell large-2 padding-left">Código</div>
                            <div class="cell large-6 padding-left">Producto</div>
                            <div class="cell large-2 padding-left">Precio</div>
                            <div class="cell large-2 padding-left">Stock</div>
                        </div>
                        <div class="cell grid-x products-height">
                            <!-- Items del resultado de la busqueda -->
                            <div class="cell large-12 grid-x grid-padding-y option-element"
                                :key="key" v-for="(res, key) in responseSearch" @click="addToCart(key)">
                                <div class="cell large-2 padding-left">{{ res.codigo }}</div>
                                <div class="cell large-6 padding-left">{{ res.producto }}</div>
                                <div class="cell large-2 padding-left">${{ res.precio }}</div>
                                <div class="cell large-2 padding-left">{{ res.stock }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="modal-footer">
            <p style="text-align: center;">ESC = Salir</p>
        </div>
    </stack-modal>
</div>
</template>

<script>
import axios from 'axios';
import StackModal from '@innologica/vue-stackable-modal';

export default {
    // props: ['open_window'],
    components: {
        StackModal
    },
    data() {
        return {
            responseSearchToSelect: [],
            querySearch: '',
            url: 'http://localhost:8000/api/',
            windowOpen: true,
            modalClass: 'modal-fullscreen'
        }
    },
    created: function() {
        this.$refs.buspro.focus();
    },
    methods: {
        closeWindow: function() {
            this.$emit('close');
        },
        addToCart: function (key) {
            this.$root.$emit('addToCart', {
                product: this.responseSearchToSelect[key]
            });

            this.closeWindow();
        }
    },
    computed: {
        responseSearch: function() {
            if (this.querySearch.trim() == '' && this.querySearch.length < 3) {
                this.responseSearchToSelect = [];
                return [];
            }

            axios.get(`${this.url}product-search`, {
                params: {
                    'articulo': this.querySearch
                }
            })
                .then((res) => {
                    this.responseSearchToSelect = res.data;
                })
                .catch((err) => console.log(err));

            return this.responseSearchToSelect;
        }

    },
    mounted() {
        this.$refs.buspro.focus();
    }
}
</script>

<style scoped>
    input[type="text"], button {
        border-radius: 5px;
    }

    .option-element:hover {
        cursor: pointer;
        background-color: aliceblue;
    }

</style>