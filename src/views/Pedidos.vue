<template>
  <div>
    <div>
      <div class="container">
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
