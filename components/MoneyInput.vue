<template>
    <div class="relative w-[210px] h-12">
        <div ref="target" class="absolute z-10 w-[210px]">
            <UInput v-model="value" @click="openPad" type="button"
                class="w-[210px] border rounded-md shadow-sm hover:shadow-md"
                :ui="{ base: 'hover:!cursor-pointer text-right' }" icon="i-solar-hand-money-linear" size="sm" color="white"
                variant="none" :trailing="false" placeholder="จำนวนเงิน...">
                <template #trailing>
                    <span class="text-xs text-gray-500 dark:text-gray-400">บาท</span>
                </template>
            </UInput>
            <Transition name="slide">
                <div  v-show="isPad" class="border border-gray-50 mt-2 rounded-md shadow-sm w-[210px] p-1 bg-gray-50 dark:bg-gray-800 dark:text-white">
                    <div class="grid grid-cols-3 grid-rows-4 gap-2 p-2 border">
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">7</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">8</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">9</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">4</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">5</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">6</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">1</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">2</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">3</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">C</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">0</div>
                        <div class="p-2 font-bold text-center bg-green-300 rounded-sm shadow hover:shadow-md hover:cursor-pointer hover:bg-green-400 dark:bg-green-900 dark:hover:bg-green-800 justify-self-auto"
                            @click="addNum">.</div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>


<script setup>
const value = ref('');
var isPad = ref(false);
var target = ref(null);
// var isTable = ref(false);
onClickOutside(target, () => {
    isPad.value = false;
});
function openPad() { 
    isPad.value = !isPad.value;
}
function addNum(e) {
    let vo = value.value
    let v = vo.replace(/,/g,'');
    let n = e.target.innerHTML;
    
    // console.log(n);
    // console.log(n === 'C');
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
    
    value.value = varr0 + ((varr[1] == null )? '' : '.' + varr[1]);

}
</script>

<style >
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}
</style>
