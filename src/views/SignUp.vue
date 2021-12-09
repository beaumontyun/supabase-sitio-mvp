 <template>
  <form class="row flex flex-center" @submit.prevent="signUp">
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
        <div class="mt-4">
          <label>
            <div class="ml">
              By registering an account, you are consenting to our Terms of
              Service and Privacy Policy.
            </div>
          </label>
        </div>
        <div class="mt-2 cl flex items-left">
          <input type="checkbox" class="my-auto w-6" />
          <label>
            <div class="ml-2">
              I agree to the
              <router-link
                to="/terms-of-service"
                class="underline text-sm text-gray-600 hover:text-gray-900"
                >Terms of Service</router-link
              >
              and
              <router-link
                to="/privacy-policy"
                class="underline text-sm text-gray-600 hover:text-gray-900"
                >Privacy Policy</router-link
              >
            </div>
          </label>
        </div>
        <br />
        <button type="submit">Sign Up</button>
      </div>
      <div>
        <p>
          Already have an account?
          <router-link to="/sign-in" class="underline">Sign In</router-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import ApplicationLogo from "../components/ApplicationLogo.vue";

export default {
  components: {
    ApplicationLogo,
  },
  setup() {
    const form = reactive({
      email: "",
      password: "",
    });
    const store = useStore();

    /**
     * Dispatch async operations inside a store's action
     */
    const signUp = () => {
      store.dispatch("signUpAction", form);
    };

    return {
      form,
      signUp,
    };
  },
};
</script>

<style scoped>
form {
  padding-top: 5rem;
}
</style>