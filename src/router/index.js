import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAuthStore } from "@/stores/auth.js";
import ShopView from "@/views/ShopView.vue";
import AdminLayout from "@/views/admin/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'productos',
          name: 'products',
          component: () => import('../views/admin/ProductsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'productos/nuevo',
          name: 'new-product',
          component: () => import('../views/admin/NewProductView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'productos/editar/:id',
          name: 'edit-product',
          component: () => import('../views/admin/EditProductView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'productos/seeder',
          name: 'seed-products',
          component: () => import('../views/admin/SeederView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'ventas',
          name: 'sales',
          component: () => import('../views/admin/SalesView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

// Guard de navegación
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
    // Comprobar que el usuario esté autenticado
    try {
      await authenticateUser()
      next()
    } catch (e) {
      console.log(e);
      next({name: 'shop'})
    }
  } else {
    // No esta protegido, mostramos la vista
    next()
  }
})

function authenticateUser() {

  // const auth = useFirebaseAuth()
  const auth = useAuthStore()

  return new Promise((resolve, reject) => {
    if (auth.isAdminUser) {
      resolve()
    } else{
      reject()
    }
  })
}

export default router
