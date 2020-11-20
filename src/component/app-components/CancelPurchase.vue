<template>
    <!-- <div> -->
        <stack-modal :show="true" title="Cancelar compra" @close="$emit('cancel')" :modal-class="{ [modalC_cancelar]: true }">
          <div slot="default">
            <p>¿Estas seguro de que deseas cancelar esta compra?</p>
          </div>
          <div slot="modal-footer">
            <div class="grid-x align-center">
              <div class="cell small-6">
                <div class="grid-x align-end">
                  <div class="cell small-6">
                    <button class="button" @click="$emit('cancel')">Cancelar</button>
                  </div>
                  <div class="cell small-6">
                    <button ref="continuar" class="cancelar button" @click="$emit('continue')">Continuar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </stack-modal>
    <!-- </div> -->
</template>

<script>
import StackModal from '@innologica/vue-stackable-modal';

export default {
    name: 'CancelPurchase',
    components: {StackModal},
    data() {
      return {
        modalC_cancelar: 'modal-border-0'
      }
    },
    methods: {

    },
    mounted() {
      this.$refs.continuar.focus();
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
</style>