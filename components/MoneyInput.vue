<template>
    <div class="relative w-[210px] h-[36px]">
        <div ref="target" @click="openPad" class="absolute z-10 w-[210px]">
            <UInput :value="value"  type="button"
                class="w-[210px] border rounded-md shadow-sm hover:shadow-md"
                :ui="{ base: 'hover:!cursor-pointer text-right' }" icon="i-solar-hand-money-linear" size="sm"
                color="white" variant="none" :trailing="false">
                <template #trailing>
                    <span class="text-xs text-gray-500 dark:text-gray-400">บาท</span>
                </template>
            </UInput>
            <Transition name="slide">
                <div v-show="isPad"
                    class="border border-gray-50 mt-2 rounded-md shadow-sm w-[210px] p-1 bg-gray-50 dark:bg-gray-800 dark:text-white">
                    <div class="grid grid-cols-3 grid-rows-4 gap-2 p-2 border">
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">7</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">8</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">9</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">4</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">5</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">6</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">1</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">2</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">3</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">C</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">0</div>
                        <div class="p-2 font-bold text-center bg-green-200 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">.</div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>


<script setup>
var props = defineProps({
    payIndex: {
        type: Number,
    },
    kIndex: {
        type: Number,
    },
});
var prj = usePrjStore();
var { timePays: timePay } = storeToRefs(prj);
const value = ref('');
var isPad = ref(false);
var target = ref(null);
// var isTable = ref(false);
onClickOutside(target, () => {
    isPad.value = false;
    
});
function call() {
    
    let vo = value.value
    let v = vo.replace(/,/g, '');
    let mv = parseInt(+v * 100);
    addMoney(mv, props.payIndex, props.kIndex);
    console.log("i call ="+ mv );
}
function addMoney(mv, pi, ki) {
    console.log(timePay.value[pi]);
    timePay.value[pi].kvalues[ki].money = mv;
    calKmoney(mv, pi, ki)
}
function calKmoney(mv, pi, ki) {
    // console.log('call money money=' + JSON.stringify(timePay.value[pi].kvalues[ki]));
    var kval = timePay.value[pi].kvalues[ki].kval;
    var kreturn = timePay.value[pi].kvalues[ki].kreturn;
    
    if (!kval) {
        console.log('from if k =' + kval);
        return;
    }
    console.log('call money k =' + kval);
    if (kreturn === '') {
        timePay.value[pi].kvalues[ki].mreturn = '0.00';
    } else {
        timePay.value[pi].kvalues[ki].mreturn = ((mv * (+kreturn)) / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })
    }
    var kcInt = parseInt(+kval * 1000);
    var mReturn;
    // var mReNum;
    
    var msg = [];
    if (kcInt > 1040) {
        // msg.push(`\t\tค่า K เพิ่มขึ้นเกิน 4% จะได้รับเงินชดเชย เท่ากับ ${kval} - 1.04 = ${(+kval - 1.04).toFixed(3)}`);
        // txt.push( `\t\tจำนวนเงินส่งงวด รายการนี้ = ${(mv / 100).toLocaleString( "th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" } )} บาท` );
        // mReNum = (+kval - 1.04) * mv;
        mReturn = (((+kreturn) * mv) / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // txt.push( `\t\tรายการนี้ ได้รับเงินชดเชย = ${(+kval - 1.04).toFixed(3)} x ${( mv / 100 ).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท` );
        msg.push(`ค่า K = ${kval} เพิ่มขึ้นมากกว่า 4% ได้รับเงินชดเชย เท่ากับ ${kval} - 1.04 = ${(+kval - 1.04).toFixed(3)}`);
        msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(mv / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท`);
        msg.push(`ได้รับเงินชดเชย = ${(+kval - 1.04).toFixed(3)} x ${(mv / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2", })} = ${mReturn} บาท`);
    } else if (kcInt <= 1040 && kcInt > 1000) {
        // msg.push(`\t\tค่า K เพิ่มขึ้นไม่เกิน 4% ไม่ได้รับเงินชดเชย`);
        // mReNum = 0;
        mReturn = '0.00';
        msg.push(`ค่า K = ${kval} เพิ่มขึ้นไม่มากกว่า 4% ไม่ได้รับเงินชดเชย`);
        msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(mv / 100).toLocaleString( "th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" } )} บาท`);
        msg.push(`ได้รับเงินชดเชย = ${mReturn}`);
    } else if (kcInt === 1000) {
        // msg.push(`\t\tค่า K ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
        // mReNum = 0;
        mReturn = '0.00';
        msg.push(`ค่า K = ${kval} ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
        msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(mv / 100).toLocaleString( "th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" } )} บาท`);
        msg.push(`ได้รับเงินชดเชย = ${mReturn}`);
    } else if (kcInt < 1000 && kcInt >= 960) {
        // msg.push(`ค่า K ลดลงไม่เกิน 4% ไม่ต้องคืนเงินชดเชย`);
        // mReNum = 0;
        mReturn = '0.00';
        msg.push(`ค่า K = ${kval} ลดลงไม่น้อยกว่า 4% ไม่ต้องคืนเงินชดเชย`);
        msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(mv / 100).toLocaleString( "th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" } )} บาท`);
        msg.push(`ต้องคืนเงินชดเชย = ${(+kreturn).toFixed(3)}`);
    } else if (kcInt < 960) {
        // msg.push(`\t\tค่า K ลดลงเกิน 4% ต้องคืนเงินชดเชย เท่ากับ 0.960 - ${kval} = ${(+kval - 0.960).toFixed(3)}`);
        // txt.push(`\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(mv / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
        // mReNum = (+kval - 0.96) * mv;
        mReturn = (((+kreturn) * mv) / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
        // txt.push( `\t\tในงวดนี้ คืนเงินชดเชย เท่ากับ ${(+kreturn).toFixed(3)} x ${( mv / 100 ).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท` );
        msg.push(`ค่า K = ${kval} ลดลงน้อยกว่า 4% คืนเงินชดเชย เท่ากับ ${kval} - 0.960 = ${(+kreturn).toFixed(3)}`);
        msg.push(`จำนวนเงินส่งงวด รายการนี้ = ${(mv / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
        msg.push(`ต้องคืนเงินชดเชย = ${(+kreturn).toFixed(3)} x ${(mv / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท`);
    }
    timePay.value[pi].kvalues[ki].mreturn = mReturn;
    
    timePay.value[pi].kvalues[ki].msg = msg;
    timePay.value[pi].kvalues[ki].str.forEach((va) => {
        console.log(va);
    })
    msg.forEach((va) => {
    console.log(va);
  })
    console.log('call money' + msg);
}
function openPad() {
    isPad.value = true;
}

function addNum(e) {
    let vo = value.value
    let v = vo.replace(/,/g, '');
    let n = e.target.innerHTML;
    if (n === 'C') {
        value.value = '';
        return;
    }
    if (v.charAt(v.length - 3) === '.') {
        n = '';
    }
    if (n === '.' && v.includes('.')) {
        n = '';
    }
    v = v + n;
    let varr = v.split('.');
    let varr0 = (+varr[0]).toLocaleString();

    value.value = varr0 + ((varr[1] == null) ? '' : '.' + varr[1]);
    call();

}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}
</style>
