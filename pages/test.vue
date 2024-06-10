<template>
    <br><br><br>
    <div class="max-w-lg p-4 mx-auto border border-green-200 rounded-md"  >
        <div class="grid grid-cols-[130px_1fr]">
            <div class="py-3 text-lg border" >วันเสนอราคา</div>
            <div class="py-3 border"><Datepicker /></div>
            <div class="py-3 text-lg border">วันสิ้นสุดสัญญา</div>
            <div class="py-3 border"><Datepicker /></div>
            <div class="py-3 border">5</div>
            <div class="py-3 border">6</div>
        </div>
        <MoneyInput class="" />
        <p class="text-4xl" >การซื้อสินค้า Sarabun</p>
        <p class="text-4xl" >การซื้อสินค้า โดยการ abcdf</p>
        <div class="text-4xl" >การซื้อสินค้า Kanit</div>
        <div class="text-4xl" >การซื้อสินค้า โดยการ abcdf</div>
        <div class="text-4xl" style="font-family: 'Sriracha';">การซื้อสินค้ Sriracha</div>
        
    </div>
    
    <div class="h-8 w-[400px] m-auto">
        <Kselect />
    </div>
    <br><br>
    <p>ggggggg</p>
</template>

<script setup>
import { k_fom,k_index,k_name,k_select } from '~/assets/js/kvar.js';

var prj = usePrjStore();
// var kvar = useKvarStore();
// var kfom = reactive(kvar.kfom);
var kIndex = ref(k_index());

onMounted(() => {

    console.log(k_select());
    console.log(k_name);
    // prj.count = 25;
   
    
}
    
)

// console.log(kvar.kselect);
</script>

<style lang="scss" scoped>

p {
    font-family: "Kanit", sans-serif;
    font-weight: 500;
    font-style: normal;
}
div, span {
    font-family: "Sarabun", sans-serif;
    font-weight: 500;
    font-style: normal;
}
</style>