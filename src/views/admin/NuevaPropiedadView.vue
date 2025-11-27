<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nueva Propiedad
    </v-card-title>
    <v-card-subtitle class="text-h5">
      Crea una nueva propiedad llenando el siguiente formulario</v-card-subtitle
    >
    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Título Propiedad"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />
      <v-file-input
        accept="image/*"
        label="Fotografía de la propiedad"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />
      <div v-if="image" class="my-5">
        <p class="font-weigh-bold">Imagen Propiedad</p>
        <img :src="image" alt="imagen-propiedad" />
      </div>
      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="mb-5"
            :items="cantidad"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Baños"
            class="mb-5"
            :items="cantidad"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Estacionamientos"
            class="mb-5"
            :items="cantidad"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-textarea
        class="mb-5"
        label="Descripción"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      />
      <v-checkbox label="Alberca" v-model="alberca.value.value" />
      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap
            ref="map"
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
            </LTileLayer>
          </LMap>
        </div>
      </div>
      <v-btn color="pink-accent-3" block @click="submit">
        Agregar Propiedad
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
//VeeValidate
import { useForm, useField } from "vee-validate";
//Validations
import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
//Firebase
import { collection, addDoc } from "firebase/firestore";
//VueFire
import { useFirestore } from "vuefire";
//VueRouter
import { useRouter } from "vue-router";
//Composables
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
//Map
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

//VueFire
const db = useFirestore();
//VueRouter
const router = useRouter();

const cantidad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//Composables
const { zoom, center, pin } = useLocationMap();
const { uploadImage, image, url } = useImage();

const { handleSubmit } = useForm<Propiedad>({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const titulo = useField<string>("titulo");
const imagen = useField<File | null>("imagen");
const precio = useField<string>("precio");
const habitaciones = useField<number>("habitaciones");
const wc = useField<number>("wc");
const descripcion = useField<string>("descripcion");
const estacionamiento = useField<number>("estacionamiento");
const alberca = useField<boolean>("alberca", {
  initialValue: false,
});

const submit = handleSubmit(async (values: Propiedad) => {
  const { imagen, ...propiedad } = values;

  const docRef = await addDoc(collection(db, "propiedades"), {
    ...propiedad,
    imagen: url.value,
    ubicacion: center.value,
  });
  if (docRef.id) {
    router.push({ name: "admin-propiedades" });
  }
});
</script>
