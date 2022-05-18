<template>
  <div id="app">
    <SimpleForm />
  </div>
</template>

<script>
import SimpleForm from "./components/SimpleForm.vue";

import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

export default {
  name: "App",
  components: {
    SimpleForm,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=DM+Sans');

* {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'DM Sans', sans-serif;
    scroll-behavior: smooth;
}

body {
  background: linear-gradient(to right, #FFF, #E1EbF7);
}

#app {
  display: flex;
  justify-content: center;
  height: 100vh;
  position: relative;
}
</style>
