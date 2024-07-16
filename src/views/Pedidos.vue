<template>
  <div>
    <div>
      <div class="container">
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
