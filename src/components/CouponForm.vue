<script setup>
import { useCouponStore } from "@/stores/coupons.js";
import { useAuthStore } from "@/stores/auth.js";

const store = useCouponStore()
const auth = useAuthStore()
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupón?</p>

  <div class="flex">
    <input
        type="text"
        placeholder="Ingresa un cupón"
        class="p-2 bg-white border-gray-300 w-full"
        v-model="store.couponInput"
        :disabled="store.isValidCoupon || !auth.isAuth"
    />

    <button
        type="button"
        class="p-3 bg-green-400 font-bold hover:bg-green-500 disabled:opacity-30 disabled:bg-red-700"
        @click="store.applyCoupon"
        :disabled="store.isValidCoupon || !auth.isAuth"
    >
      Canjear
    </button>
  </div>

  <p class="py-2 text-center text-sm font-extrabold">
    {{ store.couponValidationMessage }}
  </p>
</template>


