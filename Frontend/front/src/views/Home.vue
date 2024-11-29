<template>
  <div class="home">
    <h1>Welcome to Our Store!</h1>
    <p>Discover amazing products and enjoy a seamless shopping experience.</p>
    <div class="actions">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/register" class="button">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home'
});
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.home h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.home p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #42b983;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #358a5b;
}
</style>
