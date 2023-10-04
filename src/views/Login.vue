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

const router = useRouter();

const username = ref('');
const password = ref('');

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
        console.log('Inicio de sesion fallido');
      }
    })
    .catch(error => {
      console.error('Error de inicio de sesion:', error);
    });
};
</script>

<style lang="scss">
@import '../style.scss';
.login {
  align-items: center;
  background-color: $light;
  border-radius: 20px;
  box-shadow: rgba(24, 61, 61, 0.4) 0px 5px, rgba(24, 61, 61, 0.3) 0px 10px, rgba(92, 131, 116, 0.2) 0px 15px, rgba(92, 131, 116, 0.1) 0px 20px, rgba(147, 177, 166, 0.05) 0px 25px;
  color: $dark;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8%;
  padding: 2rem;
  width: 20%;

  h2 {
    margin-bottom: 1.5rem;
  }

  #login-form {
    align-items: left;
    display: flex;
    flex-direction: column;
    font-weight: 400;
    gap: 1rem;

    .login-form__data {
      display: flex;
      flex-direction: column;

      input {
        border-radius: 10px;
        border: .5px solid #c9ced1;
        padding: .5rem;

        &:focus {
          outline: none;
        }
      }
    }

    #login-form__btn {
      background-color: $green;
      border-radius: 10px;
      border: none;
      color: $light;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 700;
      padding: .5rem;
    }
  }
}

@media only screen and (max-width: 428px) {
  .login {
    margin-top: 20%;
    width: 50%;
  }
}
</style>