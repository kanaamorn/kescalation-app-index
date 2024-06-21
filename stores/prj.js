import { k_value, k_select } from "~/assets/js/kvar";
export const usePrjStore = defineStore('prj', () => {
  var kValue = ref(k_value);
  var kSelect = k_select();
 
  var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  var kMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  var timeSummit = ref(null);
  var timeFinish = ref(null);
  class Pay {
    constructor() {
      this.id = Date.now().toString();
      this.time = null;
      this.kvalues = [];
    }
  }
  class Kindex {
    constructor() {
      this.id = Date.now().toString();
      this.kindex = '';
      this.money = 0;
      this.kRe = '';
      this.mRe = '';
      this.msg = [];
    }
  }
  var timePays = ref([]);
  
  function addPay() {
    var pay = new Pay;
    pay.kvalues.push(new Kindex)
    timePays.value.push(pay);
  }
  addPay();
 function refreshPrj () {
  timeSummit.value = null;
  timeFinish.value = null;
  timePays.value = [];
  addPay();
 }


  var timePaysArr = computed(() => {
    if (timePays.value.length === 0) {
      return [];
    } else {
      var arr = timePays.value.map((value) => {
        return value.time;
      });
      return arr;
    }
  })
  var kvaluesArr = computed(() => {
    if (timePays.value.length === 0) {
      return [];
    } else {
      var arr = [];
      timePays.value.forEach((val, index) => {
        console.log('OK' + JSON.stringify(val.kvalues[index]));
        if (val.kvalues.length === 0) {
          arr[index] = []
        } else {
          arr[index] = []
          val.kvalues.forEach((v, i) => {
            arr[index][i] = v.kindex;
          })
        }

      });
      return arr;
    }
  })
  watch(timePaysArr, () => {
    console.log('timePaysArr = ' + JSON.stringify(timePaysArr.value));
  })
  
  var timeRangeA = computed(() => {
    var minT = Object.keys(kValue.value).sort()[0];
  
    var arrT = minT.split("_");
    return new Date((+arrT[1] - 543).toString() + '-' + arrT[2]).getTime() - (1000 * 60 * 60 * 7) + 1;
  })
  var timeRangeZ = computed(() => {
    var maxT = Object.keys(kValue.value).sort().reverse()[0];
    var arrT = maxT.split("_");
    
    var maxD = new Date((+arrT[1] - 543).toString() + '-' + arrT[2]);
    // console.log(maxD);
    maxD.setFullYear(maxD.getFullYear(), maxD.getMonth() + 1, 1);
    return maxD.getTime() - (1000 * 60 * 60 * 7) - 1;
  })
  function selectedDate(t, name, i) {
    if (name === "วันเสนอราคา") {
      timeSummit.value = t;
    } else if (name === "วันสิ้นสุดสัญญา") {
      timeFinish.value = t;
    } else if (name.includes("วันส่งมอบงาน")) {
      timePays.value[i].time = t;
    }
  }
  function selectKValue(kv, pi, ki) {
    timePays.value[pi].kvalues[ki].kindex = kv;
  }
  function addMoney(mv, pi, ki) {
    timePays.value[pi].kvalues[ki].money = mv;
  }

  
  function delPay(i) {
    timePays.value.splice(i, 1);
  }
  function addK(i) {
    timePays.value[i].kvalues.push(new Kindex);
  }
  function delK(i, j) {
    timePays.value[i].kvalues.splice(j, 1)
  }
  onMounted(() => {

  });

  return { timeRangeA, timeRangeZ, timeSummit, timeFinish, timePays, timePaysArr, kvaluesArr, kValue,refreshPrj, addPay, delPay, selectedDate, selectKValue, addK, delK, addMoney };
});