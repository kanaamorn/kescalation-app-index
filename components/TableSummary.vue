<template>
    <div class="overflow-x-auto text-sm ">
        <div class="flex justify-end">
            <UButton @click="downTbl" title="ดาวน์โหลดตาราง" icon="i-solar-copy-line-duotone" size="sm" color="primary" variant="solid" label="copy" :trailing="false" />
        </div>
        <table id="_tableID" class="w-full text-sm border border-collapse border-slate-400">
            <caption class="py-2 text-base font-semibold caption-top">
                ตารางสรุปผลคำนวน ค่า K
            </caption>
            <thead>
                <th class="border border-slate-300">รายการ</th>
                <th class="border border-slate-300">คำนวน K</th>
                <th class="border border-slate-300">เงินส่งงวด</th>
                <th class="border border-slate-300">เงินชดเชย</th>
            </thead>
            <tbody>
                <tr v-for="tr in tblSum()" :key="tr[0]">
                    <td class="py-1 border border-slate-300" v-for="td in tr" :key="td" v-html="td"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="">
                    <td colspan="3" class="p-2 font-bold">รวมเงินชดเชยทั้งหมด</td>               
                    <td class="font-bold text-right"><span class="border-b-4 border-double border-b-black">{{ sum }}</span></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
var prj = usePrjStore();
var { timeSummit, timeFinish, timePays: timePay, timePaysArr, kValue, prjStr } = storeToRefs(prj);
import { read, utils, writeFile,writeFileXLSX} from 'xlsx';
import { k_fom, k_name as kName, k_select as kSelect, thaiDate, month } from '~/assets/js/kvar.js';
// const source = ref("Hello");
var tblex = ref('ser');
var tblexcel = ref(null);
const {text, copy, copied, isSupported } = useClipboard();

function downTbl() {
    copy(tblexcel.value);
    // const ws = utils.json_to_sheet(tblcopy);
  /* create workbook and append worksheet */
//   var data = document.getElementById(_tableID);
// var ws = utils.table_to_sheet(data);
//   const wb = utils.book_new();
//   utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
//   writeFileXLSX(wb, "การคำนวนค่าK.xlsx");
}
var sum = ref(null);
function tblSum() {
    // var xx = isCal.value;
    // console.log('tblSum');
    var tblcopy = [['','ตารางสรุปผลคำนวน ค่า K',''],['รายการ','คำนวน K','เงินส่งงวด','เงินชดเชย']]
    var tblArr = [];
    var sumMreturn = [];
    var ai = 0;
    var tbl = timePay.value;
    tbl.forEach((val, index) => {
        // console.log(index);
        // console.log(val.kvalues[index]);
        if (val.time === null) {
            return
        } else {
            tblcopy[ai + 2] = tblArr[ai] = [];
            tblcopy[ai + 2][0] = tblArr[ai][0] = `งวดที่ ${index + 1}` + ` วันที่ ${new Date(val.time).getDate()} ${month[new Date(val.time).getMonth()]} ${new Date(val.time).getFullYear() + 543}`;
            tblcopy[ai + 2][1] = tblArr[ai][1] = ``;
            tblcopy[ai + 2][2] = tblArr[ai][2] = ``;
            tblcopy[ai + 2][3] = tblArr[ai][3] = ``;
        }

        ai++;

        val.kvalues.forEach((k, i) => {
            if (k.kindex === null) {
                return;
            } else {
                tblcopy[ai + 2] = tblArr[ai] = [];
                tblArr[ai][0] = `&nbsp;&nbsp;รายการที่ ${i + 1}` + ` ${kSelect()[k.kindex][0]} ${kSelect()[k.kindex][1]}`;
                tblcopy[ai + 2][0] = `  รายการที่ ${i + 1}` + ` ${kSelect()[k.kindex][0]} ${kSelect()[k.kindex][1]}`;
                tblcopy[ai + 2][1] = tblArr[ai][1] = `${k.kval}`;
                tblcopy[ai + 2][2] = tblArr[ai][2] = (k.money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" }) + ' บาท';
                tblcopy[ai + 2][3] = tblArr[ai][3] = `${k.mreturn} บาท`;
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
    tblcopy[ai + 2] = ['รวมเงินชดเชยทั้งหมด','','',sum.value];
    tblexcel.value = tblcopy.map((row) => row.join('\t')).join('\n');
    return tblArr;
};


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
    border-bottom: 1px solid black;
}

td,
th {
    white-space: nowrap;
}
</style>