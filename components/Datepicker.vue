<template>
    <div ref="target" class="relative w-full text-green-700 max-w-[200px]">
        <div @click="openCalendar" class="flex w-[200px] cursor-pointer  rounded">
            <UInput disabled v-model="thaiMark" icon="i-zondicons-calendar" size="md" color="white" trailing
                :placeholder="name" :ui="{ base: 'pointer-events-none opacity-100' }" />

        </div>
        <div v-if="isTable"
            class="absolute z-30 w-[320px] bg-white border  border-gray-100 rounded-md shadow-md top-11 left-[-60px] origin-top scale-[.88]">
            <div class="">
                <div class="flex justify-between px-3 mt-4 mb-2">
                    <div @click="add(-1)" :style="{ visibility: navBtn.lm }">
                        <Icon name="fe:arrow-left" />
                    </div>
                    <div>{{ thaiMonth }}</div>
                    <div @click="add(1)" :style="{ visibility: navBtn.rm }">
                        <Icon name="fe:arrow-right" />
                    </div>
                </div>
                <div class="flex justify-between px-3 mb-4">
                    <div @click="add(-12)" :style="{ visibility: navBtn.ly }">
                        <Icon name="fe:arrow-left" />
                    </div>
                    <div>{{ thaiYear }}</div>
                    <div @click="add(12)" :style="{ visibility: navBtn.ry }">
                        <Icon name="fe:arrow-right" />
                    </div>
                </div>
            </div>
            <table class="w-full border-collapse table-fixed">
                <tr>
                    <th>อา</th>
                    <th>จ</th>
                    <th>อ</th>
                    <th>พ</th>
                    <th>พฤ</th>
                    <th>ศ</th>
                    <th>ส</th>
                </tr>
                <tr v-for="m in 6" :key="m">
                    <td v-for="n in 7 " :key="n" :class="cd[(m - 1) * 7 + (n - 1)].classObj"
                        @click="selectDate(cd[(m - 1) * 7 + (n - 1)].time,pIndex)">
                        <div class="inline-block text-center rounded-full">
                            <span>{{ cd[(m - 1) * 7 + (n - 1)].date }}</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
var months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
// var emit = defineEmits(['selectedDate']);
var props = defineProps({
    name: {
        type: String
    },
    payIndex: {
        type: Number,
        default: null
    },
});
import { thaiDate, kMonth } from '~/assets/js/kvar.js';
var prj = usePrjStore();
var { timeRangeA, timeRangeZ, timeSummit, timePays: timePay, timeFinish, timePaysArr, prjStr } = storeToRefs(prj);
// var {calKitem} = prj;
// console.log(calKitem);
var target = ref(null);
var isTable = ref(false);
onClickOutside(target, () => {
    isTable.value = false;
});
var tMark = ref(null);
var name = ref(props.name);
var pIndex = ref(props.payIndex)
// console.log(timePaysArr.value);
var tStart = computed(() => {
    if (props.name === "วันเสนอราคา") {
        return timeRangeA.value;
    }
    if (props.name === "วันสิ้นสุดสัญญา") {
        return timeSummit.value;
    }
    if (props.name.includes("วันส่งมอบงาน")) {
        var i = props.payIndex;
        // console.log('ส่งมอบ ' + i);
        if (i === 0) {
            return timeSummit.value;
        } else if (i > 0) {
            // console.log('ส่งมอบ มากกว่า ' + i);
            return timePaysArr.value[i - 1];

        }
    }
})
var tEnd = computed(() => {

    if (props.name === "วันเสนอราคา") {
        // console.log('ssss' + timePaysArr);
        if (timeFinish.value === null) {
            // console.log('s1' + new Date(timeRangeZ.value));
            return timeRangeZ.value;
        } else if (timePaysArr.value.length === 1 && timePaysArr.value[0] === null && timeFinish.value !== null) {
            // console.log('s2' + new Date(timeFinish.value));
            return timeFinish.value;
        } else if (timePaysArr.value.length >= 1 && timeFinish.value !== null) {
            // console.log('s3' + new Date(timeFinish.value));
            return timeFinish.value >= timePaysArr.value[0]
                ? timePaysArr.value[0]
                : timeFinish.value;
        }
    }
    if (props.name.includes("วันสิ้นสุดสัญญา")) {
        return Date.now() + 86400000 * 3650 - 1;
    }
    if (props.name.includes("วันส่งมอบงาน")) {
        var i = props.payIndex;
        if (timePaysArr.value[i] === null) {
            return timeRangeZ.value;
        } else if ((timePaysArr.value[i] !== null) && (typeof timePaysArr.value[i + 1] === 'undefined' || timePaysArr.value[i + 1] === null)) {
            return timeRangeZ.value;
        } else if ((timePaysArr.value[i] !== null) && (timePaysArr.value[i + 1] !== null)) {
            return timePaysArr.value[i + 1];
        }
    }
})
var isInRange = (t) => {
    return !!(t >= tStart.value && t <= tEnd.value);
};
var ct = () => {
    var tCurrent = Date.now();
    if (tMark.value === null) {
        return (isInRange(tCurrent)) ? tCurrent : tEnd.value;
    } else if (tMark.value !== null) {
        return tMark.value
    }
};

