<template>
    <br><br>

    <div class="relative">
        <UCard :ui="{ base: '', ring: 'ring-blue-200 dark:ring-blue-800', height: 'h-auto' }" class="mx-2">
            <div class="absolute top-0 right-0">
                <button
                    class="p-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:cursor-pointer"
                    title="คำนวนใหม่" @click="refresh">
                    <Icon name="ep:refresh" /> Refresh
                </button>
            </div>
            <br>
            <div v-if="recal" class="max-w-lg p-4 mx-auto border border-green-200 rounded-md">
                <div class="grid grid-cols-[128px_1fr]">
                    <div class="py-2 text-green-700 border">วันเสนอราคา</div>
                    <div class="pt-[2px] border ">
                        <Datepicker name="วันเสนอราคา" />
                    </div>
                    <div class="py-2 text-green-700 border">วันสิ้นสุดสัญญา</div>
                    <div v-if="timeSummit !== null" class="pt-[2px] border ">
                        <Datepicker name="วันสิ้นสุดสัญญา" />
                    </div>
                </div>
                <div class="flex h-[42px] items-center">
                    <div class="text-green-700 border basis-32 shrink-0">วันส่งมอบงาน</div>
                    <div class="border ">
                        <UButton v-show="!timePaysArr.includes(null)" :ui="{ rounded: 'rounded-full' }"
                            icon="i-fa6-solid-plus" size="sm" color="primary" variant="outline" label="เพิ่มงวด"
                            @click="prj.addPay" />
                    </div>
                </div>
                <template v-if="timePay && (timePay.length !== 0)">
                    <div v-for="(ob, i) in timePay" :key="ob.id">
                        <TimePay :pi="i" />
                    </div>
                </template>
            </div>
        </Ucard>
    </div>
    <br><br>
    <br><br>
    <div>
        <TableSummary />
        <!-- <UTable :rows="tblSum" :columns="columns" /> -->
    </div>
    <br><br>
    <UCard :ui="{ base: 'overflow-x-auto', ring: 'ring-violet-200 dark:ring-violet-800' }" class="mx-2">
        <div class="relative"
            v-if="timeSummit || timeFinish || timePay[0].time || timePay[0].kvalues.length === 0 || timePay[0].kvalues[0]">
            <div class="text-right">
                <button
                    class=" p-[2px]  text-sm border rounded border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white hover:cursor-pointer"
                    @click="exportToDoc">
                    <Icon name="fa:file-text-o" /> Export As Text
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                    class=" p-[2px] text-sm border rounded border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white hover:cursor-pointer"
                    @click="copy(source)">
                    <Icon name="ion:copy-outline" /> copy
                </button>

            </div>
            <div id="clip" class="py-3 text-2xl text-center text-violet-600">รายการคำนวน</div>
            <div id="wordDoc" class="text-violet-600">
                <template v-if="timeSummit !== null && timeFinish !== null">
                    <pre v-for="str in prjStr" :key="str">{{ str }}</pre>
                </template>
                <template
                    v-if="timeSummit !== null && timeFinish !== null && timePay[0].time !== null && timePay[0].kvalues.length !== 0 && timePay[0].kvalues[0].kindex !== null">
                    <div v-for="p in timePay" :key="p.id">
                        <pre v-for="st in p.str" :key="st">{{ st }}</pre>
                        <div v-for="kv in p.kvalues" :key="kv.id">
                            <pre v-for="txt in kv.str" :key="txt">{{ txt }}</pre>
                            <pre v-for="txt in kv.msg" :key="txt">{{ txt }}</pre>
                        </div>
                    </div>
                </template>

            </div>

            &nbsp;
        </div>
    </UCard>

</template>

<script setup>
import { k_fom, k_name as kName, k_select as kSelect, thaiDate } from '~/assets/js/kvar.js';
var recal = ref(true);
const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });
var prj = usePrjStore();
var { timeSummit, timeFinish, timePays: timePay, timePaysArr, kValue, prjStr } = storeToRefs(prj);
var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
var kMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var kFom = reactive(k_fom);

var isPrjStr = ref(false);

async function refresh() {
    prj.refreshPrj();
    // reports.value = [false, ''];

    recal.value = false;
    await nextTick();
    recal.value = true;

}
// const columns = [{
//   key: 'รายการ',
//   label: 'รายการ'
// },{
//   key: 'คำนวน K',
//   label: 'คำนวน K'
// }, {
//   key: 'เงินส่งงวด',
//   label: 'เงินส่งงวด'
  
// }, {
//   key: 'เงินชดเชย',
//   label: 'เงินชดเชย'
// }]
// var tblSum = ref([]);
// var calTbl = computed(() => {
//     var xx = isCal.value;
//     var tblArr = [];
//     var ai = 0;
//     var tbl = timePay.value;
//     tbl.forEach((val, index) => {
//         if (val.time === null) {
//             return
//         } else {
//             tblArr[ai] = {};
//             tblArr[ai]['รายการ'] = `งวดที่ ${index + 1}` + ` วันที่ ${new Date(val.time).getDate()} ${month[new Date(val.time).getMonth()]} ${new Date(val.time).getFullYear() + 543}`;
//             tblArr[ai]['คำนวน K'] = ``;
//             tblArr[ai]['เงินส่งงวด'] = ``;
//             tblArr[ai]['เงินชดเชย'] = ``;
//         }

//         ai++;

//         val.kvalues.forEach((k, i) => {
//             if (k.kindex === null) {
//                 return;
//             } else {
//                 tblArr[ai] = {};
//                 tblArr[ai]['รายการ'] = `รายการที่ ${i + 1}` + ` ${kSelect()[k.kindex][0]} ${kSelect()[k.kindex][1]}`;
//                 tblArr[ai]['คำนวน K'] = `${k.kval}`;
//                 tblArr[ai]['เงินส่งงวด'] = (k.money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" }) + ' บาท';
//                 tblArr[ai]['เงินชดเชย'] = `${k.mreturn} บาท`;
//             }

//             ai++;
//         })
//     })
//     console.log('tblSum = ' + JSON.stringify(tblArr));
//     tblSum.value = tblArr;
// })
// var isCal = ref(false);
// watch(timePay, (tp) => {
//     isCal.value = !isCal.value;
//     (calTbl.value);
//     // console.log('from watch = '+ tp);
// }, { deep: true })

onMounted(() => {

}

)


</script>

<style lang="scss" scoped></style>