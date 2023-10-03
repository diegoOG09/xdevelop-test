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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .menu-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 5%;
    margin-bottom: 4rem;

    p {
      color: $green;
    }

    .menu-btn {
      text-decoration: none;
      color: $light;
      background-color: $light-green;
      padding: 2rem;
      width: 7rem;
      text-align: center;
      border-radius: 10px;

      i {
        margin-right: .5rem;
      }
    }

    #btn-users {
      
    }
  }
}

</style>