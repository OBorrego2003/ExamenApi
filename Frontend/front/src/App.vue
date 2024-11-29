<template>
  <nav>
      <router-link to="/">Home</router-link>
  </nav>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style >
html, body {
  height: 100%;
  margin: 0;
  background: linear-gradient(135deg, #000, #333);
}

#app {

  flex-direction: column;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  height: 100%;
}

nav {
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-bottom: 1px solid #444;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  box-sizing: border-box; 
}

nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  padding: 0 15px;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #bbb;
}

nav a.router-link-exact-active {
  color: #42b983;
}

router-view {
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: auto; 
  padding: 20px; 
  box-sizing: border-box;
}
</style>
