import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase';

function loadPage(view) {
  return () =>
    import(
      /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`
    );
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: loadPage("Main"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadPage("Profile"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/Editprofile',
    name: 'EditProfile',
    component: loadPage("EditProfile"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: loadPage("SignUp")
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: loadPage("SignIn")
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: loadPage("PrivacyPolicy")
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: loadPage("TermsOfService")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = supabase.auth.user();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('sign-in');
  else if(!requiresAuth && currentUser) next("/");
  else next();
})

export default router
