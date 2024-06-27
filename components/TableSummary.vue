<template>
    <div class="text-sm">
        <table class="w-full border border-collapse border-slate-400">
            <caption class="caption-top">
                ตารางสรุปผลคำนวน ค่า K
            </caption>
            <thead>
                <th class="border border-slate-300">รายการ</th>
                <th class="border border-slate-300">คำนวน K</th>
                <th class="border border-slate-300">เงินส่งงวด</th>
                <th class="border border-slate-300">เงินชดเชย</th>
            </thead>
            <tbody>
                <tr v-for="tr in tblSum" :key="tr[0]">
                    <td class="py-1 border border-slate-300" v-for="td in tr" :key="td" v-html="td"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="">
                    <td class="p-2 font-bold">รวมเงินชดเชยทั้งหมด</td>
                    <td></td>
                    <td></td>
                    <td class="font-bold text-right"><span class="border-b-4 border-double border-b-black">{{ sum }}</span></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
var prj = usePrjStore();
var { timeSummit, timeFinish, timePays: timePay, timePaysArr, kValue, prjStr } = storeToRefs(prj);
import { k_fom, k_name as kName, k_select as kSelect, thaiDate, month } from '~/assets/js/kvar.js';
var tblSum = ref(null);
var sum = ref(null);
var calTbl = computed(() => {
    var xx = isCal.value;
    var tblArr = [];
    var sumMreturn = [];
    var ai = 0;
    var tbl = timePay.value;
    tbl.forEach((val, index) => {
        if (val.time === null) {
            return
        } else {
            tblArr[ai] = [];
            tblArr[ai][0] = `งวดที่ ${index + 1}` + ` วันที่ ${new Date(val.time).getDate()} ${month[new Date(val.time).getMonth()]} ${new Date(val.time).getFullYear() + 543}`;
            tblArr[ai][1] = ``;
            tblArr[ai][2] = ``;
            tblArr[ai][3] = ``;
        }

        ai++;

        val.kvalues.forEach((k, i) => {
            if (k.kindex === null) {
                return;
            } else {
                tblArr[ai] = [];
                tblArr[ai][0] = `&nbsp;&nbsp;รายการที่ ${i + 1}` + ` ${kSelect()[k.kindex][0]} ${kSelect()[k.kindex][1]}`;
                tblArr[ai][1] = `${k.kval}`;
                tblArr[ai][2] = (k.money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" }) + ' บาท';
                tblArr[ai][3] = `${k.mreturn} บาท`;
                sumMreturn.push(k.mreturn);
            }

            ai++;
        })
    })
    var mmm = 0;
    sumMreturn.forEach((m) => {
        var xx;
        xx = m.replace(/,/g, '');
        mmm += +xx;
    })
    sum.value = mmm.toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", }) + ' บาท'
    tblSum.value = tblArr;
});
var isCal = ref(false);
watch(timePay, (tp) => {
    isCal.value = !isCal.value;
    (calTbl.value);
    // console.log('from watch = '+ tp);
}, { deep: true })

</script>

<style lang="scss" scoped>
tbody tr td:last-child {
    text-align: right;
}
tbody tr td:nth-last-child(2) {
    text-align: right;
}
tbody tr td:nth-last-child(3) {
    text-align: center;
}
tbody tr:last-child td {
    border-bottom: 1px solid black ;
}
</style>