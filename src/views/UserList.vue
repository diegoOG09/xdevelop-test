<template>
  <h2 class="title">Usuarios</h2>
  <div class="userlist container">
    <div class="userlist-table">
      <div class="userlist-table__buttons">
        <button id="userlist-table__idSortBtn" class="userlist-table__btn" @click="sortByField('id')"><i class="fa-solid fa-sort"></i>Ordenar por ID</button>
        <button id="userlist-table__emailSortBtn" class="userlist-table__btn" @click="sortByField('email')"><i class="fa-solid fa-sort"></i>Ordenar por Correo</button>
      </div>
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
            <td>{{ user.name ? user.name.firstname : 'N/A' }}</td>
            <td>{{ user.name ? user.name.lastname : 'N/A' }}</td>
            <td>
              <router-link :to="'/users/' + user.id">Ver más</router-link>
              <button @click="deleteVisibleUser(user.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="resetUsers">Resetear Usuarios</button>
      <button @click="showNewUserForm">Agregar Usuario</button>
    </div>

    <!-- Mostrar el formulario de agregar usuario si showAddUserForm es true -->
    <div v-if="showAddUserForm">
      <h2>Agregar Usuario</h2>
      <form @submit.prevent="addUser">
        <!-- Campos del formulario para agregar un nuevo usuario -->
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newUser.email" required>

        <label for="username">Username:</label>
        <input type="text" id="username" v-model="newUser.username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="newUser.password" required>

        <label for="firstname">FirstName:</label>
        <input type="text" id="firstname" v-model="newUser.firstname" required>

        <label for="lastname">LastName:</label>
        <input type="lastname" id="lastname" v-model="newUser.lastname" required>

        <label for="city">city:</label>
        <input type="city" id="city" v-model="newUser.city" required>
        <label for="street">street:</label>
        <input type="street" id="street" v-model="newUser.street" required>
        <label for="number">number:</label>
        <input type="number" id="number" v-model="newUser.number" required>
        <label for="zipcode">zipcode:</label>
        <input type="zipcode" id="zipcode" v-model="newUser.zipcode" required>
        <label for="lat">lat:</label>
        <input type="lat" id="lat" v-model="newUser.lat" required>
        <label for="long">long:</label>
        <input type="long" id="long" v-model="newUser.long" required>

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="newUser.phone" required>

        <button type="submit">Agregar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const users = ref([]);
const visibleUsers = ref([]);
const originalUsers = ref([]);
const showAddUserForm = ref(false);
const newUser = ref({
  username: '',
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  city: '',
  street: '',
  number: 0,
  zipcode: '',
  lat: '',
  long: '',
  phone: '',
});
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

const showNewUserForm = () => {
  showAddUserForm.value = true;
}

const addUser = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser.value),
    });

    if (response.ok) {
      const newUserResponse = await response.json();
      console.log('Usuario agregado con éxito:', newUserResponse);

      users.value.push(newUserResponse);

      // Después de agregar con éxito, puedes limpiar el formulario y ocultar el formulario de agregar
      newUser.value = {
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        number: 0,
        zipcode: '',
        lat: '',
        long: '',
        phone: '',
      };
      showAddUserForm.value = false;
    } else {
      console.error('Error al agregar usuario:', response.status);
    }
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
}

</script>

<style lang="scss">
@import '../style.scss';
.userlist {
  .userlist-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .userlist-table__buttons {
      display: flex;
      gap: 1rem;
      .userlist-table__btn {
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

    

  }
}
</style>