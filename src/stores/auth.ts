//Pinia
import { defineStore } from "pinia";
//VueFire
import { useFirebaseAuth } from "vuefire";
//Firebase
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
//Vue
import { ref, computed, onMounted } from "vue";
//VueRouter
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const authUser = ref();
  const router = useRouter();

  const errorMessage = ref("");

  const errorCodes: { [key: string]: string } = {
    "auth/invalid-credential": "Correo o contraseña incorrectos",
  };

  onMounted(() => {
    if (!auth) return;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    });
  });

  const login = (email: string, password: string) => {
    if (!auth) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        router.push({ name: "admin-propiedades" });
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code] || "Error al iniciar sesión";
      });
  };

  const logout = () => {
    if (!auth) return;
    signOut(auth).then(() => {
      authUser.value = null;
      router.push({ name: "login" });
    }).catch((error) => {
      console.log(error);
    });
  }

  const hasError = computed(() => errorMessage.value);

  const isAuth = computed(() => authUser.value);

  return {
    hasError,
    errorMessage,
    isAuth,
    //Functions
    login,
    logout
  };
});
