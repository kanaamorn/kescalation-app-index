<template>
  <div ref="target" class="relative w-full max-w-[360px]">
    <div @click="openKselect" class="flex flex-row w-full border border-green-200 rounded-md shadow-sm hover:shadow-md">
      <input type="text" class="text-sm input-field placeholder:text-green-300" :value="kVal" :title="kDes"
        placeholder="เลือกค่า K" />
      <button type="submit" class="icon-d min-w-[38px] bg-green-200">
        <Icon name="fe:arrow-down" class="text-green-400" />
      </button>
    </div>
    <Transition name="slide">
      <div v-if="isOpenK"
        class="k-scroll absolute z-20 max-w-[360px] overflow-auto h-[450px] bg-white border border-green-200 rounded-md shadow-md top-11 right-0 left-0">
        <table class="w-full border-collapse">
          <tr v-for="(m, k ) in kFom" :key="k" class="text-xs text-left hover:cursor-pointer" :title="m[2]"
            @click="selectK(k, m[4], m[2])">
            <td class="w-[42px] px-[2px] py-1">{{ m[4] }}</td>
            <td class="truncate py-1 px-[2px]">
              {{ m[2] }}
            </td>
          </tr>
        </table>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// import {useThaiMonthsStore} from "@/stores/kescal.js";

var props = defineProps({
  payIndex: {
    type: Number,
  },
  kIndex: {
    type: Number,
  },
});
import { k_fom , thaiDate, kMonth, k_name as kName } from '~/assets/js/kvar.js';
// import { usePrjStore } from '~/stores/prj.js'
var prj = usePrjStore();
var { timeSummit, timeFinish, timePays: timePay, kValue } = storeToRefs(prj);
var {calKitem} = prj;
var kVal = ref(null);
var kDes = ref(null);
function selectKValue(kv, pi, ki) {
  timePay.value[pi].kvalues[ki].kindex = kv;
  console.log('no 1' + pi);
  console.log(timePay.value[pi].time);
  if (timeSummit.value === null || timeFinish.value === null || timePay.value[pi].time === null) {
    // console.log('no 1-2');
    return;
  }
  console.log('no 2');
  // console.log(calKitem);
  calKitem(timeSummit.value, timeFinish.value, timePay.value[pi].time, kv, pi, ki);
}
function selectK(k, m4, m2) {
  kVal.value = m4 + " " + m2;
  kDes.value = m4 + m2;
  isOpenK.value = false;
  selectKValue(k, props.payIndex, props.kIndex);
}


var kFom = ref(k_fom);

var target = ref(null);
onClickOutside(target, () => {
  isOpenK.value = false;
});
var isOpenK = ref(false);

function openKselect() {
  isOpenK.value = !isOpenK.value;
}



</script>

<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: rgb(240 253 244);
}

tr:hover {
  background-color: rgb(220 252 231);
}

.input-field {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  pointer-events: none;
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  padding: 6px;
  // border: 1px solid rgb(187 247 208);
  border-radius: 5px 0 0 5px;
  border: none;
  outline: none;
  background-color: white;
}

.icon-d {

  cursor: pointer;
  // border: 1px solid rgb(187 247 208);
  // border-width: 1px 1px 1px 0;
  // border-radius: 0 4px 4px 0;
  text-align: center;
}

.k-scroll {
  scrollbar-color: rgb(187 247 208) rgb(220 252 231);
  scrollbar-width: thin;
}

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
