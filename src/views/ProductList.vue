<template>
  <div>
    <h1>Lista de Productos</h1>
    <button @click="toggleSortOrder">Alternar Orden</button>
    <p>Da clic en "ID" para ordenar por ID o clic en "Precio" para ordenar por precio</p>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th>Título</th>
          <th @click="sortBy('price')">Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in sortedProducts2" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
            <router-link :to="'/products/' + product.id">Ver más</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const products = ref([])
const sortOrder = ref('asc');
const sortField = ref('id');

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

const sortedProducts2 = computed(() => {
  if (sortOrder.value === 'asc') {
    // Ordenar de forma ascendente
    return [...products.value].sort((a, b) =>
      sortField.value === 'price' ? a.price - b.price : a.id - b.id
    );
  } else if (sortOrder.value === 'desc') {
    // Ordenar de forma descendente
    return [...products.value].sort((a, b) =>
      sortField.value === 'price' ? b.price - a.price : b.id - a.id
    );
  } else {
    // No se ordena
    return [...products.value];
  }
});

const sortBy = (field) => {
  sortField.value = field; // Actualizar el campo de ordenamiento
  if (sortOrder.value === 'asc') {
    sortOrder.value = 'desc'; // Cambiar a orden descendente
  } else {
    sortOrder.value = 'asc'; // Cambiar a orden ascendente
  }
};

const toggleSortOrder = () => {
  if (sortOrder.value === 'asc') {
    sortOrder.value = 'desc'; // Cambiar a orden descendente
  } else {
    sortOrder.value = 'asc'; // Cambiar a orden ascendente
  }
};

const sortById = () => {
  sortedProducts.value = [...products.value].sort((a, b) => a.id - b.id);
};

const sortByPrice = () => {
  sortedProducts.value = [...products.value].sort((a, b) => a.price - b.price);
};


</script>

<style>

</style>