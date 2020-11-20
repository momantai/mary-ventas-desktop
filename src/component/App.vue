
<template>
  <div>
    <div class="grix-x header">
      <div class="grid-container grid-x align-middle align-justify" style="height: 100%;">
        <div>Mary Ventas Desktop App</div>
        <!-- <div id="menu-user" title="Opciones"><a style="color: #FFF;">Momantai </a><img src="https://image.flaticon.com/icons/svg/1177/1177568.svg" width="20px"/></div> -->
          <div id="menu-user" title="Opciones" tabindex="0">
            <a style="color: #FFF;">{{ user.name }}</a>
            <img src="https://image.flaticon.com/icons/svg/1177/1177568.svg" width="20px" />
            <div id="menu-user-items">
                <div @click="finishedCashier();">
                  Terminar jornada
                </div>
                <div @click="finishedSession();">
                  Salir
                </div>
            </div>
          </div>

      </div>
    </div>
    <div class="contenerdor grid-container">
      <div class="grid-x grid-padding-x">
        <SearchProducts v-if="showModal" @close="showModal = false"/>
        <CalcelPurchase v-if="showCancel" @cancel="showCancel = false, cancel_cancel()" @continue="cancelar_compra" />
        <PayPurchase v-if="showPay" @cancel="showPay = false" @pay="payPurchase" :payable="payable" />
        <CashRegister v-if="showCashier" @openbox="openCashier" />
        <div class="cell large-8 color-1">
          <div class="grid-x">
            <div class="cell large-12 grid-x">
              <div class="cell large-12 head-check boxes grid-x align-middle" style="margin-bottom: 20px;">
                <div class="cell large-7 grid-x align-middle align-center">
                  <div class="google">
                    <input autofocus class="no-margin box-code" id="code-box" type="text" ref="cod" v-model="codigo" v-on:keyup.13="searchProduct()" @keyup.115="showCancel = true" @keyup.117="finishPurchase()" @keyup.113="showModal = true" style="width: 300px; border-radius: 5px 0 0 5px;" placeholder="Codigo del producto"/>
                    <button class="button no-margin boton-buscador" @click="searchProduct()" style="border-radius: 0 5px 5px 0;"><img src="https://i.ibb.co/wNHcFP4/search.png" width="23px" alt=""/></button>
                  </div>
                </div>
                <div class="cell large-5 grid-x align-middle align-spaced">
                  <button @click="showModal = true" style="cursor: pointer;">Buscar por nombre</button>
                  <button class="cancelar button no-margin" @click="showCancel = true">Cancelar Venta</button>
                </div>
              </div>
              <div class="cell large-12 boxes grid-x">
                <div class="cell large-12 grid-x grid-padding-y" style="font-weight: bold; background-color: #79e9bc; color: darkslategray; border-radius: 5px 5px 0 0;">
                  <div class="cell large-6 padding-left">Producto</div>
                  <div class="cell large-2 padding-left">Precio</div>
                  <div class="cell large-2 padding-left">Cantidad</div>
                  <div class="cell large-2 padding-left">SubTotal</div>
                </div>
                <div class="cell grid-x products-height">
                  <div class="cell large-12 grid-x grid-padding-y" :key="key" v-for="(product, key) in carrito">
                    <div class="cell large-6 padding-left">{{ product.producto }}</div>
                    <div class="cell large-2 padding-left">${{ product.precio }}</div>
                    <div class="cell large-2 padding-left">
                      <input class="input-cantidad" type="number" min="0" name="" value="1" v-model="product.cantidad"/>
                    </div>
                    <div class="cell large-2 padding-left">${{ product.precio * product.cantidad }}</div>
                  </div>
                  <div class="cell large-12 grid-x" v-if="carrito.length == 0">
                    <div class="cell large-12 text-center"><br/>
                      <h4>Aun sin productos en el carrito :)</h4><img src="https://image.flaticon.com/icons/svg/1656/1656507.svg" width="120px" alt=""/><br/><br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cell large-4 color-2">
          <div class="grid-x">
            <div class="cell large-12 grid-x boxes color-3">
              <div class="cell large-12">
                <div class="cell large-12 grid-x align-center grid-padding-y" style="padding: 0 20px;">
                  <h5 class="cell large-6 border-bottom">Bienvenido</h5>
                  <h5 class="cell large-6 border-bottom"></h5>
                  <h5 class="cell large-6 border-bottom">Artículos</h5>
                  <h5 class="cell large-6 border-bottom text-right">{{ cant_articulos }}</h5>
                  <h5 class="cell large-6">TOTAL</h5>
                  <H5 class="cell large-6 text-right"><span style="font-weight: bold; color: #f55;">${{ total }}</span></H5>
                </div>
                <div class="cell large-12 grid-x" style="border-top: 1px solid rgba(0, 0, 0, 0.1);"></div>
              </div>
              <div class="cell large-12 text-center">
                <input class="button large success shadow" type="button" @click="finishPurchase()" value="TERMINAR VENTA" style="border-radius: 5px; font-weight: bolder; color:darkslategray; height: 55px; width: 250px;"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import StackModal from '@innologica/vue-stackable-modal';
