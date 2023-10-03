<template>
  <h2>Usuario</h2>
  <span>Id: {{ user.id }}</span>
  <p>Correo: {{ user.email }}</p>
  <p>Username: {{ user.username }} </p>
  <p>Nombre: {{ user.name }}</p>
  <p>Direccion: {{ user.address }}</p>
  <p>Telefono: {{ user.phone }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

<style>

</style>