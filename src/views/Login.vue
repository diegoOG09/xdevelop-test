<template>
  <DashboardTitle />
  <div class="container login">
    <h2>Login</h2>
    <form id="login-form" @submit.prevent="login">
      <div class="login-form__data">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="login-form__data">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button id="login-form__btn" type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardTitle from '../components/DashboardTitle.vue';

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

<style lang="scss">
@import '../style.scss';
.login {
  color: $dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $light;
  padding: 2rem;
  border-radius: 20px;
  margin-top: 8%;
  width: 20%;
  box-shadow: rgba(24, 61, 61, 0.4) 0px 5px, rgba(24, 61, 61, 0.3) 0px 10px, rgba(92, 131, 116, 0.2) 0px 15px, rgba(92, 131, 116, 0.1) 0px 20px, rgba(147, 177, 166, 0.05) 0px 25px;

  h2 {
    margin-bottom: 1.5rem;
  }

  #login-form {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 1rem;
    font-weight: 400;

    .login-form__data {
      display: flex;
      flex-direction: column;

      input {
        padding: .5rem;
        border-radius: 10px;
        border: .5px solid #c9ced1;

        &:focus {
          outline: none;
        }
      }
    }

    #login-form__btn {
      background-color: $green;
      border: none;
      padding: .5rem;
      color: $light;
      font-weight: 700;
      font-size: 1rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>