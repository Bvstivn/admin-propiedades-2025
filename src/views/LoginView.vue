<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle class="text-h5">
      Inicia Sesion con tu cuenta</v-card-subtitle
    >
    <v-alert v-if="auth.hasError" type="error" :title="auth.errorMessage" class="my-5"> </v-alert>
    <v-form class="mt-5">
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
      />
      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
      />
      <v-btn block @click="submit">Iniciar Sesión</v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
//Vee-validate
import { useForm, useField } from "vee-validate";
//Validations
import { loginSchema } from "../validation/loginSchema";
//Stores
import { useAuthStore } from "../stores/auth";

//Vee-validate
const { handleSubmit } = useForm({ validationSchema: loginSchema });

//Stores
const auth = useAuthStore();

const email = useField("email");
const password = useField("password");

const submit = handleSubmit((values) => {
  auth.login(values.email, values.password);
});
</script>
