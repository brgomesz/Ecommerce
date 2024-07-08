<template>
  <div>
    <div class="container">
      <h1>Cadastro de clientes</h1>
      <CadastroClientes />
    </div>
  </div>
</template>

<script>
import CadastroClientes from "../components/CadastroClientes.vue";

export default {
  name: "Clientes",
  components: {
    CadastroClientes,
  },
};
</script>
