<template>
  <h2>Producto</h2>
  <span>Id: {{ product.id }}</span>
  <p>Producto: {{ product.title }}</p>
  <p>Precio: {{ product.price }} </p>
  <p>Categoria: {{ product.category }}</p>
  <p>Descripcion: {{ product.description }}</p>
  <p>Image: {{ product.image }}</p>
  <img :src="product.image" alt="">
</template>

<script setup>
import { ref, onMounted } from 'vue';

const producId = ref(null)
const product = ref({});

const props = defineProps({
  id: String
})

const id = props.id;

onMounted(async () => {
  producId.value = id
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${producId.value}`);
    const productData = await response.json();
    product.value = productData;
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
  }
});

</script>

<style>

</style>