import SearchProducts from './app-components/SearchProducts.vue';
import CalcelPurchase from './app-components/CancelPurchase.vue';
import PayPurchase from './app-components/PayPurchase.vue';
import CashRegister from './app-components/CashRegister.vue';
import nuevo from './app-components/NComponente.vue';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionToken();

export default {
    components: {
      StackModal,
      SearchProducts,
      CalcelPurchase,
      PayPurchase,
      CashRegister
    },
    data() {
        return {
            carrito: [],
            codigo: null,
            showModal: false,
            showCancel: false,
            showCobrar: false,
            showPay: false,
            showCashier: false,
            efectivo: 0.0,
            payable: null,
            paydata: null,
            ticket_number: null,
            url: 'http://localhost:8000/api/',
            show: false,
            show_cancelar: false,
            show_vender: false,
            modalClass: 'modal-fullscreen',
            buscarNombre: "",
            res_busqueda: [],
            user: {
              name: 'Cargando..'
            }
        }
    },
    methods: {
        existInCart(identify) {
          let existIn = this.carrito.findIndex((item) => item.id == identify);

          if(existIn >= 0) {
            return {response: true, index: existIn};
          }

          return {response: false};
        },
        addToCart(item) {
          let existIn = this.existInCart(item.id);
          
          if(existIn.response) {
            this.carrito[existIn.index].cantidad = parseInt(this.carrito[existIn.index].cantidad) + 1;
            return null;
          }

          item.cantidad = 1;
          this.carrito.push(item);
        },
        searchProduct() {
            axios.get(`${this.url}product`, {
              params: {'codigo': this.codigo}
            })
              .then((res) => {
                this.addToCart(res.data);
              })
              .catch((err) => console.log(err));

            this.codigo = null
        },
        payPurchase(values) {
          this.ticket_number = create_UUID();

          axios.get(`${this.url}venta`, {
            params: {
              total: parseFloat(this.payable),
              pago: values.cash,
              cambio: values.change,
              comprobante: this.ticket_number,
              venta: {
                productos: this.carrito
              }
            }
          })
            .then((res) => {
              ticket.createTicket();

              sleep(300).then(()=> {
                ticket.sendToTicket(res.data);
              });
              // this.ticket(res.data);

              this.cancelar_compra();
            })
            .catch((err) => {
              console.log(err);
              alert("No se puede realizar la venta, ocurrio un error!");
            });
          this.showPay = false;
        },
        ticket(data) {
          sleep(300).then(()=> {
            sendToTicket(data);
          });
        },
        ini_cancelar_compra() {
            if (this.carrito.length >= 1) {
                this.show_cancelar = true
            }
        },
        cancelar_compra() {
            this.carrito = [];
            this.showCancel = false;

            this.$refs.cod.focus();
        },
        cancel_cancel() {
          this.$refs.cod.focus();
        },
        finishPurchase() {
            let subtotal = 0;

            this.carrito.forEach(p => {
                subtotal += p.cantidad * p.precio;
            });

            if (subtotal > 0) {
                this.payable = subtotal;
                this.showPay = true;
            }
        },
        finishedSession() {
          if(confirm("¿Esta seguro que desea terminar su sesión?")) {
            sessionClose();
          }
        },
        openCashier(data) {
          this.showCashier = false;
        },
        finishedCashier() {
          if(confirm("Estas apunto cerrar caja..\n¿Estás seguro?")) {
            closeCashier();
          }
        }
    },
    computed: {
        total: function() {
            let subtotal = 0
            this.carrito.forEach(p => {
                subtotal += p.cantidad * p.precio
            })

            return subtotal
        },
        cant_articulos: function() {
          return this.carrito.reduce((pre, curr) => {
            return pre += parseInt(curr.cantidad);
          }, 0);
        }
    },
    mounted() {
      // Recibe un producto desde el componente SearchProducts y lo agrega al carrito.
      this.$root.$on('addToCart', item => {
        this.addToCart(item.product);
        this.$refs.cod.focus();
      });

      axios.post(`${this.url}ventas/caja/check`)
        .then((r) => {
          if(r.data.estado) {
            alert('¡Tiene una caja activa, contacte al administrador!\nSino es un error, ignore este mensaje.');
          } else {
            this.showCashier = true;
          }
        })
        .catch((err) => console.log(err));

      axios.post(`${this.url}auth/me`)
        .then((r) => {
          this.user = r.data;
        })
        .catch((err) => console.log(err));
    }
}
</script>
<style>
  @media (min-width: 768px) {
	 .modal-xl {
		 max-width: 900px;
	}
	 .modal-xxl {
		 max-width: 1040px;
	}
	 .modal-xxxl {
		 max-width: 1180px;
	}
	 .modal-90per {
		 max-width: 90%;
	}
}
 .modal-fullscreen {
	 max-width: 100%;
	 width: 100%;
	 margin: 0;
	 height: 100%;
}
 .modal-fullscreen .modal-body {
	 padding: 0;
}
 .modal-fullscreen .modal-content {
	 height: 100%;
}
 .modal-fullscreen.aside .modal-content {
	 height: auto;
}
 .modal-fullscreen.modal-dialog.aside.modal-stack1 .modal-content {
	 transform: scale(1) translate(0, 0) !important;
}
 .modal-dialog.modal-border-0 .modal-content {
	 border: none;
}
 @media screen and (min-width: 800px) {
	 .modal-dialog.modal-xxl {
		 width: 98%;
		 max-width: 1040px;
	}
}
 @media screen and (min-width: 640px) {
	 .modal-dialog.modal-xxl {
		 width: 98%;
		 max-width: 1040px;
	}
}
 @media screen and (max-width: 420px) {
	 .modal-dialog, .modal-content {
		 overflow: auto;
	}
}

