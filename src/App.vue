<template>
  <div>
    <Header :logo="logo_src" :alt="app_name" />
    <Navbar />
    <div>
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
import Navbar from "./components/Navbar.vue"
export default {
  data: function () {
    return {
      logo_src: "/img/logo.png",
      app_name: "Make Your Burger",
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
  margin: 0;
  box-sizing: border-box;
}

.container {
  margin: 50px;
  margin-bottom: 120px;

}

.trava-footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

</style>
