<template>
  <div>
    <Banner />
  </div>
  <div>
    <Produtos />
  </div>
  
</template>

<script>
import Banner from "../components/Banner.vue";
import Produtos from "../components/Produtos.vue";

export default {
  name: "Vendas",
  components: { Banner, Produtos },
};
</script>

<style>
.home-container {
  margin-bottom: 200px;
}
</style>
