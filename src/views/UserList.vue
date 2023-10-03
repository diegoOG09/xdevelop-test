<template>
  <h2>Usuarios</h2>

  <div>
    <h1>Lista de Usuarios</h1>
    <button @click="sortByField('id')">Ordenar por ID</button>
    <button @click="sortByField('email')">Ordenar por Correo</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de Usuario</th>
          <th>Correo</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in visibleUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.name.firstname }}</td>
          <td>{{ user.name.lastname }}</td>
          <td>
            <router-link :to="'/users/' + user.id">Ver más</router-link>
            <button @click="deleteVisibleUser(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="resetUsers">Resetear Usuarios</button>
    <button @click="addUser">Agregar Usuario</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import router from '../router';

const users = ref([]);
const visibleUsers = ref([]);
const originalUsers = ref([]);
const sorting = ref({ field: 'id', direction: 'asc' });

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/users');
    const data = await response.json();
    users.value = data;
    originalUsers.value = data;
    visibleUsers.value = data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
});

const filteredUsers = computed(() => {
  return users.value.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    name: {
      firstname: user.name.firstname,
      lastname: user.name.lastname,
    }
  }))
})

const sortUsers = () => {
  users.value.sort((a, b) => {
    const fieldA = a[sorting.value.field];
    const fieldB = b[sorting.value.field];

    if (sorting.value.direction === 'asc') {
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return fieldA - fieldB; // Si ambos son números, ordenar como números
      } else {
        return fieldA.toString().localeCompare(fieldB.toString()); // Convertir a texto y ordenar
      }
    } else {
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return fieldB - fieldA; // Si ambos son números, ordenar como números (descendente)
      } else {
        return fieldB.toString().localeCompare(fieldA.toString()); // Convertir a texto y ordenar (descendente)
      }
    }
  });
};

const sortByField = (field) => {
  sorting.value.field = field;
  sortUsers();
};

const deleteVisibleUser = (userId) => {
  const index = visibleUsers.value.findIndex((user) => user.id === userId);

  if (index !== -1) {
    visibleUsers.value.splice(index, 1);
  }
};

const resetUsers = () => {
  visibleUsers.value = [...originalUsers.value];
}

const addUser = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email: 'Diego@gmail.com',
        username: 'diego',
        password: 'm38rmF$',
        name: {
          firstname: 'Diego',
          lastname: 'Salinas',
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: '1-570-236-7033',
      }),
    });

    if (response.ok) {
      const nuevoUsuario = await response.json();

      // Agregar el nuevo usuario a la lista visibleUsers
      visibleUsers.value.push(nuevoUsuario);

      console.log('Usuario agregado con éxito:', nuevoUsuario);
    } else {
      console.error('Error al agregar usuario:', response.status);
    }
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
}

</script>

<style>

</style>