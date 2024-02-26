<script setup>
import { useProductsStore } from "@/stores/products.js";
import { useAuthStore } from "@/stores/auth.js";
import Link from "@/components/Link.vue";
import Logo from "@/components/Logo.vue";
import {RouterLink} from "vue-router";


const products = useProductsStore()
const auth = useAuthStore()
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10">
    <div>
      <logo />

      <div class="flex gap-5 text-white">
        <h2 class="text-lg font-extrabold">Filtros:</h2>

        <div
            class="flex items-center gap-2"
            v-for="category in products.categories"
            :key="category.id"
        >
          <input
              type="radio"
              name="category"
              :value="category.id"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              :checked="products.selectedCategory === category.id"
              @change="products.selectedCategory = +$event.target.value"
          />
          
          <label class="text-gray-100">
            {{category.name}}
          </label>
        </div>
      </div>
    </div>

    <nav>
      <div v-if="auth.isAdminUser">
        <Link
            to="sales"
        >
          Administrar
        </Link>

        <RouterLink
            :to="{name: 'shop'}"
            class="rounded text-white font-bold p-2"
            @click="auth.logout()"
        >
          Cerrar Sesión
        </RouterLink>
      </div>

      <div v-else-if="auth.isAuth">
        <Link
            to="shop"
            @click="auth.logout()"
        >
          Cerrar Sesión
        </Link>
      </div>

      <div v-else>
        <Link
            to="login"
        >
          Iniciar Sesión
        </Link>

        <Link
            to="signup"
        >
          Regístrate
        </Link>
      </div>
    </nav>
  </header>
</template>

