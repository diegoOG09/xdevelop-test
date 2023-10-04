<template>
  <h2 class="title">Detalles del producto</h2>
  <div class="user-details container">
    <div class="user-record">
      <p>Id:</p>
      <span>{{ product.id }}</span>
    </div>
    <div class="user-record">
      <p>Producto:</p>
      <span>{{ product.title }}</span>
    </div>
    <div class="user-record">
      <p>Precio:</p>
      <span>{{ product.price }}</span>
    </div>
    <div class="user-record">
      <p>Categoria:</p>
      <span>{{ product.category }}</span>
    </div>
    <div class="user-record">
      <p>Descripcion:</p>
      <span>{{ product.description }}</span>
    </div>
    <div class="user-record">
      <p>Imagen:</p>
      <span>{{ product.image }}</span>
    </div>
    <img id="productImage" :src="product.image" alt="Imagen del producto">
    <button class="updateProductBtn" @click="showUpdateForm = true"><i class="fa-solid fa-file-pen"></i> Actualizar</button>
    <!-- Muestra el formulario solo cuando showUpdateForm es verdadero -->
    <form id="updateProductForm" v-if="showUpdateForm" @submit.prevent="updateProduct">
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
      <button class="updateProductBtn" type="submit"><i class="fa-solid fa-check"></i> Actualizar Producto</button>
    </form>
  </div>
  <LogoutBtn />
</template>
  

<script setup>
import { ref, onMounted } from 'vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const productId = ref(null);
const product = ref({});
const updatedProduct = ref({});
const showUpdateForm = ref(false);

const props = defineProps({
  id: String
})

const id = props.id;

onMounted(async () => {
  productId.value = id;
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
      method: 'PATCH',
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
      // Oculta el formulario de actualización después de la actualización 
      showUpdateForm.value = false;
    } else {
      console.error('Error al actualizar el producto:', response.status);
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
}
</script>

<style lang="scss">
@import '../style.scss';
#productImage {
  width: 20%;
}

.updateProductBtn {
  background-color: $green;
  border-radius: 10px;
  border: none;
  color: $light;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1rem 0 1rem 0;
}

#updateProductForm {
  background-color: $light;
  border-radius: 20px;
  color: $dark-green;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-top: 4rem;
  padding: 1rem;
}
</style>