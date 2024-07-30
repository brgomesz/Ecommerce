<template>
  
<div class="container-produtos">
      <div class="produto">
        <h2>Cozinha</h2>
        <a href="/produtos"> <img src="img/argilas.png" /></a>
      </div>
      <div class="produto">
        <h2>Decoração</h2>
        <a href="/produtos"> <img src="img/ferramentas.png" /></a>
      </div>
      <div class="produto">
        <h2>Acessórios</h2>
        <a href="/produtos"> <img src="img/ceramicas.png" /></a>
      </div>
    </div>
    
</template>

<script>
export default {
  name: "Vitrine",
};
</script>

<style scoped>
.container-produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
}

.produto {
  width: 390px;
  height: 400px;
  margin: 0 0 5px 0px;
  transition: 0.5s;
  padding: 0px;
  display: flex;
  flex-direction: column;
}

.produto img {
  margin: 5px 5px 5px 5px;
  width: 97%;
  background-color: rgba(0, 0, 0, 0.048);
  transition: 0.5s;
  max-height: 290px;
}

.produto img:hover {
  transform: scale(1.03);
  filter: brightness(80%) saturate(80%);
}

.produto h2 {
  color: #fff;
  text-align: center;
  font-size: 25px;
  background-color: #222222d5;
  padding: 2px 30px;
}

@media screen and (max-width: 860px) {
  .container-produtos {
    display: grid;
    grid-template-columns:1fr;   
    scale: 1.1; 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
}
</style>
