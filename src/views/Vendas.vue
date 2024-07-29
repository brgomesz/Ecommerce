<template>
  <div>
    <Banner />
  </div>
  <div>
    <Vitrine />
  </div>
  
</template>

<script>
import Banner from "../components/Banner.vue";
import Vitrine from "../components/Vitrine.vue";


export default {
  name: "Vendas",
  components: { Banner, Vitrine },
};
</script>

<style>
.home-container {
  margin-bottom: 200px;
}
</style>
