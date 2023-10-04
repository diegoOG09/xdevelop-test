<template>
  <h2 class="title">Lista de Productos</h2>
  <div class="userlist container">
    <div class="userlist-table">
      <button class="alternateOrderBtn" @click="toggleSortOrder"><i class="fa-solid fa-sort"></i> Alternar Orden</button>
      <p>Da clic en "ID" para ordenar por ID o clic en "Precio" para ordenar por precio</p>
      <table v-if="!isLoading" class="usersTable">
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
              <router-link class="user-more userBtn" :to="'/products/' + product.id"><i class="fa-solid fa-eye"></i> Ver más</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <!-- Aquí puedes agregar el código HTML de tu spinner -->
        <span class="loader"></span>
      </div>
    </div>
  </div>
  <LogoutBtn class="logoutBtn-products"/>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const products = ref([])
const sortOrder = ref('asc');
const sortField = ref('id');
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products.value = data;
    setTimeout(() => {
      isLoading.value = false;
    }, 0); 
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

<style lang="scss">
@import '../style.scss';

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

.userlist-table > p {
  color: $light;
}

.userlist-table {
  .alternateOrderBtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    background-color: $light-green;
    padding: .8rem .5rem;
    cursor: pointer;
    gap: .4rem;
    width: 10rem;
  }
}

@media only screen and (max-width: 428px) {
  .userlist-table > p {
    text-align: center;
  }
}
</style>