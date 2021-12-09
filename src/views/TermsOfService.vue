<template>
  <div id="container" class="font-sans text-gray-900 antialiased">
        <div class="mt-2">
            <div class="min-h-screen flex flex-col items-center">
                <div>
                    <ApplicationLogo />
                </div>

                <div class="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">
                    <div>
                        <p>Terms of service</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApplicationLogo from "../components/ApplicationLogo.vue"

export default {
    components: {
        ApplicationLogo
    }
}
</script>

<style scoped>
#container {
  padding-top: 5rem;
}
</style>