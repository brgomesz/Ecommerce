<template>
  <nav class="navbar navbar-expand-lg " style="background-color: #785616; " >
    <div class="container-fluid ">
      <a class="navbar-brand text-white" href="#">Anaju Cerâmicas</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav ">
          <li class="nav-item ">
            <router-link class="nav-link text-white" to="/">Pedidos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/estoque">Cadastro</router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link text-white" href="#">Estoque</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
};
</script>

<style>

</style>
