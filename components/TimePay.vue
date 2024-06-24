<template>
    <div >
        <br>
        <div class="flex h-[42px] items-center">
            <div class="p-2 basis-30 shrink-0">งวดที่ {{ pi + 1 }} วันที่</div>
            <div >
                <Datepicker :name="'วันส่งมอบงาน' + ' งวดที่ ' + (1 + pi)" :pay-index="pi" />
            </div>
            <div >
                <UButton :ui="{ rounded: 'rounded-full' }" icon="i-fa6-solid-minus" size="sm" color="red"
                    variant="outline" @click="prj.delPay(pi)" />
            </div>
        </div>
        <div class="flex h-[42px] items-center text-sm pl-2">
            <div class="p-2 basis-24 shrink-0">รายการที่</div>
            <div class="basis-[10px]">
            </div>
            <div >
                <UButton :ui="{ rounded: 'rounded-full' }" icon="i-fa6-solid-plus" size="2xs" color="primary"
                    label="เพิ่มรายการ" variant="outline" @click="prj.addK(pi)" />
            </div>
        </div>
        <div v-for="(ki, j) in timePay[pi].kvalues" :key="ki.id">
            <Kitem :pi="pi" :ki="j"></Kitem>
        </div>
        <br>
        <hr>
    </div>

</template>

<script setup>
var props = defineProps({
    pi: {
        type: Number,
    },
});
var prj = usePrjStore();
var {timePays: timePay} = storeToRefs(prj);
var pi = ref(props.pi);

</script>

<style lang="scss" scoped></style>