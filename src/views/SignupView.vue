<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import { FormKit } from "@formkit/vue";
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from 'vue-router'
import { ref } from "vue";

const auth = useAuthStore()
const router = useRouter()

const email = useField('email')
const password = useField('password')



const confirmationMessage = ref('')

const submit = (values) => {

  auth.createUser(values)

}
</script>

<template>
  <HeaderComp/>

  <div class="mt-44">
    <div class="mx-auto md:w-2/3 bg-white shadow">
      <div class="mx-auto md:w-2/4 py-20 px-6">
        <p class="text-center bg-red-700 p-2 rounded font-semibold uppercase text-white mb-6"v-if="auth.hasError">{{ auth.errorMessage }}</p>
        <p class="text-center bg-green-700 p-2 rounded font-semibold uppercase text-white mb-6"v-if="auth.isCreated">{{ auth.confirmationMessage }}</p>


        <FormKit
            type="form"
            submit-label="Registrarse"
            incomplete-message="No se pudo Registrar revisa los mensajes"
            @submit="submit"
        >
          <FormKit
              type="email"
              label="Email"
              name="email"
              placeholder="Tu Email"
              validation="required"
              :validation-messages="{ required: 'El Email es Obligatorio'}"
              v-model="email.value.value"
          />

          <FormKit
              type="password"
              label="Contraseña"
              name="password"
              placeholder="Tu Contraseña"
              validation="required"
              :validation-messages="{ required: 'La Contraseña es Obligatoria'}"
              v-model="password.value.value"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<!--<style>-->
<!--.formkit-wrapper {-->
<!--  max-width: 100%;-->
<!--}-->
<!--</style>-->


