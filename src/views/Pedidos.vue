<template>
  <div>
    <div>
      <div class="container">
        <h1>Registrar venda:</h1>
        <!-- O formulário de pedidos precisa ser inserido em um botão. -->
        <!-- A tela de pedidos precisa ser apenas uma planilha com os pedidos já feitos -->
        <PedidosDB />
      </div>
    </div>
  </div>
</template>

<script>
import PedidosDB from "../components/PedidosDB.vue";

export default {
  name: "Pedidos",
  components: {
    PedidosDB,
  },
};
</script>
