<template>
  <h2 class="title">Datos del usuario</h2>
  <div class="user-details container">
    <div class="user-record">
      <p>Id:</p>
      <span>{{ user.id }}</span>
    </div>
    <div class="user-record">
      <p>Correo:</p>
      <span>{{ user.email }}</span>
    </div>
    <div class="user-record">
      <p>Usuario:</p>
      <span>{{ user.username }}</span>
    </div>
    <div class="user-record">
      <p>Nombre:</p>
      <span>{{ user.name }}</span>
    </div>
    <div class="user-record">
      <p>Direccion:</p>
      <span>{{ user.address }}</span>
    </div>
    <div class="user-record">
      <p>Telefono:</p>
      <span>{{ user.phone }}</span>
    </div>
  </div>
  <LogoutBtn />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const userId = ref(null)
const user = ref({});

const props = defineProps({
  id: String
})

const id = props.id;

onMounted(async () => {
  userId.value = id
  try {
    const response = await fetch(`https://fakestoreapi.com/users/${userId.value}`);
    const userData = await response.json();
    user.value = userData;
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
  }
});

</script>

<style lang="scss">
@import '../style.scss';
.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .5rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 40%;
  color: $light;

  .user-record {
    display: flex;
    flex-direction: row;
    gap: .5rem;
    p {
      background-color: #183D3D;
      border-radius: 5px;
      padding: .25rem .5rem;
      color: #93B1A6;
    }
  }
}

@media only screen and (max-width: 375px) {
  .user-details {
    width: 90%;

    p {
      width: 4.5rem;
    }
  }
}
</style>