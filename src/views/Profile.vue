<template>
  <div class="container">
    <div>Hello, {{ this.username }}</div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

export default {
  setup() {
    const loading = ref(true);
    const website = ref("");
    const avatar_url = ref("");
    const username = ref("");
    const store = useStore();

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

    onMounted(() => {
      getProfile();
    });

    return {
        username,
    }
  },
};
</script>

<style>
</style>