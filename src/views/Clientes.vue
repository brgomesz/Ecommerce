<template>
  <div>
    <div class="container">
      <h1>Cadastro de clientes</h1>
      <ClientesDB />
    </div>
  </div>
</template>

<script>
import ClientesDB from "../components/ClientesDB.vue";

export default {
  name: "Clientes",
  components: {
    ClientesDB,
  },
};
</script>
