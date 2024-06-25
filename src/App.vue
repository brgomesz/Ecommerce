<template>
  <div>
    <Header :logo="logo_src" :alt="app_name" />
    <Navbar />
    <div class="conteudo-site">
      <router-view></router-view>
    </div>
    <div class="trava-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.vue";
export default {
  data: function () {
    return {
      logo_src: "/img/logo.png",
    };
  },
  components: {
    //Header,
    Footer,
    Navbar,
  },
};
</script>

<style>
* * {
  font-family: Helvetica;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: 50px;
}

.trava-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.conteudo-site {
  margin-bottom: 50px;
}
</style>
