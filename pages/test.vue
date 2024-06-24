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
        <UTable :rows="tblSum" />
    </div>
    <br><br>
    <UCard :ui="{ base: 'overflow-x-auto', ring: 'ring-violet-200 dark:ring-violet-800' }" class="mx-2">
        <div class="relative" v-if="timeSummit || timeFinish || timePay[0].time || timePay[0].kvalues.length === 0 || timePay[0].kvalues[0]">
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
            <div class="py-3 text-2xl text-center text-violet-600">รายการคำนวน</div>
            <!-- <pre id="clip" class="">
            <div v-if="timeSummit || timeFinish || timePay[0].time || timePay[0].kvalues.length === 0 || timePay[0].kvalues[0]" id="wordDoc" class="text-violet-600" v-html="reports[1]"></div>
            </pre> -->

            &nbsp;
        </div>
    </UCard>

</template>

<script setup>
import { k_fom, k_name as kName, k_select as kSelect } from '~/assets/js/kvar.js';
var recal = ref(true);
const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });
var prj = usePrjStore();
var { timeSummit, timeFinish, timePays: timePay, timePaysArr, kValue, prjStr } = storeToRefs(prj);
var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
var kMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var kFom = reactive(k_fom);
function thaiDate(t) {
    var d = new Date(t);
    var y = d.getFullYear() + 543;
    var m = month[d.getMonth()];
    var td = d.getDate();
    var tF = td + " " + m + " " + y;
    var tmy = m + " " + y;
    return [td, m, y, tF, tmy];
}
function calK(Do, Dt, K, is) {
    var txt = [];
    var sum = "";
    var mc = is === "pt" ? "เดือนส่งมอบงาน" : "เดือนสิ้นสุดสัญญา";
    var To = "k_" + (new Date(Do).getFullYear() + 543) + "_" + kMonth[new Date(Do).getMonth()];
    var Tt = "k_" + (new Date(Dt).getFullYear() + 543) + "_" + kMonth[new Date(Dt).getMonth()];
    txt.push(`\t`);
    txt.push(`\tคำนวน ${mc}`);
    txt.push(`\tดัชนีราคา ${mc} ${thaiDate(Dt)[4]}`);
    kFom[K][1].forEach((i) => {
        txt.push(`\t\t${i}ₜ = ${kValue.value[Tt][i]} ${kName[i]}`);
    });

    txt.push(`\tดัชนีราคา เดือนเสนอราคา ${thaiDate(timeSummit.value)[4]}`);
    kFom[K][1].forEach((i) => {
        txt.push(`\t\t${i}ₒ = ${kValue.value[To][i]} ${kName[i]}`);
    });

    txt.push(`\tวิธีคำนวน`);
    var str = "K = " + kFom[K][0][0];
    for (let i = 0; i < kFom[K][1].length; i++) {
        str += " + " + kFom[K][0][i + 1] + "(" + kValue.value[Tt][kFom[K][1][i]] + "/" + kValue.value[To][kFom[K][1][i]] + ")";
    }
    txt.push(`\t\t${str}`);
    str = "";
    str += "K = " + kFom[K][0][0];
    for (let i = 0; i < kFom[K][1].length; i++) {
        str += " + " + kFom[K][0][i + 1] + "(" + (+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]]).toFixed(6) + ")";
    }
    txt.push(`\t\t${str}`);
    txt.push(
        `\t\t\t<span style="color: #ec4899; font-size :0.8rem;">(กำหนดให้ใช้ทศนิยม 3 ตำแหน่ง ทุกขั้นตอนโดยไม่มีการปัดเศษ)</span>`
    );
    str = "";
    str += "K = " + kFom[K][0][0];
    for (let i = 0; i < kFom[K][1].length; i++) {
        str += " + " + kFom[K][0][i + 1] + "(" + (+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]]).toFixed(6).slice(0, -3) + ")";
    }
    txt.push(`\t\t${str}`);
    str = "";
    str += "K = " + kFom[K][0][0];
    for (let i = 0; i < kFom[K][1].length; i++) {
        str += " + " + (+kFom[K][0][i + 1] * +(+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]]).toFixed(6).slice(0, -3)).toFixed(6);
    }
    txt.push(`\t\t${str}`);
    txt.push(
        `\t\t\t<span style="color: #ec4899; font-size :0.8rem;">(กำหนดให้ใช้ทศนิยม 3 ตำแหน่ง ทุกขั้นตอนโดยไม่มีการปัดเศษ)</span>`
    );
    str = "";
    str += "K = " + kFom[K][0][0];
    for (let i = 0; i < kFom[K][1].length; i++) {
        str += " + " + (+kFom[K][0][i + 1] * +(+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]]).toFixed(6).slice(0, -3)).toFixed(6).slice(0, -3);
    }
    txt.push(`\t\t${str}`);
    str = "";
    str += "K = ";
    sum = +kFom[K][0][0];
    for (let i = 0; i < kFom[K][1].length; i++) {
        sum += +(+kFom[K][0][i + 1] * +(+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]]).toFixed(6).slice(0, -3)).toFixed(6).slice(0, -3);
    }
    sum = (+sum).toFixed(3);
    str += sum;
    txt.push(`\t\t${str}`);

    var strs = "";
    txt.forEach((i) => {
        strs += i + "\r\n";
    });
    return [strs, sum];
}
var isPrjStr = ref(false);

