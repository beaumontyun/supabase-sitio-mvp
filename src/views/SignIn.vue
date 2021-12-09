 <template>
  <form class="row flex flex-center" @submit.prevent="signIn">
    <div class="col-4 form-widget">
      <div class="flex flex-col items-center"><ApplicationLogo /></div>
      <div>
        <div>
          <label for="email">Email</label>
          <input
            class="inputField"
            type="email"
            placeholder="Your email"
            v-model="form.email"
          />
        </div>
        <br />
        <div>
          <label for="password">Password</label>
          <input
            class="inputField"
            type="password"
            placeholder="Your Password"
            v-model="form.password"
          />
        </div>
        <br />
        <button type="submit">login</button>
      </div>
      <div>
        <p>
          Don't have a account? Register and join our community. <router-link to="/sign-up" class="underline">Sign Up</router-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import ApplicationLogo from "../components/ApplicationLogo.vue"

export default {
  components: {
    ApplicationLogo
  },
  setup() {
    const form = reactive({
      email: "",
      password: "",
    });
    const store = useStore();

    const signIn = () => {
      store.dispatch("signInAction", form);
    };
    return {
      form,
      signIn,
    };
  },
};
</script>

<style scoped>
form {
  padding-top: 5rem;
}
</style>