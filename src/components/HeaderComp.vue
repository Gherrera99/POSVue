<script setup>
import Logo from "@/components/Logo.vue";
import Link from "@/components/Link.vue";
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row justify-between absolute top-0 w-full z-10">
    <div>
      <logo/>
    </div>

    <nav class="flex lg:flex-row">
      <Link
          to="shop"
      >
        Ir a Tienda
      </Link>
    </nav>
  </header>
</template>