var isPayStr = ref(false);

// var reports = ref([false, '']);
function calRecord(pi) {
    var st = timeSummit.value;
    var ft = timeFinish.value;
    var pt = timePay.value[pi].time;
    var str = [];
}
var reports = computed(() => {
    var txt = [];
    var st = timeSummit.value;
    var ft = timeFinish.value;

    txt.push( `<span class="text-[0px] leading-[0px]"></span>` );
    txt.push(`<span class="text-lg text-violet-600 ">วันเสนอราคา          ${thaiDate(st)[3]}</span>`);
    txt.push(`<span class="text-lg text-violet-600">วันสิ้นสุดสัญญา        ${thaiDate(ft)[3]}</span>`);
    txt.push("");
    txt.push("<hr>");
    console.log('no.1');
    for (let i = 0; i < timePay.value.length; i++) {
        var pt = timePay.value[i].time;
        console.log('no.2');
        if (pt === null) {
            break;
        }
        txt.push(
            `<span class="text-lg text-violet-600">วันส่งมอบงาน งวดที่${i + 1}   ${thaiDate(pt)[3]
            }</span>`
        );
        if (pt <= ft) {
            var isInTime = true;
            txt.push(`\tวันส่งมอบงาน งวดที่${i + 1} ไม่เกิน วันสิ้นสุดสัญญา`);
            txt.push(`\tคำนวนค่า K เฉพาะเดือนวันส่งมอบงาน`);
        } else if (pt > ft) {
            var pts =
                new Date(pt).getFullYear().toString() + kMonth[new Date(pt).getMonth()];
            var fts =
                new Date(ft).getFullYear().toString() + kMonth[new Date(ft).getMonth()];
            if (pts === fts) {
                var isInTime = true;
                txt.push(`\tวันส่งมอบงาน งวดที่${i + 1} เกิน วันสิ้นสุดสัญญา`);
                txt.push(`\tแต่เดือนวันส่งมอบงาน อยู่ภายในเดือนวันสิ้นสุดสัญญา`);
                txt.push(`\tคำนวนค่า K เฉพาะเดือนวันส่งมอบงาน`);
            } else {
                var isInTime = false;
                txt.push(`\tวันส่งมอบงาน งวดที่${i + 1} เกิน วันสิ้นสุดสัญญา`);
                txt.push(`\tคำนวนค่า K ทั้งเดือนวันส่งมอบงาน และเดือนวันสิ้นสุดสัญญา ค่าไหนน้อยกว่าใช้ค่านั้น`);
            }
        }
        txt.push("");
        for (let j = 0; j < timePay.value[i].kvalues.length; j++) {
            var K = timePay.value[i].kvalues[j].kindex;
            var m = timePay.value[i].kvalues[j].money
                ? timePay.value[i].kvalues[j].money
                : 0;
            var kc = "";
            if (K === null) {
                break;
            }
            txt.push(`\t<span class="text-lg text-violet-600">รายการที่${j + 1}  ${K.replace(/_/g, ".")}  ${kFom[K][2]}</span>`);
            txt.push(`\tสูตรคำนวน ${kFom[K][3]}`);
            if (isInTime) {
                var strArr = calK(st, pt, K, "pt");
                txt.push(strArr[0]);
                txt.push(
                    `\t\tจึงใช้ ค่า K วันส่งมอบงาน  งวดที่${i + 1} = ${strArr[1]} คำนวน`
                );
                kc = strArr[1];
            } else {
                var strArr = calK(st, pt, K, "pt");
                txt.push(strArr[0]);
                var str2Arr = calK(st, ft, K, "ft");
                txt.push(str2Arr[0]);
                txt.push("");
                txt.push("\tเปรียบเทียบค่า K");
                txt.push(`\t\tK วันส่งมอบงาน งวดที่${i + 1} = ${strArr[1]}`);
                txt.push(`\t\tK วันสิ้นสุดสัญญา      = ${str2Arr[1]}`);
                if (+strArr[1] > +str2Arr[1]) {
                    txt.push(
                        `\t\tK วันสิ้นสุดสัญญา น้อยกว่า K วันส่งมอบงาน งวดที่${i + 1}`
                    );
                    txt.push(`\t\tจึงใช้ ค่า K วันสิ้นสุดสัญญา = ${str2Arr[1]} คำนวน`);
                    kc = str2Arr[1];
                } else if (+strArr[1] < +str2Arr[1]) {
                    txt.push(
                        `\t\tK วันส่งมอบงาน  งวดที่${i + 1} น้อยกว่า K วันสิ้นสุดสัญญา`
                    );
                    txt.push(
                        `\t\tจึงใช้ ค่า K วันส่งมอบงาน  งวดที่${i + 1} = ${strArr[1]} คำนวน`
                    );
                    kc = strArr[1];
                } else {
                    txt.push(
                        `\t\tK วันส่งมอบงาน  งวดที่${i + 1} เท่ากับ K วันสิ้นสุดสัญญา`
                    );
                    txt.push(
                        `\t\tจึงใช้ ค่า K วันส่งมอบงาน  งวดที่${i + 1} = ${strArr[1]} คำนวน`
                    );
                    kc = strArr[1];
                }
            }
            timePay.value[i].kvalues[j].kRe = kc;
            var kcInt = parseInt(+kc * 1000);
            // console.log(kcInt);

            var mReturn = "";
            var mReNum;
            var msg = [];
            if (kcInt > 1040) {
                txt.push(`\t\tค่า K เพิ่มขึ้นเกิน 4% ได้รับเงินชดเชย เท่ากับ ${kc} - 1.04 = ${(+kc - 1.04).toFixed(3)}`);
                txt.push(
                    `\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 100).toLocaleString(
                        "th-TH",
                        { maximumFractionDigits: "2", minimumFractionDigits: "2" }
                    )} บาท`
                );
                mReNum = (+kc - 1.04) * m;
                mReturn = (((+kc - 1.04) * m) / 100).toLocaleString("th-TH", {
                    maximumFractionDigits: "4",
                    minimumFractionDigits: "4",
                });

                txt.push(
                    `\t\tในงวดนี้ ได้รับเงินชดเชย เท่ากับ ${(+kc - 1.04).toFixed(3)} x ${(
                        m / 100
                    ).toLocaleString("th-TH", {
                        maximumFractionDigits: "4",
                        minimumFractionDigits: "4",
                    })} = ${mReturn} บาท`
                );
                msg.push(`ค่า K = ${kc} เพิ่มขึ้นเกิน 4% ได้รับเงินชดเชย เท่ากับ ${kc} - 1.04 = ${(+kc - 1.04).toFixed(3)}`);
                msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท`);
                msg.push(`ได้รับเงินชดเชย = ${(+kc - 1.04).toFixed(3)} x ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2", })} = ${mReturn} บาท`);
            } else if (kcInt <= 1040 && kcInt > 1000) {
                txt.push(`\t\tค่า K เพิ่มขึ้นไม่เกิน 4% ไม่ได้รับเงินชดเชย`);
                mReNum = 0;
                mReturn = (0).toLocaleString("th-TH", {
                    maximumFractionDigits: "4",
                    minimumFractionDigits: "4",
                });
                msg.push(`ค่า K = ${kc} เพิ่มขึ้นไม่เกิน 4% ไม่ได้รับเงินชดเชย`);
                msg.push(``);
                msg.push(``);
            } else if (kcInt === 1000) {
                txt.push(`\t\tค่า K ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
                mReNum = 0;
                mReturn = (0).toLocaleString("th-TH", {
                    maximumFractionDigits: "4",
                    minimumFractionDigits: "4",
                });
                msg.push(`ค่า K = ${kc} ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
                msg.push(``);
                msg.push(``);
            } else if (kcInt < 1000 && kcInt >= 960) {
                txt.push(`\t\tค่า K ลดลงไม่เกิน 4% ไม่ต้องคืนเงินชดเชย`);
                mReNum = 0;
                mReturn = (0).toLocaleString("th-TH", {
                    maximumFractionDigits: "4",
                    minimumFractionDigits: "4",
                });
                msg.push(`ค่า K = ${kc} ลดลงไม่เกิน 4% ไม่ต้องคืนเงินชดเชย`);
                msg.push(``);
                msg.push(``);
            } else if (kcInt < 960) {
                txt.push(`\t\tค่า K ลดลงเกิน 4% คืนเงินชดเชย เท่ากับ 0.960 - ${kc} = ${(0.960 - +kc).toFixed(3)}`);
                txt.push(`\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
                mReNum = (+kc - 0.96) * m;
                mReturn = (((+kc - 0.96) * m) / 100).toLocaleString("th-TH", {
                    maximumFractionDigits: "4",
                    minimumFractionDigits: "4",
                });
                txt.push(
                    `\t\tในงวดนี้ คืนเงินชดเชย เท่ากับ ${(0.96 - +kc).toFixed(3)} x ${(
                        m / 100
                    ).toLocaleString("th-TH", {
                        maximumFractionDigits: "4",
                        minimumFractionDigits: "4",
                    })} = ${mReturn} บาท`
                );
                msg.push(`ค่า K = ${kc} ลดลงเกิน 4% คืนเงินชดเชย เท่ากับ 0.960 - ${kc} = ${(0.960 - +kc).toFixed(3)}`);
                msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
                msg.push(`ต้องคืนเงินชดเชย = ${(0.96 - +kc).toFixed(3)} x ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท`);
            }
            txt.push("");
            timePay.value[i].kvalues[j].mRe = mReturn;
            timePay.value[i].kvalues[j].msg = msg;
        }
    }
    console.log('no.3');
    var strs = "";
    txt.forEach((i) => {
        strs += i + "\r\n";
    });
    // setTimeout(adjustPanel, 300);
    source.value = strs
        .replace(/<\/?span[^>]*>/g, "")
        .replace(/<\/?div[^>]*>/g, "")
        .replace(/<hr>/g, "");
    reports.value = [false, strs];
});
function calKReturnString(kstr) {
    var kcInt = parseInt(+kstr * 1000);
    var str = `ค่า K = ${kstr}`
    var txt = [];
    // var msg = [];
    if (kcInt > 1040) {
        txt.push(`${str} เพิ่มขึ้นเกิน 4%(1.04)`);
        txt.push(`ได้รับเงินชดเชย เท่ากับ ${kstr} - 1.04 = ${((kcInt - 1040) / 1000).toFixed(3)}`);
        // txt.push( `\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 100).toLocaleString( "th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" } )} บาท` );
        // mReNum = (+kstr - 1.04) * m;
        // mReturn = (((+kstr - 1.04) * m) / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // txt.push( `\t\tในงวดนี้ ได้รับเงินชดเชย เท่ากับ ${(+kstr - 1.04).toFixed(3)} x ${( m / 100 ).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท` );
        // msg.push(`ค่า K = ${kstr} เพิ่มขึ้นเกิน 4% ได้รับเงินชดเชย เท่ากับ ${kstr} - 1.04 = ${(+kstr - 1.04).toFixed(3)}`);
        // msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท`);
        // msg.push(`ได้รับเงินชดเชย = ${(+kstr - 1.04).toFixed(3)} x ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2", })} = ${mReturn} บาท`);
    } else if (kcInt <= 1040 && kcInt > 1000) {
        txt.push(`${str} เพิ่มขึ้นไม่เกิน 4%(1.04) ไม่ได้รับเงินชดเชย`);
        // mReNum = 0;
        // mReturn = (0).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // msg.push(`ค่า K = ${kstr} เพิ่มขึ้นไม่เกิน 4% ไม่ได้รับเงินชดเชย`);
        // msg.push(``);
        // msg.push(``);
    } else if (kcInt === 1000) {
        txt.push(`${str} ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
        // mReNum = 0;
        // mReturn = (0).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // msg.push(`ค่า K = ${kstr} ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
        // msg.push(``);
        // msg.push(``);
    } else if (kcInt < 1000 && kcInt >= 960) {
        txt.push(`${str} ลดลงไม่เกิน 4%(0.96) ไม่ต้องคืนเงินชดเชย`);
        // mReNum = 0;
        // mReturn = (0).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // msg.push(`ค่า K = ${kstr} ลดลงไม่เกิน 4% ไม่ต้องคืนเงินชดเชย`);
        // msg.push(``);
        // msg.push(``);
    } else if (kcInt < 960) {
        txt.push(`${str} ลดลงเกิน 4%(0.96) คืนเงินชดเชย เท่ากับ 0.960 - ${kstr} = ${((960 - kcInt) / 1000).toFixed(3)}`);
        // txt.push(`\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
        // mReNum = (+kstr - 0.96) * m;
        // mReturn = (((+kstr - 0.96) * m) / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // txt.push( `\t\tในงวดนี้ คืนเงินชดเชย เท่ากับ ${(0.96 - +kstr).toFixed(3)} x ${( m / 100 ).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท` );
        // msg.push(`ค่า K = ${kstr} ลดลงเกิน 4% คืนเงินชดเชย เท่ากับ 0.960 - ${kstr} = ${(0.960 - +kstr).toFixed(3)}`);
        // msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
        // msg.push(`ต้องคืนเงินชดเชย = ${(0.96 - +kstr).toFixed(3)} x ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท`);
    }
}
async function refresh() {
    prj.refreshPrj();
    reports.value = [false, ''];

    recal.value = false;
    await nextTick();
    recal.value = true;

}
// console.log('kSelect = ' + kSelect());
var tblSum = ref([]);
var calTbl = computed(() => {
    (isCal.value);
    var tblArr = [];
    var ai = 0;
    timePay.value.forEach((val, index) => {
        tblArr[ai] = {};
        tblArr[ai]['รายการ'] = `งวดที่ ${index + 1}` + ` วันที่ ${new Date(val.time).getDate()} ${month[new Date(val.time).getMonth()]} ${new Date(val.time).getFullYear() + 543}`;
        tblArr[ai]['คำนวน K'] = ``;
        tblArr[ai]['เงินส่งงวด'] = ``;
        tblArr[ai]['เงินชดเชย'] = ``;
        ai++;

        val.kvalues.forEach((k, i) => {
            if (k.kindex === '') {
                return tblArr;
            } else {
                tblArr[ai] = {};
                tblArr[ai]['รายการ'] = `รายการที่ ${i + 1}` + ` ${kSelect()[k.kindex][0]} ${kSelect()[k.kindex][1]}`;
                tblArr[ai]['คำนวน K'] = `${k.kRe}`;
                tblArr[ai]['เงินส่งงวด'] = (k.money / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" }) + ' บาท';
                tblArr[ai]['เงินชดเชย'] = `${k.mRe} บาท`;
            }

            ai++;
        })
    })
    console.log('tblSum = ' + JSON.stringify(tblArr));
    tblSum.value = tblArr;
})
var isCal = ref(false);

watch([timeSummit, timeFinish], ([ts, tf]) => {
    if (ts === null || tf === null) {
        isPrjStr.value = false;
        return
    } else {
        isPrjStr.value = true;
       

    }
})
var isCal = ref(false);
// watch([timeSummit, timeFinish, timePay], ([ts, tf, tp]) => {
//     // console.log(JSON.stringify(tp));
//     // console.log(isCal.value);
//     if (ts === null || tf === null || tp[0].time === null || tp[0].kvalues.length === 0 || tp[0].kvalues[0].kindex === '') {
//         return;
//     }
//     var kiArr = [];
//     for (let i = 0; i < tp.length; i++) {
        
//         for (let j = 0; j < tp[i].kvalues.length; j++) {
            
            
//         }
        
//     }
//     tp.forEach((kv, i) => { 
//             kv.kvalues.forEach((kval, j) => {
//                 kiArr.push(kval.kindex);
//             });
//         }
//     );
//     if (kiArr.includes('')) {
//         isCal.value = false;
//         return;
//     } else {
//         console.log('watch = ts = ' + ts);
//         console.log('watch = tf = ' + tf);
//         console.log('watch = tp = ' + JSON.stringify(tp));
//         isCal.value = true;
//     }

// }, { deep: true })

onMounted(() => {

}

)


</script>

<style lang="scss" scoped></style>