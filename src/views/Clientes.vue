<template>
  <div>
    <div class="container">
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
