export const usePrjStore = defineStore('prj', () => {
    var timeRangeA = ref(1167584400000);
    // console.log(new Date(2007, 0, 1).getTime());
    var timeRangeZ = ref(Date.now() - 1000*60*60*24*60);
    var timeSummit = ref(null);
    var timeFinish = ref(null);
    var timePays = ref(null);
    var count = ref(5);
    class Pay {
        constructor() {
            this.id = Math.random().toString();
            this.time = null;
            this.kvalues = [];
        }
    }
    class Kindex {
        constructor() {
            this.id = Math.random().toString();
            this.kindex = null;
            this.money = null;
        }
    }


    return { timeRangeA, timeRangeZ, timeSummit, timeFinish, timePays, count };
});