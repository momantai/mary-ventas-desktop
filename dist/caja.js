function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxx3xxx-xx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  const StackModal = require('@innologica/vue-stackable-modal')
  Vue.component(StackModal)
  
  caja = new Vue({
    el: '#app',
    data: {
      carrito: [],
      codigo: null,
      showModal: false,
      showCobrar: false,
      efectivo: null,
      acobrar: null,
      comprobante:  null,
      url: 'http://localhost:8000/api/'
    },
    methods: {
      ini_cancelar_compra() {
        if(this.carrito != []) {
          // this.showModal = true
          // this.$modal.show('cancelar')
        }
      },
      cancelar_compra() {
        this.carrito = []
        // this.$modal.hide('cancelar')
        // cb()
        console.log("cb")
        // cb()
  
        this.$refs.cod.focus()
      },
      terminar_compra() {
        subtotal = 0
        this.carrito.forEach(p => {
          subtotal += p.cantidad * p.precio
        })
  
        if(subtotal > 0) {
          this.acobrar = subtotal
          this.showCobrar = true
        }
      },
      cobrar_compra() {
        if(this.acobrar > 0) {
          if(this.efectivo >= this.acobrar) {
            let cambio = parseFloat(this.efectivo) - parseFloat(this.acobrar)
            this.comprobante = create_UUID()
            console.log('Cambio: $' + parseFloat(cambio))
  
            axios.get(this.url + 'venta', {
              params: {
                'total': parseFloat(this.acobrar),
                'comprobante': this.comprobante,
                'venta': {
                  productos: this.carrito
                }
              }
            })
              .then((r) => {
                console.log(r)
              })
          }
        }
        this.showCobrar = false
        // Agregar mensaje de ticket
  
        this.carrito = []
        this.codigo = null
        this.efectivo = null
  
        this.$refs.cod.$el.focus()
      },
      registrar() {
        alert(this.codigo)
      },
      buscar_codigo() {
        axios.get(this.url + 'product', {
          params: {
            'codigo': this.codigo
          } 
        })
          .then((r) => {
            r.data.cantidad = 1
            this.carrito.push(r.data)
          })
  
          this.codigo = null
      },
      funcion(evento) {
        console.log(evento.keyCode)
      },
      total_a_cobrar() {
        subtotal = 0
        this.carrito.forEach(p => {
          subtotal += p.cantidad * p.precio
        })
  
        return subtotal
      }
    },
    computed: {
      total() {
        subtotal = 0
        this.carrito.forEach(p => {
          subtotal += p.cantidad * p.precio
        })
  
        return subtotal
      },
      cantidad_articulos() {
        cnt_artic = 0
  
        this.carrito.forEach(a => {
          cnt_artic += parseInt(a.cantidad)
        })
  
        return cnt_artic
      }
    }
  });
  