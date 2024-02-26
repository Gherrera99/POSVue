<script setup>
import ShoppingCartItem from "@/components/ShoppingCartItem.vue";
import Amount from "@/components/Amount.vue";
import CouponForm from "@/components/CouponForm.vue";
import { useCartStore } from "@/stores/cart.js";
import { useCouponStore } from "@/stores/coupons.js";
import { useAuthStore } from "@/stores/auth.js";
import { formatCurrency } from "@/helpers/index.js";


const cart = useCartStore()
const coupon = useCouponStore()
const auth = useAuthStore()
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
        {{ formatCurrency(cart.subtotal) }}
      </Amount>

      <Amount>
        <template #label>Impuestos:</template>
        {{ formatCurrency(cart.taxes) }}
      </Amount>

      <Amount v-if="coupon.isValidCoupon">
        <template #label>Descuento:</template>
        {{ formatCurrency(coupon.discount) }}
      </Amount>

      <Amount>
        <template #label>Total a Pagar:</template>
        {{ formatCurrency(cart.totalPorPagar) }}
      </Amount>
    </dl>

    <CouponForm />

    <button
        type="button"
        class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
        disabled
        v-if="!auth.isAuth"
    >
      Inicia Sesión para confirmar tu compra
    </button>

    <button
        type="button"
        class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
        @click="cart.checkout()"
        v-if="auth.isAuth"
    >
      Confirmar Compra
    </button>
  </div>
</template>


