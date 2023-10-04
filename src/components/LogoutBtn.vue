<template>
  <div class="logoutBtn">
    <button id="logoutBtn" @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
}
</script>

<style lang="scss">
@import '../style.scss';
.logoutBtn {
  padding-bottom: 4rem;
  #logoutBtn {
    display: block;
    margin: 0 auto;
    background-color: #D80032;
    color: $light;
    border: none;
    border-radius: 10px;
    padding: .5rem;
    cursor: pointer;
  }
}
</style>