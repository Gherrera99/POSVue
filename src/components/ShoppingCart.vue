<script setup>
import ShoppingCartItem from "@/components/ShoppingCartItem.vue";
import Amount from "@/components/Amount.vue";
import { useCartStore } from "@/stores/cart.js";
import { formatCurrency } from "@/helpers/index.js";

const cart = useCartStore()
</script>

<template>
  <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">El Carrito esta vacío</p>

  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>

    <ul
        role="list"
        class="mt-6 divide-y divide-gray-200"
    >
      <ShoppingCartItem
          v-for="item in cart.items"
          :key="item.id"
          :item="item"
      />
    </ul>

    <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{formatCurrency(300)}}
      </Amount>

      <Amount>
        <template #label>Impuestos:</template>
        {{formatCurrency(0)}}
      </Amount>

      <Amount>
        <template #label>Total a Pagar:</template>
        {{formatCurrency(0)}}
      </Amount>
    </dl>
  </div>
</template>


