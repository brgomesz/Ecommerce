<template>
  <div class="centraliza-container">
    <div class="container-produtos">
      <div class="produtos argilas">
        <h2>Argilas</h2>
        <img src="img/argilas.png" />
      </div>

      <div class="produtos ferramentas">
        <h2>Ferramentas</h2>
        <img src="img/ferramentas.png" />
      </div>
      <div class="produtos ceramicas">
        <h2>Ceramicas</h2>
        <img src="img/ceramicas.png"  />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vitrine",
};
</script>

<style>
.container-produtos {
  display: flex;
  justify-content: center; /* Distribui os cards igualmente */
  flex-wrap: wrap;
}

.produtos {
  width: calc(32% - 20px); /* Espaço entre os cards */
  margin: 10px;
  align-items: center;
  /* border: solid 1px black; */
  text-align: center;
  max-height: 800px;
}

.produtos img {
  max-width: 90%; /* Ajusta a imagem ao tamanho do card */
  max-height: 90%; /* Ajusta a altura da imagem ao tamanho do card */
  object-fit: cover; /* Mantém a proporção da imagem */
  padding: 15px;
  transition: 0.5s;
  cursor:pointer;
  /* scale:1.1 */
}

.produtos img:hover {
  transform: scale(1.05);
  object-fit: cover;
  filter: brightness(80%) saturate(80%);
}

.produtos h2 {
  color: #fff;
  text-align: center;
  font-size: 25px;
  background-color: #222222d5;
  padding: 2px 30px;
  /* padding 2px 40px = 2px em cima e 40px dos lados */
}


</style>
