<template>
    <div id="main"
        class="w-[350px] min-[350px]:w-auto min-[350px]:max-w-screen-lg min-h-screen m-auto overflow-x-auto font-light"
        style="font-family: 'Sarabun', sans-serif">
        <header class="pb-1 border-b border-gray-400 sm:border-none">
            <div class="flex justify-between">
                <UButton icon="i-ic-baseline-menu" size="sm" color="gray"  square variant="link" @click="isOpen = true" class="visible sm:invisible"/>
                <h1 class="font-serif text-3xl min-[510px]:text-4xl text-center text-[#1d1d1d] dark:text-blue-400 font-light">
                    KESCALATION<span class="text-[#00a300]">.COM</span>
                </h1>
                <div class="invisible">H</div>
            </div>
           
            <nav class="text-lg bg-[#353535] py-3 hidden sm:block">
                <template v-for="i in link">
                    <ULink :to="i.to" class="ml-2" active-class="text-green-500"
                        inactive-class="text-white underline dark:text-gray-400 hover:text-gray-100 dark:hover:text-gray-200">
                        {{ i.txt }}
                    </ULink>
                </template>
            </nav>
        
        </header>
        <br />
        <USlideover v-model="isOpen" side="left">
            <UCard class="flex flex-col flex-1" :ui="{
                body: { base: 'flex-1' },
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Slideover
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <!-- <Placeholder class="h-full" /> -->
                <nav class="flex flex-col text-xl">
                    <template v-for="i in link">
                        <ULink :to="i.to" class="ml-2" active-class="text-green-400" @click="isOpen = false"
                            inactive-class="text-gray-500 underline dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            {{ i.txt }}
                        </ULink>

                    </template>

                </nav>
            </UCard>
        </USlideover>
        <h1 class="font-serif text-3xl min-[510px]:text-4xl text-center text-[#1d1d1d] dark:text-blue-400 font-light">
            คำนวนค่า<span class="text-[#00a300]">K</span>
        </h1>
        <slot />
    </div>
</template>

<script setup>
const isOpen = ref(false);
var link = ref([
    { to: '/', txt: 'Home' }, { to: '/kes', txt: 'ดัชนี ค่าK ล่าสุด' }, { to: '/register', txt: 'ราคาวัสดุก่อสร้าง ล่าสุด' }
]);
</script>

<style lang="scss" scoped></style>
