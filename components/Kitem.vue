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
        <div v-if="timePay[pi].kvalues[ki].kval" class="p-4 text-sm">
            <div v-if="+timePay[pi].kvalues[ki].kval * 1000 >= 1040">
                <p>{{ `ค่า K = ${timePay[pi].kvalues[ki].kval} เพิ่มขึ้นมากกว่า 4%(1.040) ` }}</p>
                <p>{{ `ได้รับเงินชดเชย เท่ากับ ${timePay[pi].kvalues[ki].kval} - 1.04 = ${(timePay[pi].kvalues[ki].kreturn)}` }}</p>
                <p>{{ `จำนวนเงินส่งงวด รายการนี้ = ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท` }}</p>
                <p>{{ `ได้รับเงินชดเชย = ${timePay[pi].kvalues[ki].kreturn} x ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2", })} = ${timePay[pi].kvalues[ki].mreturn} บาท` }}</p>
            </div>
            <div v-else-if="+timePay[pi].kvalues[ki].kval * 1000 > 1000 && +timePay[pi].kvalues[ki].kval * 1000 <= 1040">
                <p>{{ `ค่า K = ${timePay[pi].kvalues[ki].kval} เพิ่มขึ้นไม่มากกว่า 4%(1.040) ไม่ได้รับเงินชดเชย` }}</p>
                <p>{{ `จำนวนเงินส่งงวด รายการนี้ = ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท` }}</p>
                <p>{{ `ได้รับเงินชดเชย  = ${timePay[pi].kvalues[ki].mreturn} บาท` }}</p>
            </div>
            <div v-else-if="+timePay[pi].kvalues[ki].kval * 1000 === 1000">
                <p>{{ `ค่า K = ${timePay[pi].kvalues[ki].kval} เท่าเดิม ไม่ได้รับเงินชดเชย` }}</p>
                <p>{{ `จำนวนเงินส่งงวด รายการนี้ = ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท` }}</p>
                <p>{{ `ได้รับเงินชดเชย  = ${timePay[pi].kvalues[ki].mreturn} บาท` }}</p>
            </div>
            <div v-else-if="+timePay[pi].kvalues[ki].kval * 1000 < 1000 && +timePay[pi].kvalues[ki].kval * 1000 >= 960">
                <p>{{ `ค่า K = ${timePay[pi].kvalues[ki].kval} ลดลงไม่น้อยกว่า 4%(0.960) ไม่ต้องคืนเงินชดเชย` }}</p>
                <p>{{ `จำนวนเงินส่งงวด รายการนี้ = ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท` }}</p>
                <p>{{ `คืนเงินชดเชย  = ${timePay[pi].kvalues[ki].mreturn} บาท` }}</p>
            </div>
            <div v-else-if="+timePay[pi].kvalues[ki].kval * 1000 < 960">
                <p>{{ `ค่า K = ${timePay[pi].kvalues[ki].kval} ลดลงมากกว่า 4%(0.960) ` }}</p>
                <p>{{ `คืนเงินชดเชย เท่ากับ ${timePay[pi].kvalues[ki].kval} - 0.960 = ${(timePay[pi].kvalues[ki].kreturn)}` }}</p>
                <p>{{ `จำนวนเงินส่งงวด รายการนี้ = ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท` }}</p>
                <p>{{ `คืนเงินชดเชย = ${timePay[pi].kvalues[ki].kreturn} x ${(timePay[pi].kvalues[ki].money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2", })} = ${timePay[pi].kvalues[ki].mreturn} บาท` }}</p>
            </div>
        </div>
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
var { timePays: timePay } = storeToRefs(prj);
var ki = ref(props.ki);
var pi = ref(props.pi);

</script>

<style lang="scss" scoped></style>