var t = ref(null);//หน้าที่เปิด datePicker
var thaiMark = computed(() => {
    if (tMark.value === null) {
        return '';
    }

    var markD = new Date(tMark.value);
    return markD.getDate() + ' ' + months[markD.getMonth()] + ' ' + (markD.getFullYear() + 543);
});

var thaiMonth = computed(() => { return months[new Date(t.value).getMonth()] }
);
var thaiYear = computed(() => { ; return new Date(t.value).getFullYear() + 543 }
);
function selectedDate(t, name, i) {
    if (name === "วันเสนอราคา") {
        timeSummit.value = t;
    } else if (name === "วันสิ้นสุดสัญญา") {
        timeFinish.value = t;
    } else if (name.includes("วันส่งมอบงาน")) {
        timePay.value[i].time = t;
    }
    return 0;
}
function selectDate(t,pi) {
    tMark.value = t;
    selectedDate(t, name.value, props.payIndex);
    isTable.value = false;
    console.log('st' );
    if (timeSummit.value === null || timeFinish.value === null || timePay.value[0].time === null) {
        return;
    }
    if (name.value.includes("วันส่งมอบงาน")) {
        calPayStr(props.payIndex);
        console.log('loop ki');
        for (let ki = 0; ki < timePay.value[pi].kvalues.length; ki++) {
            console.log('loop ki='+ ki);
                var st = timeSummit.value;
                var ft = timeFinish.value;
                var pt = timePay.value[pi].time;
                var kv = timePay.value[pi].kindex;
                if (kv === null || pt === null) {
                    continue;
                }
                console.log('befor call calKitem' );
                prj.calKitem(st, ft, pt, kv, pi, ki);
                console.log('kval' + timePay.value[pi].kvalues[ki].kval + 'pi time=' + new Date(pt) + 'time=' + new Date() );

            }
    }
    console.log('before st2');
    console.log(timeSummit.value !== null);
    console.log(timePay.value[0].time !== null);
    console.log('before st2');
    console.log('before st2');
    if ((name.value === "วันเสนอราคา" || name.value === "วันสิ้นสุดสัญญา") && timePay.value[0].time !== null && timeSummit.value !== null && timeFinish.value !== null) {
        console.log('st2');
        for (let pi = 0; pi < timePay.value.length; pi++) {
            console.log('loop pi');
            if (timePay.value[pi].time === null) {
                continue;
            }
            calPayStr(pi);
            for (let ki = 0; ki < timePay.value[pi].kvalues.length; ki++) {
                console.log('loop ki');
                var st = timeSummit.value;
                var ft = timeFinish.value;
                var pt = timePay.value[pi].time;
                var kv = timePay.value[pi].kindex;
                if (kv === null || pt === null) {
                    continue;
                }
                prj.calKitem(st, ft, pt, kv, pi, ki);
                console.log('loop ki' + timePay.value[pi].kvalues[ki].kval);

            }

        }
    }
    


}
function calPrjStr() {
    var st = timeSummit.value;
    var ft = timeFinish.value;
    var str = [];
    if (st === null || ft === null) { return }
    else {
        str.push(`วันเสนอราคา    ${thaiDate(st)[3]}`);
        str.push(`วันสิ้นสุดสัญญา  ${thaiDate(ft)[3]}`);
        prjStr.value = str;
        str.forEach((v) => {
            console.log(v);
        });
    }
}
var calPayStr = (pi) => {

    // var ts = timeSummit.value;
    var tf = timeFinish.value;
    var tp = timePay.value[pi].time;
    if (tp === null) {
        return;
    }
    var txt = [];
    // console.log('no 3');
    txt.push(`วันส่งมอบงาน งวดที่ ${pi + 1}   ${thaiDate(tp)[3]}`);
    if (tp <= tf) {
        var isInTime = true;
        txt.push(`\tวันส่งมอบงาน งวดที่ ${pi + 1} ไม่เกิน วันสิ้นสุดสัญญา`);
        txt.push(`\tคำนวนค่า K เฉพาะเดือนวันส่งมอบงาน`);
    } else if (tp > tf) {
        var pts = new Date(tp).getFullYear().toString() + kMonth[new Date(tp).getMonth()];
        var fts = new Date(tf).getFullYear().toString() + kMonth[new Date(tf).getMonth()];
        if (pts === fts) {
            var isInTime = true;
            txt.push(`\tวันส่งมอบงาน งวดที่ ${pi + 1} เกิน วันสิ้นสุดสัญญา`);
            txt.push(`\tแต่เดือนวันส่งมอบงาน อยู่ภายในเดือนวันสิ้นสุดสัญญา`);
            txt.push(`\tคำนวนค่า K เฉพาะเดือนวันส่งมอบงาน`);
        } else {
            var isInTime = false;
            txt.push(`\tวันส่งมอบงาน งวดที่ ${pi + 1} เกิน วันสิ้นสุดสัญญา`);
            txt.push(`\tคำนวนค่า K ทั้งเดือนวันส่งมอบงาน และเดือนวันสิ้นสุดสัญญา ค่าไหนน้อยกว่าใช้ค่านั้น`);
        }
    }
    timePay.value[pi].str = txt;
    timePay.value[pi].isInTime = isInTime;
    console.log('isInTime = ' + isInTime);
    txt.forEach((va) => {
        console.log(va);

    })
    // console.log(JSON.stringify(timePay.value));
}
class DatePic {
    constructor(date, time) {
        this.date = date;
        this.time = time;
        this.classObj = {
            isNoActive: false,
            isCurrentDate: false,
        }
    }
}
function openCalendar() {
    isTable.value = !isTable.value;
    if (isTable.value) {
        t.value = ct();

        createCalender();
    };


}
var navBtn = reactive({
    ly: 'visible',
    ry: 'visible',
    lm: 'visible',
    rm: 'visible'
});
var cd = ref([]);
function createCalender() {
    cd.value = [];
    var currentDate = new Date(t.value);
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var firstCurrentMonthDay = new Date(currentYear, currentMonth, 1).getDay();
    var firstCurrentMonthTime = new Date(currentYear, currentMonth, 0).getTime();
    var lastCurrentMonthDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    var cDate = 0;
    for (let i = 0; i < 42; i++) {

        if ((i >= firstCurrentMonthDay && i <= 6) || ((i > 6) && (cDate < lastCurrentMonthDate))) {
            cDate++;
            firstCurrentMonthTime += 86400000;
            if (firstCurrentMonthTime > tEnd.value || firstCurrentMonthTime < tStart.value) {
                var cObj = new DatePic(cDate, firstCurrentMonthTime);
                cObj.classObj.isNoActive = true;

                cd.value.push(cObj);
            } else {
                var cObj = new DatePic(cDate, firstCurrentMonthTime);
                if (tMark.value && (tMark.value === firstCurrentMonthTime)) {
                    cObj.classObj.isCurrentDate = true;
                }
                cd.value.push(cObj);
            }


        } else {
            var cObj = new DatePic('', '');
            cObj.classObj.isNoActive = true;
            cd.value.push(cObj);

        }
    }
    // start navButton
    var startYear = new Date(tStart.value).getFullYear();
    var startMonth = new Date(tStart.value).getMonth();
    var endYear = new Date(tEnd.value).getFullYear();
    var endMonth = new Date(tEnd.value).getMonth();
    if (currentYear > endYear) {
        navBtn.ry = 'hidden';
        navBtn.rm = 'hidden';
    } else if (currentYear === endYear) {
        navBtn.ry = 'hidden';
        if (currentMonth >= endMonth) {
            navBtn.rm = 'hidden';
        } else {
            navBtn.rm = 'visible';
        }
    } else {
        navBtn.ry = 'visible';
        navBtn.rm = 'visible';
    }

    if (currentYear < startYear) {
        navBtn.ly = 'hidden';
        navBtn.lm = 'hidden';
    } else if (currentYear === startYear) {
        navBtn.ly = 'hidden';
        if (currentMonth <= startMonth) {
            navBtn.lm = 'hidden';
        } else {
            navBtn.lm = 'visible';
        }
    } else {
        navBtn.ly = 'visible';
        navBtn.lm = 'visible';
    }
}

