<template>
  
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <p>{{ ht }}</p>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="$emit('isOpen')" />
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit"> Submit </UButton>
      </UForm>

      <!-- <template #footer>
        <Placeholder class="h-8" />
      </template> -->
    </UCard>

</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
const props = defineProps(['headTitle']);
const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
});
// var regType = ref({
//   login: 'ลงชื่อเข้าใช้',
//   reg: 'ลงทะเบียน'
// });
const ht = computed(() => {
  return (props.headTitle === 'reg')? 'ลงทะเบียน':'ลงชื่อเข้าใช้';
});
// const ht = ref(props.headTitle);
type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  var str = `email=${event.data.email}&pswd=${event.data.password}&type=${props.headTitle}` 
  console.log(props.headTitle);
  console.log(typeof event.data.email);
  function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var y = this.responseText;
    console.log(y);
 };
  console.log(str);
  xhttp.open("POST", "http://kescalation.old/app/auth/login.php");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(str);
}
loadDoc();
}
</script>

<style scoped></style>
