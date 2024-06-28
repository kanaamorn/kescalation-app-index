import { k_value,month,kMonth, k_fom,thaiDate, k_name as kName} from "~/assets/js/kvar";
export const usePrjStore = defineStore('prj', () => {
  var kFom = ref(k_fom)
  var kValue = ref(k_value);
  var timeSummit = ref(null);
  var timeFinish = ref(null);
  var prjStr = ref([]);
  class Pay {
    constructor() {
      this.id = Date.now().toString();
      this.time = null;
      this.isInTime = null;
      this.kvalues = [];
      this.str = [];
    }
  }
  class Kindex {
    constructor() {
      this.id = Date.now().toString();
      this.kindex = null;
      this.kval = null;
      this.kreturn = null;
      this.money = 0;
      this.mreturn = '0.00';
      this.msg = [];
      this.str = [];
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

 
  
  function delPay(i) {
    if (confirm('ท่านต้องการลบ งวดที่ ' + (i+1)) == true) { timePays.value.splice(i, 1); }
  }
  function addK(i) {
    timePays.value[i].kvalues.push(new Kindex);
  }
  function delK(i, j) {
    if (confirm('ท่านต้องการลบ รายการที่ ' + (j+1)) == true) { timePays.value[i].kvalues.splice(j, 1); }  
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
    kFom.value[K][1].forEach((i) => {
        txt.push(`\t\t${i}ₜ = ${kValue.value[Tt][i]} ${kName[i]}`);
    });

    txt.push(`\tดัชนีราคา เดือนเสนอราคา ${thaiDate(timeSummit.value)[4]}`);
    kFom.value[K][1].forEach((i) => {
        txt.push(`\t\t${i}ₒ = ${kValue.value[To][i]} ${kName[i]}`);
    });

    txt.push(`\tวิธีคำนวน`);
    var str = "K = " + kFom.value[K][0][0];
    for (let i = 0; i < kFom.value[K][1].length; i++) {
        str += " + " + kFom.value[K][0][i + 1] + "(" + kValue.value[Tt][kFom.value[K][1][i]] + "/" + kValue.value[To][kFom.value[K][1][i]] + ")";
    }
    txt.push(`\t\t${str}`);
    str = "";
    str += "K = " + kFom.value[K][0][0];
    for (let i = 0; i < kFom.value[K][1].length; i++) {
        str += " + " + kFom.value[K][0][i + 1] + "(" + (+kValue.value[Tt][kFom.value[K][1][i]] / +kValue.value[To][kFom.value[K][1][i]]).toFixed(6) + ")";
    }
    txt.push(`\t\t${str}`);
    txt.push(
        `\t\t\t(กำหนดให้ใช้ทศนิยม 3 ตำแหน่ง ทุกขั้นตอนโดยไม่มีการปัดเศษ)`
    );
    str = "";
    str += "K = " + kFom.value[K][0][0];
    for (let i = 0; i < kFom.value[K][1].length; i++) {
        str += " + " + kFom.value[K][0][i + 1] + "(" + (+kValue.value[Tt][kFom.value[K][1][i]] / +kValue.value[To][kFom.value[K][1][i]]).toFixed(6).slice(0, -3) + ")";
    }
    txt.push(`\t\t${str}`);
    str = "";
    str += "K = " + kFom.value[K][0][0];
    for (let i = 0; i < kFom.value[K][1].length; i++) {
        str += " + " + (+kFom.value[K][0][i + 1] * +(+kValue.value[Tt][kFom.value[K][1][i]] / +kValue.value[To][kFom.value[K][1][i]]).toFixed(6).slice(0, -3)).toFixed(6);
    }
    txt.push(`\t\t${str}`);
    txt.push(
        `\t\t\t(กำหนดให้ใช้ทศนิยม 3 ตำแหน่ง ทุกขั้นตอนโดยไม่มีการปัดเศษ)`
    );
    str = "";
    str += "K = " + kFom.value[K][0][0];
    for (let i = 0; i < kFom.value[K][1].length; i++) {
        str += " + " + (+kFom.value[K][0][i + 1] * +(+kValue.value[Tt][kFom.value[K][1][i]] / +kValue.value[To][kFom.value[K][1][i]]).toFixed(6).slice(0, -3)).toFixed(6).slice(0, -3);
    }
    txt.push(`\t\t${str}`);
    str = "";
    str += "K = ";
    sum = +kFom.value[K][0][0];
    for (let i = 0; i < kFom.value[K][1].length; i++) {
        sum += +(+kFom.value[K][0][i + 1] * +(+kValue.value[Tt][kFom.value[K][1][i]] / +kValue.value[To][kFom.value[K][1][i]]).toFixed(6).slice(0, -3)).toFixed(6).slice(0, -3);
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
  function calKitem(st, ft, pt, kv,pi, ki){
    var txt = [];
    // console.log('come here');
    var K = timePays.value[pi].kvalues[ki].kindex;
    var m = timePays.value[pi].kvalues[ki].money ? timePays.value[pi].kvalues[ki].money : 0;
    var isInTime = timePays.value[pi].isInTime;
    var kc = "";
    // console.log('isInTime=' + isInTime);
    // console.log('K=' + K);
    if (K === null) { return; }
    txt.push('');
    txt.push(`\tรายการที่${ki + 1}  ${K.replace(/_/g, ".")}  ${kFom.value[K][2]}`);
    txt.push(`\tสูตรคำนวน ${kFom.value[K][3]}`);
    if (isInTime) {
      var strArr = calK(st, pt, K, "pt");
      txt.push(strArr[0]);
      txt.push(`\t\tจึงใช้ ค่า K เดือนส่งมอบงาน = ${strArr[1]} คำนวน`);
      kc = strArr[1];
    } else {
      var strArr = calK(st, pt, K, "pt");
      txt.push(strArr[0]);
      var str2Arr = calK(st, ft, K, "ft");
      txt.push(str2Arr[0]);
      txt.push("");
      txt.push("\tเปรียบเทียบค่า K");
      txt.push(`\t\tK เดือนส่งมอบงาน   = ${strArr[1]}`);
      txt.push(`\t\tK เดือนสิ้นสุดสัญญา  = ${str2Arr[1]}`);
      if (+strArr[1] > +str2Arr[1]) {
        txt.push(`\t\tK เดือนสิ้นสุดสัญญา น้อยกว่า K เดือนส่งมอบงาน`);
        txt.push(`\t\tจึงใช้ ค่า K เดือนสิ้นสุดสัญญา = ${str2Arr[1]} คำนวน`);
        kc = str2Arr[1];
      } else if (+strArr[1] < +str2Arr[1]) {
        txt.push(
          `\t\tK เดือนส่งมอบงาน น้อยกว่า K เดือนสิ้นสุดสัญญา`
        );
        txt.push(
          `\t\tจึงใช้ ค่า K เดือนส่งมอบงาน = ${strArr[1]} คำนวน`
        );
        kc = strArr[1];
      } else {
        txt.push(
          `\t\tK เดือนส่งมอบงาน เท่ากับ K เดือนสิ้นสุดสัญญา`
        );
        txt.push(
          `\t\tจึงใช้ ค่า K เดือนส่งมอบงาน  = ${strArr[1]} คำนวน`
        );
        kc = strArr[1];
      }
    }
    timePays.value[pi].kvalues[ki].kval = kc;
    var kcInt = parseInt(+kc * 1000);
    // console.log('kcal-2');
    // console.log('kcal= ' + kcInt);
    var mReturn = "";
    var kreturn = '';
    var msg = [];
    var mReNum
    if (kcInt > 1040) {
      kreturn = `${(+kc - 1.04).toFixed(3)}`
      // txt.push(`\t\tค่า K = ${kc} เพิ่มขึ้นเกิน 4%(1.040) ได้รับเงินชดเชย เท่ากับ ${kc} - 1.04 = ${(kreturn)}`);
      // txt.push( `\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 100).toLocaleString( "th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" } )} บาท` );
      mReNum = (+kc - 1.04) * m;
      mReturn = (mReNum / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
      // txt.push( `\t\tในงวดนี้ ได้รับเงินชดเชย เท่ากับ ${(+kc - 1.04).toFixed(3)} x ${( m / 100 ).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท` );
      msg.push(`\t\tค่า K = ${kc} เพิ่มขึ้นมากกว่า 4%(1.040) ได้รับเงินชดเชย เท่ากับ ${kc} - 1.04 = ${(kreturn)}`);
      msg.push(`\t\tจำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท`);
      msg.push(`\t\tได้รับเงินชดเชย = ${kreturn} x ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2", })} = ${mReturn} บาท`);
    } else if (kcInt <= 1040 && kcInt > 1000) {
      // txt.push(`\t\tค่า K = ${kc} เพิ่มขึ้นไม่เกิน 4%(1.040) ไม่ได้รับเงินชดเชย`);
      kreturn = ``;
      mReNum = 0;
      mReturn = '0.00';
      msg.push(`\t\tค่า K = ${kc} เพิ่มขึ้นไม่มากกว่า 4%(1.040) ไม่ได้รับเงินชดเชย`);
      msg.push(`\t\tจำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท`);
      msg.push(`\t\tได้รับเงินชดเชย = ${mReturn} บาท`);
      // msg.push(``);
    } else if (kcInt === 1000) {
      kreturn = ``;
      // txt.push(`\t\tค่า K = ${kc} ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
      mReNum = 0;
      mReturn = '0.00';
      msg.push(`\t\tค่า K = ${kc} ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
      msg.push(`\t\tจำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })} บาท`);
      // msg.push(``);
      // msg.push(``);
      msg.push(`\t\tได้รับเงินชดเชย = ${mReturn} บาท`);
    } else if (kcInt < 1000 && kcInt >= 960) {
      kreturn = ``;
      // txt.push(`\t\tค่า K ลดลงไม่เกิน 4%(0.960) 4% ไม่ต้องคืนเงินชดเชย`);
      mReNum = 0;
      mReturn = '0.00';
      msg.push(`\t\tค่า K = ${kc} ลดลงไม่น้อยกว่า 4%(0.960) ไม่ต้องคืนเงินชดเชย`);   
      msg.push(`\t\tได้รับเงินชดเชย = ${mReturn} บาท`);
    } else if (kcInt < 960) {
      kreturn = `${(+kc - 0.960).toFixed(3)}`;
      // txt.push(`\t\tค่า K ลดลงเกิน 4%(0.960) คืนเงินชดเชย เท่ากับ ${kc} - 0.960 = ${kreturn}`);
      // txt.push(`\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
      mReNum = (+kc - 0.96) * m;
      mReturn = (mReNum / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", });
      // txt.push( `\t\tในงวดนี้ คืนเงินชดเชย เท่ากับ ${(0.96 - +kc).toFixed(3)} x ${( m / 100 ).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท` );
      msg.push(`\t\tค่า K = ${kc} ลดลงน้อยกว่า 4%(0.960) คืนเงินชดเชย ${kc} - 0.960 = ${kreturn}`);
      msg.push(`\t\tจำนวนเงินส่งงวด รายการนี้ = ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "2", minimumFractionDigits: "2" })}`);
      msg.push(`\t\tต้องคืนเงินชดเชย = ${(0.96 - +kc).toFixed(3)} x ${(m / 100).toLocaleString("th-TH", { maximumFractionDigits: "4", minimumFractionDigits: "4", })} = ${mReturn} บาท`);
    }
    txt.push("");
    timePays.value[pi].kvalues[ki].kreturn = kreturn;
    timePays.value[pi].kvalues[ki].str = txt;
    timePays.value[pi].kvalues[ki].msg = msg;
    timePays.value[pi].kvalues[ki].mreturn = mReturn;
  
  
    // txt.forEach((va) => {
    //   console.log(va);
    // })
  }
  onMounted(() => {

  });

  return { timeRangeA, timeRangeZ, timeSummit, timeFinish, timePays, timePaysArr, kValue,prjStr,refreshPrj, addPay,calKitem, delPay, addK, delK };
});