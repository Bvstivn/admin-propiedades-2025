//VueRouter
import { createRouter, createWebHistory } from 'vue-router'
//Components
import HomeView from '../views/HomeView.vue'
//Firebase
import { onAuthStateChanged } from "firebase/auth";
//VueFire
import { useFirebaseAuth } from "vuefire";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta:{
        requiresAuth: true,
      },
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
        }
      ]
    }
  ],
})

//GuardNavegacion
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);
  if(requiresAuth){
    try {
      await authenticateUser();
      next();
    } catch (error) {
      console.log(error);
      next({ name: 'login' });
    }
  }else{
    next();
  }
});

function authenticateUser(){
  const auth = useFirebaseAuth();
  if (!auth) return;
  return new Promise((res, rej) => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        res(user);
      }else{
        rej();
      }
    });
  });
}

export default router
