<template>
  <div>
    <div class="container">
        <h1>tela dos clientes</h1>
      <FormularioTeste />
    </div>
  </div>
</template>

<script>
import FormularioTeste from "../components/FormularioTeste.vue";

export default {
  name: "Clientes",
  components: {
    FormularioTeste,
  },
};
</script>
