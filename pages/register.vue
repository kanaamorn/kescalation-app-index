<template>
  <div class="max-w-md mx-auto border">

    <form @submit.prevent="signUp">
     
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" v-model="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"  />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" v-model="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"/>
      </div>
      
      <!-- <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            required />
        </div>
        <label for="remember" class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">I agree with the <a
            href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
      </div> -->
      <div>
        <p class="text-red-600">{{ errMsg }}</p>
      </div>
      <div>
        <p class="text-green-400">{{ successMsg }}</p>
      </div>
      <button type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

  </div>
</template>

<script setup>
const client = useSupabaseClient();
const email = ref("");
const password = ref("");
const errMsg = ref("");
const successMsg = ref("");
async function signUp() {
  errMsg.value = "";
  successMsg.value = "";
  try {
    const { data, error} = await client.auth.signUp({
        email: email.value,
        password: password.value,
    });
    console.log(data);
    if (error) {
        throw error;
    }
    successMsg.value = 'Check your email to confirm your account';
  } catch (error) {
    errMsg.value = error.message;
  }
}



onMounted(() => {
  
  
})

</script>


<style lang="scss" scoped></style>
