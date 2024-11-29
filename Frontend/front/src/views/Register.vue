<template>
  <div class="register-container">
    <form @submit.prevent="handleSubmit" class="register-form">
      <h1>Register</h1>
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
      <p class="redirect-text">
        Already have an account? <router-link to="/login">Login here</router-link>.
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Register',
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', { username: username.value, email: email.value, password: password.value });
        console.log('User registered:', response.data);
        router.push('/login'); // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error('There was an error registering!', error);
        // Mostrar un mensaje de error al usuario (opcional)
      }
    };

    return {
      username,
      email,
      password,
      handleSubmit
    };
  }
});
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
}

.register-form {
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  transition: background 0.3s ease-in-out;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.register-form h1 {
  margin-bottom: 20px;
  font-size: 2em;
  background: linear-gradient(to right, #fff, #ccc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.register-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  transition: background-color 0.3s ease-in-out;
  box-sizing: border-box;
}

.register-form input::placeholder {
  color: #bbb;
}

.register-form input:focus {
  background-color: #555;
}

.register-form button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(135deg, #444, #222);
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.register-form button:hover {
  background: linear-gradient(135deg, #555, #333);
  transform: scale(1.05);
}

.redirect-text {
  margin-top: 20px;
  font-size: 0.9em;
  color: #bbb;
}

.redirect-text a {
  color: #fff;
  text-decoration: underline;
  transition: color 0.3s ease-in-out;
}

.redirect-text a:hover {
  color: #ccc;
}

@media (max-width: 1024px) { /* Tablets */
  .register-form {
    padding: 30px;
  }

  .register-form h1 {
    font-size: 1.8em;
  }

  .register-form input, .register-form button {
    padding: 9px;
  }

  .register-form button {
    font-size: 0.95em;
  }
}

@media (max-width: 768px) { /* Mobile */
  .register-form {
    padding: 20px;
  }

  .register-form h1 {
    font-size: 1.5em;
  }

  .register-form input, .register-form button {
    padding: 8px;
  }

  .register-form button {
    font-size: 0.9em;
  }
}
</style>
