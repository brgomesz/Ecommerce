<template>
  <div>
    <div class="container">
      <h1>Cadastro do estoque </h1>
      <EstoqueDB />
    </div>
  </div>
</template>

<script>
import EstoqueDB from "../components/EstoqueDB.vue";
export default {
  name: "Estoque",
  components: {
    EstoqueDB,
  },
};
</script>
