<template>
  <div  class="w-[100px]">
    <div class="">
      <input class="border border-[rgb(187 247 208)] result placeholder:text-green-300" :class="{'border-none': true}" :placeholder="pH" :value="vL">
    </div> 
  </div>
</template>

<script setup>
// defineEmits(['selectedTime']);
var props = defineProps({
  pH: {
    type: String,
  },
  vL: {
    type: String,
    default: ""
  }
  
});


</script>

<style lang="scss" scoped>


.result {
  overflow: hidden;
  width: 100%;
  pointer-events: none;
  text-align: right;
  font-family: inherit;
  padding: 6px;
 // border: 1px solid rgb(187 247 208);
  border-radius: 4px;
  outline: none;
  background-color: white;
}

</style>
