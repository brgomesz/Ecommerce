<template>
  <div class="main-banner" >
    <h1>Anaju Cerâmicas</h1>
    
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style scoped>
.main-banner {
  background-image: url("/public/img/ceramica-homepage.jpeg");
  background-position: 0 -250px;
  background-size: cover;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.main-banner h1 {
    color: #FFF;
    text-align: center;
    font-size: 60px;
    background-color: #222222d5;
    padding: 20px 40px;
    border-radius: 20px;
   margin-left: -20px;
  }
</style>
