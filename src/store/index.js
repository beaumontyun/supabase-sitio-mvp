import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import { supabase } from "../supabase";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    /**
     * Performs a synchronous act with 'commit', a commit will ensure an
     * action is done before the website moves on to the next action - 
     * i.e. only takes the user to the next page if sign up is done, or error.
     */
    async signInAction({ commit }, form) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        alert("You are loggged in");
        await router.push('/')
        commit('setUser', user.email)
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },

    /**
     * Passing form input to supabase GoTrueClient methods (signup())
     * an async function with 'dispatch' where an action will be done in the background -
     * i.e. dispatch an order to the server and come back once it is done, or error.  
     * 
     * Form payload:
     * @param email
     * @param password
     */
    async signUpAction({ dispatch }, form) {
      try {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        alert("You have been registered successfully");
        await dispatch("signInAction", form)
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },

    /**
     * Execute supabase GoTrueClient methods (signOut())
     * 
     * @param null
     */
    async signOutAction({ commit }) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        alert("You are logged out");
        await router.push("/sign-in");
        commit('setUser', null)
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },
  },
  modules: {
  },

  plugins: [createPersistedState()],

})