.google {
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	display: flex;
}

.google input {
	border: 0;
}

.button {
	padding: 0.8em 1em;
}

.boton-buscador {
	padding: 0 10px;
	background: #79e9bc7a;
}
	.boton-buscador:hover {
		background: rgb(62, 190, 139);
	}

	.cancelar {
		background-color: #ff6161;
		border-radius: 5px;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
		color: #FFF;
		font-weight: bolder;
	}
		.cancelar:hover {
			background: #ff4444;
    }
    
/** Menu flotante */
#menu-user {
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.4);
    padding: 5px; border-radius: 5px; background: #03a9f4;
    cursor: pointer;
    position: relative;
}
    #menu-user:hover {
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.4);
    }

    #menu-user-items {
        display: none;
        position: absolute;
        width: 200px;
        min-height: 80px;
        background-color: white;
        right: 0;
        top: 38px;
        box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
      }
        #menu-user-items div {
          padding: 10px 10px;
        }
            #menu-user-items div:hover, #menu-user-items div:hover a  {
                background-color: #03a9f4;
                color: #fff !important;
                display: inline-block;
                width: 100%;
            }
        
        #menu-user:focus #menu-user-items, #menu-user-items:hover {
            display: block;
        }

/*Menu flotante*/

.menu-flotante {
    background-color: #fff;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    position: fixed;
    top: 0px;
    left: -350px;
    height: 100vh;
    width: 350px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: left 0.1s linear;
}
.open-menu {
    transition: left 0.1s linear;
    left: 0;
}

    .menu-flotante a {
        line-height: 3rem;
        display: block;
    }

    .button-menu {
        height: 35px;
        width:  35px;
        /* background-color: red; */
        /* position: absolute; */
        top: 3px;
        right: 5px;
        background-image: url(/image/menu.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
    }
        .open-menu .button-menu {
            background-image: url(/image/close.svg);
        }
        .button-menu:hover {
            opacity: 0.5;
        }
        .menu-flotante .button-menu {
            position: absolute;
        }
</style>