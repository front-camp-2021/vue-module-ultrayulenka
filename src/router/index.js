import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import NotFound from '../pages/NotFound'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/electronics',
    name: 'Electronics',
    component: ProductsPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistPage
  },
  { 
    path: '/not-found', 
    name: 'NotFound',
    component: NotFound 
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
