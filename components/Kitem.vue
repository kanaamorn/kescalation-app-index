<template>
    <div>
        <div class="flex h-[42px] items-center text-sm pl-2">
            <div class="p-2 basis-24 shrink-0">รายการที่ {{ ki + 1 }}</div>
            <div class="basis-[360px]">
                <Kselect :pay-index="pi" :k-index="ki" />
            </div>
            <div>
                <UButton :ui="{ rounded: 'rounded-full' }" icon="i-fa6-solid-minus" size="2xs" color="red"
                    variant="outline" @click="prj.delK(pi, ki)" />
            </div>
        </div>
        <div class="flex h-[42px] items-center text-sm pl-2">
            <div class="p-2 basis-24 shrink-0">จำนวนเงิน</div>
            <div class="">
                <MoneyInput :pay-index="pi" :k-index="ki" />
            </div>
        </div>
        <!-- <div v-if="timePay[pi].kvalues[ki].msg !== null && timePay[pi].kvalues[ki].msg.length === 3" class="pl-2 text-sm">
            <p class="p-2">{{ `${timePay[pi].kvalues[ki].msg[0]}` }}</p>
            <p class="p-2">{{ `${timePay[pi].kvalues[ki].msg[1]}` }}</p>
            <p class="p-2">{{ `${timePay[pi].kvalues[ki].msg[2]}` }}</p>
        </div> -->
    </div>
   

</template>

<script setup>
var props = defineProps({
    pi: {
        type: Number,
    },
    ki: {
        type: Number,
    },
});
var prj = usePrjStore();
var {timePays: timePay} = storeToRefs(prj);
var ki = ref(props.ki);
var pi = ref(props.pi);

</script>

<style lang="scss" scoped></style>