<template>
  <div>
    <div class="container">
      <FormularioAddEstoque />
    </div>
  </div>
</template>

<script>
import FormularioAddEstoque from "../components/FormularioAddEstoque.vue";
import Style from "../components/Style.vue";
export default {
  name: "Estoque",
  components: {
    FormularioAddEstoque,
  },
};
</script>
