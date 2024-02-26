<script setup>
import HeaderComp from "@/components/HeaderComp.vue";
import { useField, useForm } from "vee-validate";
import { loginSchema as validationSchema } from "@/validation/loginSchema.js";
import { FormKit } from "@formkit/vue";
import { useAuthStore } from "@/stores/auth.js";


const { handleSubmit } = useForm({ validationSchema })
const auth = useAuthStore()


const email = useField('email')
const password = useField('password')

const submit = handleSubmit((values) => {
  auth.login(values)

})

</script>

<template>
  <HeaderComp/>

  <div class="mt-44">
    <div class="mx-auto md:w-1/3 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <p class="text-center bg-red-700 p-2 rounded font-semibold uppercase text-white mb-6" v-if="auth.hasError">{{ auth.errorMessage }}</p>

        <FormKit
            type="form"
            submit-label="Iniciar Sesión"
            incomplete-message="No se pudo Inciar Sesión, revisa los mensajes"
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


