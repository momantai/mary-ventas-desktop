<template>
  <div>
    <div class="cabecera">
      <h3>Cierre de caja</h3>
    </div>

    <div id="datos">
      <label for="empleado">Empleado</label>
      <input type="text" :value="user.name" disabled />
      <label for="apertura">Apertura $</label>
      <input type="number" :value="resumen.apertura" disabled />
      <label for="ventas">Ventas del día $</label>
      <input type="number" :value="resumen.ventas" disabled />
      <label for="cierre">Cierre $</label>
      <input type="number" id="cierre" v-model="resumen.cierre" />
      <label for="desvalance">Desvalance $</label>
      <input type="number" :value="desvalance" disabled />
    </div>
    <p>
      En caso de haber discrepacias con el desvalance, contacte a su superior.
      <br />
      Recuerde que al cerrar caja se le enviara una notificación a su
      supervisor.
    </p>
    <div class="pies">
      <div>
        <p>
          Los datos son correctos
          <label><b>Aceptar</b> <input type="checkbox" v-model="continuar" /> </label>
        </p>
      </div>
      <div>
        <button class="cancelar" @click="cancelCashier()">Cancelar</button>
        <button :disabled="continuar == 0" @click="closeCashier()">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + session.tokenHandler();

export default {
  data() {
    return {
      url: "http://localhost:8000/api/",
      user: {
          name: 'Cargando..'
      },
      resumen: {},
      continuar: 0
    };
  },
  methods: {
    closeCashier() {
        // alert("Cerrando caja!");
        axios.post(`${this.url}ventas/caja/cerrar`, {
          caja: this.resumen.id,
          cierre: this.resumen.cierre,
          desvalance: this.resumen.desvalance
        })
          .then((r) => {
            if(!r.data.estado) {
              alert(r.data.mensaje);
            }

            if(r.data.estado) {
              alert('¡Datos actualizados correctamente!\nGracias, hasta luego.');
              session.closeSessionHandler();
              appAuth.createWinAuth();
              remote.getCurrentWindow().close();
            }
          })
    },
    cancelCashier() {
      appWindow.createAppWindow();
      remote.getCurrentWindow().close();
    }
  },
  computed: {
      desvalance: function() {
          this.resumen.desvalance = parseFloat(this.resumen.cierre) - (parseFloat(this.resumen.ventas) + parseFloat(this.resumen.apertura));

          return this.resumen.desvalance;
      }
  },
  mounted() {
    axios.post(`${this.url}auth/me`)
        .then((r) => {
          this.user = r.data;
        })
        .catch((err) => console.log(err));
    
    axios.post(`${this.url}ventas/caja/resumen`)
        .then((r) => {
          this.resumen = r.data;
        })
        .catch((err) => console.log(err));
  }
};
</script>