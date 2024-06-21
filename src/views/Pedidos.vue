<template>
  <div>
    <div>
      <div class="container">
        <!-- O formulário de pedidos precisa ser inserido em um botão. -->
        <!-- A tela de pedidos precisa ser apenas uma planilha com os pedidos já feitos -->
        <PedidosForm />
      </div>
    </div>
  </div>
</template>

<script>
import PedidosForm from "../components/PedidosForm.vue";

export default {
  name: "Pedidos",
  components: {
    PedidosForm,
  },
};
</script>
