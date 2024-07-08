<template>
  <div>
    <div>
      <div class="container">
        <h1>Registrar venda:</h1>
        <!-- O formulário de pedidos precisa ser inserido em um botão. -->
        <!-- A tela de pedidos precisa ser apenas uma planilha com os pedidos já feitos -->
        <FormularioPedidos />
      </div>
    </div>
  </div>
</template>

<script>
import FormularioPedidos from "../components/FormularioPedidos.vue";

export default {
  name: "Pedidos",
  components: {
    FormularioPedidos,
  },
};
</script>
