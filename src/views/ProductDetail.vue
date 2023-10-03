<template>
  <div>
    <h2 class="title">Producto</h2>
    <LogoutBtn />
    <span>Id: {{ product.id }}</span>
    <p>Producto: {{ product.title }}</p>
    <p>Precio: {{ product.price }} </p>
    <p>Categoria: {{ product.category }}</p>
    <p>Descripcion: {{ product.description }}</p>
    <p>Image: {{ product.image }}</p>
    <img :src="product.image" alt="">

    <button @click="showUpdateForm = true">Actualizar</button>

    <!-- Muestra el formulario solo cuando showUpdateForm es verdadero -->
    <form v-if="showUpdateForm" @submit.prevent="updateProduct">
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="updatedProduct.title" />
      </div>
      <div>
        <label for="price">Precio:</label>
        <input type="number" step="any" id="price" v-model="updatedProduct.price" />
      </div>
      <div>
        <label for="category">Categoría:</label>
        <input type="text" id="category" v-model="updatedProduct.category" />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="updatedProduct.description"></textarea>
      </div>
      <div>
        <label for="image">URL de la Imagen:</label>
        <input type="text" id="image" v-model="updatedProduct.image" />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>

  </div>
</template>
  

<script setup>
import { ref, onMounted } from 'vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const productId = ref(null)
const product = ref({});
const updatedProduct = ref({});
const showUpdateForm = ref(false);

const props = defineProps({
  id: String
})

const id = props.id;

onMounted(async () => {
  productId.value = id
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`);
    const productData = await response.json();
    product.value = productData;
    updatedProduct.value = { ...productData};
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
  }
});

const updateProduct = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`, {
      method: 'PATCH', // O utiliza 'PUT' si la API lo requiere
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct.value),
    });
    if (response.ok) {
      const updatedProductData = await response.json();
      console.log('Producto actualizado con éxito:', updatedProductData);
      // Actualiza los datos del producto en el componente
      product.value = updatedProductData;
      // Oculta el formulario de actualización después de la actualización exitosa
      showUpdateForm.value = false;
    } else {
      console.error('Error al actualizar el producto:', response.status);
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
}

</script>

<style>

</style>