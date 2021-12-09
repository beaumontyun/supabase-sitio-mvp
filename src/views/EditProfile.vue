<template>
  <!-- <div>
    <button @click.prevent="signOut">Sign out</button>
  </div> -->
<div class="container" style="padding: 50px 0 100px 0">
  <form class="form-widget" @submit.prevent="updateProfile">
    <p>Welcome {{ this.username }}</p>
    <Avatar v-model:paths="avatar_url" @upload="updateProfile"/>
    <!-- <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="store.user.email" disabled />
    </div> -->
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="website" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button block primary"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
  </div>
</template>

<script>
import { supabase } from "../supabase"
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import Avatar from "./Avatar.vue";

export default {
  components: {
    Avatar,
  },
  setup() {
    const loading = ref(true);
    const username = ref("");
    const website = ref("");
    const avatar_url = ref("");
    const store = useStore();
    const userEmail = computed(() => store.state.user);
    const signOut = () => {
      store.dispatch("signOutAction");
    };

    async function getProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
          website.value = data.website;
          avatar_url.value = data.avatar_url;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        const updates = {
          id: store.user.id,
          username: username.value,
          website: website.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });

        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      signOut,
      store,
      loading,
      username,
      website,
      avatar_url,

      updateProfile,
      userEmail,
    };
  },
};
</script>