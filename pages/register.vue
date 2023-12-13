<template>
  <div>
    <UButton label="Open" @click="openModal('reg')" />

    <UModal v-model="isOpen"  :ui="{container: 'items-center', width: 'max-w-sm sm:max-w-sm'}">
      <component :is="RegisterForm" @is-open="isOpen=false" :head-title="headTitle"></component>
    </UModal>
  </div>
</template>

<script setup>
const RegisterForm = resolveComponent("RegisterForm");
const isOpen = ref(false);
var headTitle = ref('');
function openModal (str) {
  headTitle.value = str;
  isOpen.value = true;
}


</script>

<style lang="scss" scoped></style>
