<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
  fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        //Guarda el token en el localStorage
        localStorage.setItem('token', data.token);

        // Redirige a la pagina deseada despues del inicio de sesion
        router.push('/menu');
      } else {
        console.log('Inicio de sesion fallido')
      }
    })
    .catch(error => {
      console.error('Error de inicio de sesion:', error)
    });
};
</script>

<style>

</style>