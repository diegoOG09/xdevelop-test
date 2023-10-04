<template>
  <div class="menu container">
    <div class="header">
      <h2 class="title">Menú</h2>
    </div>
    <div class="menu-buttons">
      <p>Selecciona una opción:</p>
      <router-link class="menu-btn" to="/users" id="btn-users"><i class="fa-solid fa-users"></i>Usuarios</router-link>
      <router-link class="menu-btn" to="/products" id="btn-products"><i class="fa-solid fa-cubes"></i>Productos</router-link>
    </div>
    <LogoutBtn />
  </div>
</template>

<script setup>
import LogoutBtn from '../components/LogoutBtn.vue';
</script>

<style lang="scss">
@import '../style.scss';

.menu {
  .header {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .menu-buttons {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 4rem;
    margin-top: 5%;
    p {
      color: $green;
    }
    .menu-btn {
      background-color: $light-green;
      border-radius: 10px;
      color: $light;
      padding: 2rem;
      text-align: center;
      text-decoration: none;
      width: 7rem;
      i {
        margin-right: .5rem;
      }
    }
  }
}
</style>