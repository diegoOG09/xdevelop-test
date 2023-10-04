<template>
  <h2 class="title">Usuarios</h2>
  <div class="userlist container">
    <div class="userlist-table">
      <div class="userlist-table__buttons">
        <button id="userlist-table__idSortBtn" class="userlist-table__btn" @click="sortByField('id')"><i class="fa-solid fa-sort"></i>Ordenar por ID</button>
        <button id="userlist-table__emailSortBtn" class="userlist-table__btn" @click="sortByField('email')"><i class="fa-solid fa-sort"></i>Ordenar por Correo</button>
      </div>
      <table v-if="!isLoading" class="usersTable">
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
              <router-link class="user-more userBtn" :to="'/users/' + user.id"><i class="fa-solid fa-eye"></i> Ver</router-link>
              <button class="delete-user userBtn" @click="deleteVisibleUser(user.id)"><i class="fa-solid fa-trash"></i> Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <span class="loader"></span>
      </div>
      <div class="users-buttons-operations">
        <button class="operation-btn" @click="resetUsers"><i class="fa-solid fa-clock-rotate-left"></i> Resetear Usuarios</button>
        <button class="operation-btn" @click="showNewUserForm"><i class="fa-solid fa-user-plus"></i> Agregar Usuario</button>
      </div>
    </div>
    <!-- Mostrar el formulario de agregar usuario si showAddUserForm es true -->
    <div class="addUserForm" v-if="showAddUserForm">
      <h2>Agregar Usuario</h2>
      <form class="newUserForm" @submit.prevent="addUser">
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

        <button class="addUserBtn" type="submit">Agregar</button>
      </form>
    </div>
  </div>
  <LogoutBtn />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import LogoutBtn from '../components/LogoutBtn.vue';

const users = ref([]);
const visibleUsers = ref([]);
const originalUsers = ref([]);
const isLoading = ref(true);
const showAddUserForm = ref(false);
const newUser = ref({
  email: '',
  username: '',
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
    setTimeout(() => {
      isLoading.value = false;
    }, 0); 
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
});
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
  visibleUsers.value.push({
    id: Date.now(), //
    email: newUser.value.email,
    username: newUser.value.username,
    password: newUser.value.password,
    firstname: newUser.value.firstname,
    lastname: newUser.value.lastname,
    city: newUser.value.city,
    street: newUser.value.street,
    number: newUser.value.number,
    zipcode: newUser.value.zipcode,
    lat: newUser.value.lat,
    long: newUser.value.long,
    phone: newUser.value.phone,
  });
  newUser.value = {
    email: '',
    username: '',
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
}
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
.userlist {
  margin-top: 4rem;
  .userlist-table {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    .userlist-table__buttons {
      display: flex;
      gap: 1rem;
      .userlist-table__btn {
        align-items: center;
        background-color: $light-green;
        border-radius: 10px;
        border: none;
        color: $light;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        font-weight: 700;
        gap: .4rem;
        justify-content: center;
        padding: .8rem .5rem;
        width: 10rem;
      }
    }
    .usersTable {
      color: $light;
      width: 100%;
      tr {
        height: 2rem;
      }
      th {
        background-color: $green;
        &:first-child {
          border-radius: 5px 0 0 0;
        }
        &:last-child {
          border-radius: 0 5px 0 0;
        }
      }
      td {
        background-color: $light;
        color: $dark-green;
        height: 30px;
      }
      .userBtn {
        border-radius: 5px;
        border: 1px solid $dark-green;
        color: $dark-green;
        cursor: pointer;
        height: 1rem;
        padding: .1rem 1rem;
        text-decoration: none;
      }
      .delete-user {
        height: 1.5rem;
      }
    }
    .users-buttons-operations {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      .operation-btn {
        align-items: center;
        background-color: $light-green;
        border-radius: 10px;
        border: none;
        color: $light;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        font-weight: 700;
        gap: .4rem;
        justify-content: center;
        padding: .8rem .5rem;
        width: 10rem;
      }
    }
  }
  .addUserForm {
    background-color: $light;
    border-radius: 20px;
    color: $dark-green;
    margin-bottom: 3rem;
    margin: 0 auto;
    padding: 1rem 0;
    width: 30%;
    h2 {
      text-align: center;
    }
    .newUserForm {
      align-items: center;
      color: $dark-green;
      display: flex;
      flex-direction: column;
      input {
        border-radius: 10px;
        border: none;
        outline: none;
        padding: .5rem;
      }
      button {
        align-items: center;
        background-color: $light-green;
        border-radius: 10px;
        border: none;
        color: $light;
        font-weight: 700;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        gap: .4rem;
        justify-content: center;
        margin-top: 1rem;
        padding: .8rem .5rem;
        width: 10rem; 
      }
    }
  } 
}
@media only screen and (max-width: 428px) {
  .userlist {
    width: 100%;
    .userlist-table {
      .usersTable {
        display: block;
        table-layout: fixed;
        width: 100%;
        th {
          font-size: .5rem;
        }
        tr {
          height: 3.5rem;
        }
        td {
          font-size: .7rem;
        }
        .delete-user {
          height: 2rem;
        }
      }
    }
  }
}
</style>