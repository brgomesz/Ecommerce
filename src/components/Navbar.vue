<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #785616">
    <div class="container-fluid">
      <router-link class="nav-link text-white" to="/" style="font-size: 25px"
        >Anaju Ceramicas</router-link
      >
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/pedidos"
              >Pedidos</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/clientes"
              >Clientes</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link text-white" to="/estoque"
              >Estoque</router-link
            >
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

<style></style>
