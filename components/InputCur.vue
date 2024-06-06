<script setup>
var props = defineProps({
  payIndex: {
    type: Number,
  },
  kIndex: {
    type: Number,
  },
});
var emit = defineEmits(['moneyInput']);
  function inpFrontFun(ev) {
    var k = ev.key;
    var elm = ev.target; 
    var inpBack = elm.previousElementSibling;
    if (/^[^\d.]$/.test(k) && k !== "Backspace") {
      return false;
    }
    if (k === ".") {
      if (inpBack.value.indexOf(".") >= 1) {
        return false;
      }
    }
    var varr = inpBack.value.split(".");
    if (varr.length === 2 && varr[1].length >= 4 && k !== "Backspace") {
      return false;
    }
    
    inpFrontChange(ev, k);
    return false;
  }
  function inpFrontChange(ev, k0) {
    var k = k0;
    var inpBack = ev.target.previousElementSibling;
    var vb = inpBack.value.replace(/,/g, "");

    if (/^[\d.]$/.test(k)) {
      vb += k;
      var vbarr = vb.split(".");
      if (vbarr.length === 1) {
        inpBack.value = (+vbarr[0]).toLocaleString();
      } else if (vbarr.length === 2) {
        inpBack.value = (+vbarr[0]).toLocaleString() + "." + vbarr[1];
      }
    } else if (/^Backspace$/.test(k)) {
      vb = vb.slice(0, vb.length - 1);
      var vbarr = vb.split(".");
      if (vbarr.length === 1) {
        inpBack.value = (+vbarr[0]).toLocaleString();
        if (inpBack.value === '0') {inpBack.value = '';}
      } else if (vbarr.length === 2) {
        inpBack.value = (+vbarr[0]).toLocaleString() + "." + vbarr[1];
      }
    }
    inputBackMoney(inpBack)
    return false;
  }
  function inputBackMoney(elm) {
    console.log(elm.value);
    var mon = Math.round(+elm.value.replace(/,/g,'') * 10000);
    emit('moneyInput',mon,props.payIndex,props.kIndex);
    console.log(mon);
  }
  function testFun(ev) {

  }
</script>
<template>
  <div  class="relative h-10 w-[150px]">
    <input  class="cal-input placeholder:text-green-300" type="text" value="" placeholder="จำนวนเงิน"  />
    <!-- <input  class="cal-input cal-front" type="text" value=""  @input="testFun"/> -->
    <input  class="cal-input cal-front" type="text" value="" @keydown="inpFrontFun " oninput="this.value = ''"/>
  </div>
</template>



<style lang="scss" scoped>

  .cal-input {
    position: absolute;
    width: 100%;
    text-align: right;
    font-size: 1rem;
    padding: 6px 8px;
  
    box-sizing: border-box;
    border: 1px solid rgb(187 247 208);
    border-radius: 4px;
    background-color: white;
  }
  
  .cal-front {
    
    border-color:  rgba(255, 255, 255, 0) ;
    background-color: rgba(255, 255, 255, 0);
  }
  .cal-front:focus {
    outline: none;
    
  }

</style>
