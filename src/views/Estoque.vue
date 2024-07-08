<template>
  <div>
    <div class="container">
      <h1>Cadastro do estoque </h1>
      <FormularioAddEstoque />
    </div>
  </div>
</template>

<script>
import FormularioAddEstoque from "../components/FormularioAddEstoque.vue";
export default {
  name: "Estoque",
  components: {
    FormularioAddEstoque,
  },
};
</script>
