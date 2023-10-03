import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue';
import Menu from '../views/Menu.vue';
import UserList from '../views/UserList.vue';
import ProductList from '../views/ProductList.vue';
import UserDetail from '../views/UserDetail.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
  { path: '/', redirect: '/login', meta: { requiresAuth: false} },

  { path: '/login', component: Login, meta: { requiresAuth: false} },

  { path: '/menu', component: Menu, meta: { requiresAuth: true } },

  { path: '/users', component: UserList, meta: { requiresAuth: true } },

  { path: '/products', component: ProductList, meta: { requiresAuth: true } },

  { 
    path: '/users/:id',
    component: UserDetail,
    props: true,
    meta: { requiresAuth: true }
  },

  { 
    path: '/products/:id',
    component: ProductDetail,
    props: true,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.matched.some((route) => route.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next();
  }
})

export default router;