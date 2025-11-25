//Pinia
import { defineStore } from "pinia";
//VueFire
import { useFirebaseAuth } from "vuefire";
//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
//Vue
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const authUser = ref({});
  const errorMessage = ref("");

  const errorCodes: { [key: string]: string } = {
    "auth/invalid-credential": "Correo o contraseña incorrectos",
  };

  const login = (email: string, password: string) => {
    if (!auth) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        console.log(authUser.value);
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code] || "Error al iniciar sesión";
      });
  };

  const hasError = computed(() => errorMessage.value);

  return {
    hasError,
    errorMessage,
    //Functions
    login,
  };
});
