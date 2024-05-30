<template>
    <div ref="target" class="relative w-[280px] text-blue-600 ">
        <div @click="openCalendar" class="absolute flex flex-row w-full">
            <input type="text" class=" input-field placeholder:text-blue-300" :value="thaiMark" :placeholder="name" />
            <button type="submit" class="icon-d min-w-[38px]">
                <Icon name="zondicons:calendar" />
            </button>
        </div>
        <div v-if="isTable" class="absolute z-10 w-[320px] bg-white border  border-gray-100 rounded-md shadow-md top-11 left-[-20px] origin-top scale-[.88]">
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
                        @click="selectDate(cd[(m - 1) * 7 + (n - 1)].time)">
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
var emit = defineEmits(['selectedDate']);
var props = defineProps({
    name: {
        type: String
    },
    timeRangeA: {
        type: Number,
        default: 1167584400000,
    },
    timeRangeZ: {
        type: Number,
        default: Date.now(),
    },
    timeSummit: {
        type: Number,
        default: null,
    },
    timeFinish: {
        type: Number,
        default: null,
    },
   
    timePay: {
        type: Object,
    },
    payIndex: {
        type: Number,
        default: null
    },
});

var target = ref(null);
var isTable = ref(false);
onClickOutside(target, () => {
    isTable.value = false;
});
var tMark = ref(null);
var name = ref(props.name);

var tStart = computed(() => {
    if (props.name === "วันเสนอราคา") {
        return props.timeRangeA;
    }
    if (props.name === "วันสิ้นสุดสัญญา") {
        return props.timeSummit;
    }
    if (props.name === "วันส่งมอบงาน") {
        var i = props.payIndex;
        if (i === 0) {
            return props.timeSummit;
        } else if (i > 0) {
            return props.timePay[i - 1].time;
        }
    }
})
var tEnd = computed(() => {
    if (props.name === "วันเสนอราคา") {
        if (props.timePay[0].time === null && props.timeFinish === null) {
            console.log('s1' + new Date(props.timeRangeZ));
            return props.timeRangeZ;
        } else if (props.timePay[0].time === null && props.timeFinish !== null) {
            console.log('s2' + new Date(props.timeFinish));
            return props.timeFinish;
        } else if (props.timePay[0].time !== null && props.timeFinish !== null) {
            console.log(
                "s3" +
                new Date(
                    props.timeFinish >= props.timePay[0].time
                        ? props.timePay[0].time
                        : props.timeFinish
                )
            );
            return props.timeFinish >= props.timePay[0].time
                ? props.timePay[0].time
                : props.timeFinish;
        }
    }
    if (props.name === "วันสิ้นสุดสัญญา") {
        return Date.now() + 86400000 * 3650;
    }
    if (props.name === "วันส่งมอบงาน") {
        var i = props.payIndex;
        // console.log('i===='+i );
        // console.log('timepay i ===='+ typeof props.timePay[i + 1]);
        // console.log('timepay i+1 ===='+ props.timePay[i+1]);
        if (props.timePay[i].time === null) {
            return props.timeRangeZ;
        } else if ((props.timePay[i].time !== null) && (typeof props.timePay[i + 1] === 'undefined' || props.timePay[i + 1].time === null)) {
            return props.timeRangeZ;
        } else if ((props.timePay[i].time !== null) && (props.timePay[i + 1].time !== null)) {
            return props.timePay[i + 1];
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
// console.log(ct());
var t = ref(null);

// watch(()=>props.timeRangeZ, () => { 
 
//   console.log('watch');
// })

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
function selectDate(t) {
    tMark.value = t;
    emit('selectedDate', t, name.value, props.payIndex);
    isTable.value = false;
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




</script>

<style lang="scss" scoped>
table,
th,
td {
    border: 1px solid rgb(30 64 175);
}

th {
    padding: max(2px, calc(2px + (3.3vw - 6.6px)));
}

td {
    text-align: center;
    padding: max(2px, calc(2px + (3.3vw - 6.6px)));
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

.input-field {
    overflow: hidden;
    width: 100%;
    //   color: #888;
    text-align: left;
    font-family: inherit;
    cursor: pointer;
    padding: 6px;
    border: 1px solid #ccc;
    border-width: 1px;
    border-radius: 4px 0 0 4px;
    outline: none;
    background-color: white;
}

.icon-d {
    background-color: #f2f2f2;
    cursor: pointer;
    border: 1px solid #ccc;
    border-width: 1px 1px 1px 0;
    border-radius: 0 4px 4px 0;
    text-align: center;
}
</style>