var add = (n) => {
    var oldDate = new Date(t.value);
    var newDate = new Date(oldDate.getFullYear(), oldDate.getMonth() + n, 1).getTime();
    // console.log('--old'+ new Date(oldDate));
    // console.log('--new'+ new Date(newDate));
    if (newDate > tEnd.value) {
        t.value = tEnd.value;
    } else if (newDate < tStart.value) {
        t.value = tStart.value;
    } else {
        t.value = newDate;
        // console.log(new Date(newDate));
        // console.log('this range');
        // console.log(new Date(t.value));
    }
    // console.log(oldDate);
    // console.log(new Date(t.value));
    createCalender();
}

onMounted(() => {

})


</script>

<style lang="scss" scoped>
table,
th,
td {
    border: 1px solid rgb(30 64 175);
}



td {
    height: 37px;
    text-align: center;
}

td>div {
    width: 26px;
    height: 26px;
    margin: auto;
    cursor: pointer;
}

td.isNoActive {
    pointer-events: none;
    opacity: 0.3;
}

td.isCurrentDate>div {
    // color: whitesmoke;
    border: 1px solid rgb(80, 12, 12);
    // border-radius: 50%;
    // background-color: rgb(65, 78, 136);
}




th:first-child,
td:first-child {
    color: rgb(247, 43, 43);
}

th:last-child,
td:last-child {
    color: #11c1e0;
}

td:hover>div {
    border: none;
    // border-radius: 50%;
    background-color: rgb(127, 127, 129);
    color: #f2f2f2;
}

td span {
    vertical-align: middle;
}

@media screen and (min-width: 320px) {
    th {
        padding: 6px;
    }

    td {
        padding: 6px;

        div {
            width: 30px;
            height: 30px;
            // margin: auto;
        }
    }
}
</style>
