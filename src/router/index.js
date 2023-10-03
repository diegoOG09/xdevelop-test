import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue';
import Menu from '../views/Menu.vue';
import UserList from '../views/UserList.vue';
import ProductList from '../views/ProductList.vue';
import UserDetail from '../views/UserDetail.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', component: Login },

  { path: '/menu', component: Menu },

  { path: '/users', component: UserList },

  { path: '/products', component: ProductList },

  { 
    path: '/users/:id',
    component: UserDetail,
    props: true
  },

  { 
    path: '/products/:id',
    component: ProductDetail,
    props: true 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;