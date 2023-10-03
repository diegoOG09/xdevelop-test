<template>
  <div>
    <h1>Lista de Productos</h1>
    <button @click="sortById">Ordenar por ID</button>
    <button @click="sortByPrice">Ordenar por Precio</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in sortedProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button @click="viewDetails(product.id)">Ver más</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const products = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products.value = data;
    sortById()
  } catch (error) {
    console.log('Error al obtener productos:', error)
  }
});

const sortedProducts = ref([]);

const sortById = () => {
  sortedProducts.value = [...products.value].sort((a, b) => a.id - b.id);
};

const sortByPrice = () => {
  sortedProducts.value = [...products.value].sort((a, b) => a.price - b.price);
};

const viewDetails = (productId) => {
  // Redirige
}


</script>

<style>

</style>