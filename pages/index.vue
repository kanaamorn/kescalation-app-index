<template>
  <div >
    <br><br>
    <UCard :ui="{ base: '', ring: 'ring-blue-200 dark:ring-blue-800', height: 'h-auto' }" class="relative mx-2">
      <div class="absolute top-0 right-0">
        <button
          class="p-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:cursor-pointer"
          title="คำนวนใหม่" @click="refresh">
          <Icon name="ep:refresh" /> Refresh
        </button>
      </div>
      <!-- <h1  class="pt-2 pb-3 text-3xl font-normal text-center text-blue-600">คำนวนค่าK</h1> -->
      <div v-if="recal" class="flex flex-wrap  min-[510px]:flex-nowrap mt-5" >
        <div class="basis-[100%] min-[510px]:basis-[130px] p-[6px] text-blue-600 text-lg">วันเสนอราคา</div>
        <div class="min-h-[48px] w-[320px] shrink">
          <Datepicker @selected-date="selectDate" :time-range-a="timeRangeA" :time-range-z="timeRangeZ"
            :time-summit="timeSummit" :time-finish="timeFinish" :time-pay="timePay" name="วันเสนอราคา" />
        </div>
      </div>
      <div v-if="timeSummit" class="flex flex-wrap  min-[510px]:flex-nowrap mt-2">
        <div class="basis-[100%] min-[510px]:basis-[130px] p-[6px] text-blue-600 text-lg">
          วันสิ้นสุดสัญญา
        </div>
        <div class="min-h-[48px] w-[320px] shrink">
          <Datepicker @selected-date="selectDate" :time-range-a="timeRangeA" :time-range-z="timeRangeZ"
            :time-summit="timeSummit" :time-finish="timeFinish" :time-pay="timePay" name="วันสิ้นสุดสัญญา" />
        </div>
      </div>
      <div id="timePay" v-if="timeFinish">
        <div class="mt-2 p-[6px] text-blue-600 text-lg">ส่งงวดงาน</div>
        <UCard :ui="{ base: '', ring: 'ring-blue-100 dark:ring-blue-700', height: 'h-auto' }" class="">
          <div v-for="(v, i) in timePay" :key="v.id">
            <div class="flex flex-wrap  min-[510px]:flex-nowrap">
              <div class="p-[6px] basis-[100%] min-[510px]:basis-[130px] text-blue-600">
                งวดที่ {{ i + 1 }} วันที่
              </div>
              <div>
                <Datepicker class="text-blue-600" @selected-date="selectDate" :time-range-a="timeRangeA"
                  :time-range-z="timeRangeZ" :time-summit="timeSummit" :time-finish="timeFinish" :time-pay="timePay"
                  name="วันส่งมอบงาน" :pay-index="i" />
              </div>
              <div v-if="timePay.length > 1" class="ml-1">
                <div
                  class="p-[6px] border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer"
                  @click="removePay(i)" title="ลบงวดนี้">
                  <button class="">
                    <Icon name="heroicons:minus" /> ลบงวดงาน
                  </button>
                </div>
              </div>
            </div>
            <br>
            <br>
            <br class="min-[510px]:hidden">
            <div v-if="timePay[0].time" class="">
              <!-- <div class="flex flex-row mt-8 mb-2 ml-8 text-green-600">
                <div class="p-[6px] shrink-0 w-[30px]"></div>
                <div class="p-[6px] shrink-0 w-[320px] text-center">สูตรค่า K</div>
                <div class="p-[6px] shrink-0 w-[170px] text-center">จำนวนเงิน</div>
                <div class="p-[6px] shrink-0 w-[100px] text-center">ผลคำนวน</div>
                <div class="p-[6px] shrink-0 w-[170px] text-center">เงินชดเชย</div>
                <div v-if="user"
                  class="p-[6px] shrink-0 inline-block border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:cursor-pointer"
                  @click="addKItem(i)">
                  <button class="">
                    <Icon name="heroicons:plus" /> เพิ่มรายการ
                  </button>
                </div>
              </div> -->
              <div v-for="(k, ki) in v.kValue" :key="k.id">
                <!--table kvalue-->
                <UCard :ui="{ base: '', ring: 'ring-green-200 dark:ring-green-800' }"
                  class="w-full min-[580px]:w-[530px] m-auto">
                  <div class="text-green-600">
                    <div class="p-[6px] text-center mb-3">รายการที่{{ ki + 1 }}</div>
                    <div class="h-[40px] flex mb-2">
                      <div class="basis-[120px] truncate p-[6px]">สูตรค่า K</div>
                      <div class="basis-[340px] shrink" title="สูตรค่า K">
                        <Kselect :pay-index="i" :k-index="ki" @select-k-value="selectKValue" />
                      </div>
                    </div>
                    <div class="h-[40px] flex mb-2">
                      <div class="shrink truncate basis-[120px] p-[6px]">จำนวนเงิน ส่ง</div>
                      <div class="" title="จำนวนเงิน ส่ง">
                        <InputCur :pay-index="i" :k-index="ki" @money-input="moneyInput" />
                      </div>
                    </div>
                    <div
                      class="h-[40px] flex mb-2">
                      <div class="shrink truncate basis-[120px] p-[6px] ">ผลคำนวนค่า K</div>
                      <div class="" title="ผลคำนวนค่า K">
                        <Kresult p-h="ผลคำนวน" style="width: 155px" :v-l="k.kRe" />
                      </div>
                    </div>
                    <div class="h-[40px] flex">
                      <div class="shrink truncate basis-[120px] p-[6px] ">เงินชดเชย</div>
                      <div class="" title="เงินชดเชย">
                        <Kresult p-h="เงินชดเชย"  style="width: 155px" :v-l="k.mRe" />
                      </div>
                    </div>
                    <div v-if="timePay[i].kValue.length > 1" class="ml-1 basis-[60px] shrink-0">
                      <div
                        class="p-[6px] border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer"
                        @click="removeKItem(i, ki)" title="ลบรายการนี้">
                        <button class="">
                          <Icon name="heroicons:minus" /> ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                </UCard>
              </div>
              <!--end of  v-for kValue-->
              <!-- <br />
              <div class="flex flex-row mt-0 ml-8 text-green-600">
                <div class=" w-[130px] text-right">ผลรวม เงินชดเชย&nbsp;&nbsp;&nbsp;</div>
                <div class=" w-[170px] text-right"><span class="border-b-4 border-green-600 border-double">{{
                  moneyReturn }}</span></div>
              </div> -->
            </div>
            <!--end of table kvalue -->
          </div>
        </UCard>
      </div>
      <!--end of v-for timePay-->
      <div class="">
      </div>
      <br />
      <div v-if="user"
        class="p-[6px] inline-block mt-5 border rounded border-blue-600 text-blue-600 hover:bg-green-600 hover:text-white hover:cursor-pointer"
        @click="addPay()">
        <button class="">
          <Icon name="heroicons:plus" /> เพิ่มงวดงาน
        </button>
      </div>
    </UCard>
    <br>
    <!--end of project calculation-->

    <!-- <div v-if="timePay[0].kValue[0].kIndex" class="hidden overflow-hidden border-2 border-gray-200 rounded">
      <button
        class="w-1/2 px-1 py-3 text-xl transition bg-gray-200 border-r border-gray-200 cursor-pointer hover:bg-gray-300 hover:text-white"
        :class="{ 'bg-gray-800 text-white hover:bg-gray-800': isCalTab, 'w-full': !user }"
        @click="isCalTab = true">รายการคำนวน</button>
      <button v-if="user"
        class="w-1/2 px-1 py-3 text-xl transition bg-gray-200 border-l border-gray-200 cursor-pointer hover:bg-gray-300 hover:text-white"
        :class="{ 'bg-gray-800 text-white hover:bg-gray-800': !isCalTab }" @click="isCalTab = false">เอกสารคำนวน ค่า
        K</button>
    </div> -->
    <br />
    <div v-if="timePay[0].kValue[0].kIndex" id="report" v-show="isCalTab">
      <div id="summary" v-if="kValue" class="relative hidden">
        <div class="py-3 text-xl text-center text-black">สรุป ผล</div>
        <br>
        <div class="overflow-auto">
          <table id="TableToExport" class="mx-auto border border-collapse table-fixed border-slate-400">
            <tr class="text-center">
              <td class="border border-slate-300 p-2 w-[30px]"></td>
              <td class="border border-slate-300 p-2 w-[300px]">สูตรค่า K</td>
              <td class="border border-slate-300 p-2 w-[170px]">จำนวนเงิน</td>
              <td class="border border-slate-300 p-2 w-[100px]">ผลคำนวน</td>
              <td class="border border-slate-300 p-2 w-[170px]">เงินชดเชย</td>
            </tr>
            <template v-for="(v, i) in timePay" :key="v.id">
              <tr>
                <td colspan="5" class="p-2 border border-slate-300">ส่งงวดงาน ที่ {{ i + 1 }} <span v-if="v.time">วันที่
                    {{ thaiDate(v.time)[3] }}</span></td>
              </tr>
              <tr v-for="(k, ki) in v.kValue" :key="k.id">
                <template v-if="k.kIndex">
                  <td class="p-2 border border-slate-300">{{ ki + 1 }}</td>
                  <td class="p-2 truncate border border-slate-300">{{ k.kIndex.replace(/_/g, '.') + " " +
                    kFom[k.kIndex][2]
                  }}</td>
                  <td class="p-2 text-right border border-slate-300">{{ ((+k.money) / 10000).toLocaleString("th-TH", {
                    maximumFractionDigits: "4", minimumFractionDigits: "4"
                  }) }}</td>
                  <td class="p-2 text-right border border-slate-300">{{ k.kRe }}</td>
                  <td class="p-2 text-right border border-slate-300">{{ k.mRe }}</td>
                </template>
              </tr>
            </template>
            <tr>
              <td colspan="4" class="p-2 text-right border border-slate-300">ผลรวม ทั้งหมด &nbsp;&nbsp;</td>
              <td class="p-2 text-right border border-slate-300"><span class="border-b-4 border-double border-gray-950">{{
                moneyReturn }}</span></td>
            </tr>
          </table>
        </div>
        <button id="sheetjsexport"
          class="absolute top-2 right-2 z-10 p-[2px] border align-middle rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:cursor-pointer"
          @click="exportToExcel">
          <Icon name="vscode-icons:file-type-excel" /> Export Table As XLSX
        </button>
        &nbsp;
      </div>
      <UCard :ui="{ base: 'overflow-x-auto', ring: 'ring-violet-200 dark:ring-violet-800' }" class="mx-2">
        <div class="relative">
          <div class="text-right">
            <button
              class=" p-[2px]  text-sm border rounded border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white hover:cursor-pointer"
              @click="exportToDoc">
              <Icon name="fa:file-text-o" /> Export As Text
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              class=" p-[2px] text-sm border rounded border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white hover:cursor-pointer"
              @click="copy(source)">
              <Icon name="ion:copy-outline" /> copy
            </button>

          </div>
          <div class="py-3 text-2xl text-center text-violet-600">รายการคำนวน</div>
          <pre id="clip" class="">
            <div id="wordDoc" class="text-violet-600" v-html="reports[1]"></div>
          </pre>

          &nbsp;
        </div>
      </UCard>
      &nbsp;
    </div>


    <div id="downloadPdf" v-if="user" v-show="!isCalTab">
      <div class="py-3 text-xl text-center text-black">เอกสารคำนวน ค่า K</div>
      <br>
      <div v-if="timeSummit">
        <div class="border border-gray-800 rounded-b">
          <div class="relative pt-[70.70%] w-full">
            <object class="absolute top-0 bottom-0 left-0 right-0 w-full h-full" :data="'http://www.price.moc.go.th/price/fileuploader/file_csi/' +
              (new Date(timeSummit).getFullYear() + 543).toString() +
              '-' +
              kMonth[new Date(timeSummit).getMonth()] +
              '.pdf'
              " type="application/pdf" width="800px" height="600px"></object>
          </div>
          <div class="py-3 text-center text-white bg-gray-700">
            ดัชนี เดือนเสนอราคา
            {{
              month[new Date(timeSummit).getMonth()] +
              " " +
              (new Date(timeSummit).getFullYear() + 543).toString()
            }}
          </div>
        </div>
        <br />
      </div>
      <div v-if="timeSummit &&
          timeFinish &&
          timeFinish < timePay[timePay.length - 1].time
          ">
        <div class="relative pt-[70.70%] w-full">
          <object class="absolute top-0 bottom-0 left-0 right-0 w-full h-full" :data="'http://www.price.moc.go.th/price/fileuploader/file_csi/' +
            (new Date(timeFinish).getFullYear() + 543).toString() +
            '-' +
            kMonth[new Date(timeFinish).getMonth()] +
            '.pdf'
            " type="application/pdf" width="800px" height="600px"></object>
        </div>
        <div class="py-3 text-center text-white bg-gray-700">
          ดัชนี เดือนสิ้นสุดสัญญา
          {{
            month[new Date(timeFinish).getMonth()] +
            " " +
            (new Date(timeFinish).getFullYear() + 543).toString()
          }}
        </div>
        <br />
      </div>
      <div v-for="(item, index) in timePay" :key="item.payday">
        <div v-if="timePay[index].time">
          <div class="relative pt-[70.70%] w-full">
            <object class="absolute top-0 bottom-0 left-0 right-0 w-full h-full" :data="'http://www.price.moc.go.th/price/fileuploader/file_csi/' +
              (new Date(item.time).getFullYear() + 543).toString() +
              '-' +
              kMonth[new Date(item.time).getMonth()] +
              '.pdf'
              " type="application/pdf" width="800px" height="600px"></object>
          </div>
          <div class="py-3 text-center text-white bg-gray-700">
            ดัชนี เดือนส่งมอบงาน งวดที่ {{ index + 1 }}
            {{
              month[new Date(item.time).getMonth()] +
              " " +
              (new Date(item.time).getFullYear() + 543).toString()
            }}
          </div>
          <br />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {lang: 'th-TH'},
  meta: [{ 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }],
  link: [
    {
      rel: 'icon',
      type: "image/png",
      href: "/favicon.png"
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400&display=swap',
      crossorigin: ''
    }
  ],
  script: [
    {
      lang: 'javascript',
      src: 'https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js',
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'bodyClose'
    },
    { children: `window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
      
        gtag('config', 'G-11939FEBCM');`,
        tagPosition: 'head' },
    // {
    //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9528806984963822',
    //   async: true,
    //   crossorigin: "anonymous",
    //   tagPosition: 'head'
    // }    
  ]
})
const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });
var month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
var kMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var kFom = reactive({
  K1: [
    ["0.25", "0.15", "0.10", "0.40", "0.10"],
    ["I", "C", "M", "S"],
    "งานอาคาร",
    "K = 0.25 + 0.15 It/Io + 0.10 Ct/Co + 0.40 Mt/Mo + 0.10 St/So",
    "K1    ",
  ],
  K2_1: [
    ["0.30", "0.10", "0.40", "0.20"],
    ["I", "E", "F"],
    "งานดิน",
    "K = 0.30 + 0.10 It/Io + 0.40 Et/Eo + 0.20 Ft/Fo",
    "K2.1  ",
  ],
  K2_2: [
    ["0.40", "0.20", "0.20", "0.20"],
    ["I", "M", "F"],
    "งานหินเรียง",
    "K = 0.40 + 0.20 It/Io + 0.20 Mt/Mo + 0.20 Ft/Fo",
    "K2.2  ",
  ],
  K2_3: [
    ["0.45", "0.15", "0.10", "0.20", "0.10"],
    ["I", "M", "E", "F"],
    "งานเจาะระเบิดหิน",
    "K = 0.45 + 0.15 It/Io + 0.10 Mt/Mo + 0.20 Et/Eo + 0.10 Ft/Fo",
    "K2.3  ",
  ],
  K3_1: [
    ["0.30", "0.40", "0.20", "0.10"],
    ["A", "E", "F"],
    "งานผิวทาง PRIME COAT, TACK COAT, SEAL COAT",
    "K = 0.30 + 0.40 At/Ao + 0.20 Et/Eo + 0.10 Ft/Fo",
    "K3.1  ",
  ],
  K3_2: [
    ["0.30", "0.10", "0.30", "0.20", "0.10"],
    ["M", "A", "E", "F"],
    "งานผิวทาง SURFACE TREATMENT",
    "K = 0.30 + 0.10 Mt/Mo + 0.30 At/Ao + 0.20 Et/Eo + 0.10 Ft/Fo",
    "K3.2  ",
  ],
  K3_3: [
    ["0.30", "0.10", "0.40", "0.10", "0.10"],
    ["M", "A", "E", "F"],
    "งานผิวทาง ASPHALTIC CONCRETE, PENETRATION MACADAM",
    "K = 0.30 + 0.10 Mt/Mo + 0.40 At/Ao + 0.10 Et/Eo + 0.10 Ft/Fo",
    "K3.3  ",
  ],
  K3_4: [
    ["0.30", "0.10", "0.35", "0.10", "0.15"],
    ["I", "C", "M", "S"],
    "งานถนน คสล.",
    "K = 0.30 + 0.10 It/Io + 0.35 Ct/Co + 0.10 Mt/Mo + 0.15 St/So",
    "K3.4  ",
  ],
  K3_5: [
    ["0.35", "0.20", "0.15", "0.15", "0.15"],
    ["I", "C", "M", "S"],
    "งานท่อระบายน้ำ คสล. และบ่อพัก",
    "K = 0.35 + 0.20 It/Io + 0.15 Ct/Co + 0.15 Mt/Mo + 0.15 St/So",
    "K3.5  ",
  ],
  K3_6: [
    ["0.30", "0.10", "0.15", "0.20", "0.25"],
    ["I", "C", "M", "S"],
    "งานสะพาน เขื่อนกันตลิ่ง คสล.",
    "K = 0.30 + 0.10 It/Io + 0.15 Ct/Co + 0.20 Mt/Mo + 0.25 St/So",
    "K3.6  ",
  ],
  K3_7: [
    ["0.25", "0.10", "0.05", "0.20", "0.40"],
    ["I", "C", "M", "S"],
    "งานโครงสร้างเหล็ก",
    "K = 0.25 + 0.10 It/Io + 0.05 Ct/Co + 0.20 Mt/Mo + 0.40 St/So",
    "K3.7  ",
  ],
  K4_1: [
    ["0.40", "0.20", "0.10", "0.10", "0.20"],
    ["I", "C", "M", "S"],
    "งานอาคารชลประทานไม่รวมบานเหล็ก",
    "K = 0.40 + 0.20 It/Io + 0.10 Ct/Co + 0.10 Mt/Mo + 0.20 St/So",
    "K4.1  ",
  ],
  K4_2: [
    ["0.35", "0.20", "0.10", "0.10", "0.25"],
    ["I", "C", "M", "S"],
    "งานอาคารชลประทานรวมบานเหล็ก",
    "K = 0.35 + 0.20 It/Io + 0.10 Ct/Co + 0.10 Mt/Mo + 0.25 St/So",
    "K4.2  ",
  ],
  K4_3: [
    ["0.35", "0.20", "0.45"],
    ["I", "G"],
    "งานบานระบาย TRASMRACK และ STEEL LINER",
    "K = 0.35 + 0.20 It/Io + 0.45 Gt/Go",
    "K4.3  ",
  ],
  K4_4: [
    ["0.25", "0.15", "0.60"],
    ["I", "S"],
    "งานเหล็กเสริมคอนกรีตและ ANCHOR BAR",
    "K = 0.25 + 0.15 It/Io + 0.60 St/So",
    "K4.4  ",
  ],
  K4_5: [
    ["0.40", "0.15", "0.25", "0.20"],
    ["I", "C", "M"],
    "งานคอนกรีตไม่รวมเหล็กและคอนกรีตดาดคลอง",
    "K = 0.40 + 0.15 It/Io + 0.25 Ct/Co + 0.20 Mt/Mo",
    "K4.5  ",
  ],
  K4_6: [
    ["0.40", "0.20", "0.10", "0.20", "0.10"],
    ["I", "M", "E", "F"],
    "งานเจาะ",
    "K = 0.40 + 0.20 It/Io + 0.10 Mt/Mo + 0.20 Et/Eo + 0.10 Ft/Fo",
    "K4.6  ",
  ],
  K4_7: [
    ["0.00", "1.00"],
    ["C"],
    "งานอัดฉีดน้ำปูน",
    "K = 0.00 + 1.00 Ct/Co",
    "K4.7  ",
  ],
  K5_1_1: [
    ["0.50", "0.25", "0.25"],
    ["I", "M"],
    "รับวางท่อ AC,PVC เฉพาะค่าแรง",
    "K = 0.50 + 0.25 It/Io + 0.25 Mt/Mo",
    "K5.1.1",
  ],
  K5_1_2: [
    ["0.40", "0.10", "0.10", "0.40"],
    ["I", "M", "AC"],
    "จัดหาและรับวางท่อ AC",
    "K = 0.40 + 0.10 It/Io + 0.10 Mt/Mo + 0.40 ACt/ACo",
    "K5.1.2",
  ],
  K5_1_3: [
    ["0.40", "0.10", "0.10", "0.40"],
    ["I", "M", "PVC"],
    "จัดหาและรับวางท่อ PVC",
    "K = 0.40 + 0.10 It/Io + 0.10 Mt/Mo + 0.40 PVCt/PVCo",
    "K5.1.3",
  ],
  K5_2_1: [
    ["0.40", "0.10", "0.15", "0.20", "0.15"],
    ["I", "M", "E", "F"],
    "รับวางท่อ GSP HDPE เฉพาะค่าแรง",
    "K = 0.40 + 0.10 It/Io + 0.15 Mt/Mo + 0.20 Et/Eo + 0.15 Ft/Fo",
    "K5.2.1",
  ],
  K5_2_2: [
    ["0.40", "0.10", "0.10", "0.10", "0.30"],
    ["I", "M", "E", "GIP"],
    "จัดหาและรับวางท่อ GSP",
    "K = 0.40 + 0.10 It/Io + 0.10 Mt/Mo + 0.10 Et/Eo + 0.30 GIPt/GIPo",
    "K5.2.2",
  ],
  K5_2_3: [
    ["0.50", "0.10", "0.10", "0.30"],
    ["I", "M", "PE"],
    "จัดหาและรับวางท่อ HDPE",
    "K = 0.50 + 0.10 It/Io + 0.10 Mt/Mo + 0.30 PEt/PEo",
    "K5.2.3",
  ],
  K5_3: [
    ["0.40", "0.10", "0.15", "0.35"],
    ["I", "E", "GIP"],
    "งานปรับปรุงอุโมงค์ส่งน้ำ และงาน SECONDARY LINING",
    "K = 0.40 + 0.10 It/Io + 0.15 Et/Eo + 0.35 GIPt/GIPo",
    "K5.3  ",
  ],
  K5_4: [
    ["0.30", "0.10", "0.20", "0.05", "0.05", "0.30"],
    ["I", "C", "M", "S", "PVC"],
    "งานวางท่อ PVC หุ้มด้วยคอนกรีต",
    "K = 0.30 + 0.10 It/Io + 0.20 Ct/Co + 0.05 Mt/Mo + 0.05 St/So + 0.30 PVCt/PVCo",
    "K5.4  ",
  ],
  K5_5: [
    ["0.25", "0.05", "0.05", "0.65"],
    ["I", "M", "PVC"],
    "งานวางท่อ PVC กลบทราย",
    "K = 0.25 + 0.05 It/Io + 0.05 Mt/Mo + 0.65 PVCt/PVCo",
    "K5.5  ",
  ],
  K5_6: [
    ["0.25", "0.25", "0.50"],
    ["I", "GIP"],
    "งานวางท่อเหล็กอาบสังกะสี",
    "K = 0.25 + 0.25 It/Io + 0.50 GIPt/GIPo",
    "K5.6  ",
  ],
  K5_7_1: [
    ["0.60", "0.25", "0.15"],
    ["I", "F"],
    "งานติดตั้งโครงเหล็กเสาส่ง และอุปกรณ์ กฟผ.",
    "K = 0.60 + 0.25 It/Io + 0.15 Ft/Fo",
    "K5.7.1",
  ],
  K5_7_2: [
    ["0.35", "0.20", "0.20", "0.10", "0.15"],
    ["I", "C", "S", "F"],
    "งานก่อสร้างฐานรากเสาไฟฟ้า กฟผ.",
    "K = 0.35 + 0.20 It/Io + 0.20 Ct/Co + 0.10 St/So + 0.15 Ft/Fo",
    "K5.7.2",
  ],
  K5_7_3: [
    ["0.50", "0.20", "0.15", "0.15"],
    ["I", "C", "S"],
    "งานฐานรากอุปกรณ์สถานีย่อย กฟผ.",
    "K = 0.50 + 0.20 It/Io + 0.15 Ct/Co + 0.15 St/So",
    "K5.7.3",
  ],
  K5_8_1: [
    ["0.35", "0.15", "0.20", "0.30"],
    ["I", "C", "S"],
    "งานเสาเข็มคอนกรีตอัดแรง",
    "K = 0.35 + 0.15 It/Io + 0.20 Ct/Co + 0.30 St/So",
    "K5.8.1",
  ],
  K5_8_2: [
    ["0.30", "0.10", "0.25", "0.35"],
    ["I", "C", "S"],
    "งานเสาเข็ม CAST IN PLACE",
    "K = 0.30 + 0.10 It/Io + 0.25 Ct/Co + 0.35 St/So",
    "K5.8.2",
  ],
  K5_9_1: [
    ["0.80", "0.05", "0.10", "0.05"],
    ["I", "M", "F"],
    "งานสายส่งแรงสูง เฉพาะค่าแรง กฟภ.",
    "K = 0.80 + 0.05 It/Io + 0.10 Mt/Mo + 0.05 Ft/Fo",
    "K5.9.1",
  ],
  K5_9_2: [
    ["0.45", "0.05", "0.20", "0.05", "0.25"],
    ["I", "M", "F", "W"],
    "งานสายส่งแรงสูง รวมจัดหาและติดตั้ง กฟภ.",
    "K = 0.45 + 0.05 It/Io + 0.20 Mt/Mo + 0.05 Ft/Fo + 0.25 Wt/Wo",
    "K5.9.2",
  ],
});
var kName = {
  M: "ดัชนีราคาวัสดุก่อสร้าง(ไม่รวมเหล็กและซิเมนต์)",
  S: "ดัชนีราคาเหล็ก",
  C: "ดัชนีราคาซิเมนต์",
  G: "ดัชนีราคาเหล็กแผ่นเรียบ",
  I: "ดัชนีราคาผู้บริโภคของประเทศ",
  F: "ดัชนีราคาน้ำมันดีเซลหมุนเร็ว",
  A: "ดัชนีราคาแอสฟัลท์",
  E: "ดัชนีราคาเครื่องจักรกลและบริภัณฑ์",
  GIP: "ดัชนีราคาท่อเหล็กอาบสังกะสี",
  AC: "ดัชนีราคาท่อซิเมนต์ใยหิน",
  PVC: "ดัชนีราคาท่อ PVC",
  W: "ดัชนีราคาสายไฟฟ้า",
  PE: "ดัชนีราคาท่อ HYDENSITY POLYETHYLENE",
};
var recal = ref(true);
var user = ref(null);
var kValue = ref(null);
var timeRangeA = ref(new Date(2007, 0, 1).getTime());
var timeRangeZ = ref(Date.now() - 86400000 * 50);
var timeSummit = ref(null);
var timeFinish = ref(null);
var timePay = ref([
  {
    id: Math.random().toString(),
    time: null,
    kValue: [
      {
        id: Math.random().toString(),
        kIndex: null,
        money: null,
        kRe: "",
        mRe: "",
      },
    ],
  },
]);

var moneyReturn = computed(() => {
  var sum = 0;
  for (let i = 0; i < timePay.value.length; i++) {
    if (timePay.value[i].time === null) {
      break;
    }
    for (let j = 0; j < timePay.value[i].kValue.length; j++) {
      sum += Math.round(10000 * (+(timePay.value[i].kValue[j].mRe.replace(/,/g, ''))))
    }
  }
  return (sum / 10000).toLocaleString("th-TH", {
    maximumFractionDigits: "4",
    minimumFractionDigits: "4",
  });
});
function selectDate(t, name, i) {
  if (name === "วันเสนอราคา") {
    timeSummit.value = t;
  } else if (name === "วันสิ้นสุดสัญญา") {
    timeFinish.value = t;
  } else if (name === "วันส่งมอบงาน") {
    timePay.value[i].time = t;
    // console.log(timePay.value);
  }
}
function selectKValue(kv, pi, ki) {
  timePay.value[pi].kValue[ki].kIndex = kv;
}
function setKValue(k) {
  var kV = JSON.parse(k);

  kValue.value = JSON.parse(JSON.stringify(kV));
  var kArr = Object.keys(kV).sort();
  var tA = kArr[0];
  var tAarr = tA.split("_");
  timeRangeA.value = new Date(+tAarr[1] - 543, +tAarr[2] - 1).getTime();
  console.log(kValue.value);
  var tZ = kArr[kArr.length - 1];
  var tZarr = tZ.split("_");
  timeRangeZ.value = new Date(+tZarr[1] - 543, +tZarr[2], 0).getTime();
}
function moneyInput(m, pi, ki) {
  timePay.value[pi].kValue[ki].money = m;
}
function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var y = this.responseText;
    // console.log(y);
    setKValue(y);
  };
  xhttp.open(
    "GET",
    "http://kescalation.old/app/php/getDataCreatJSON.php?t=" + Math.random()
  );
  xhttp.send();
}
function thaiDate(t) {
  var d = new Date(t);
  var y = d.getFullYear() + 543;
  var m = month[d.getMonth()];
  var td = d.getDate();
  var tF = td + " " + m + " " + y;
  var tmy = m + " " + y;
  return [td, m, y, tF, tmy];
}
function calK(Do, Dt, K, is) {
  var txt = [];
  var sum = "";
  var mc = is === "pt" ? "เดือนส่งมอบงาน" : "เดือนสิ้นสุดสัญญา";
  var To =
    "k_" +
    (new Date(Do).getFullYear() + 543) +
    "_" +
    kMonth[new Date(Do).getMonth()];
  var Tt =
    "k_" +
    (new Date(Dt).getFullYear() + 543) +
    "_" +
    kMonth[new Date(Dt).getMonth()];
  console.log('Tt=' + Tt);
  txt.push(`\t`);
  txt.push(`\tคำนวน ${mc}`);
  txt.push(`\tดัชนีราคา ${mc} ${thaiDate(Dt)[4]}`);
  kFom[K][1].forEach((i) => {
    txt.push(`\t\t${i}ₜ = ${kValue.value[Tt][i]} ${kName[i]}`);
  });

  txt.push(`\tดัชนีราคา เดือนเสนอราคา ${thaiDate(timeSummit.value)[4]}`);
  kFom[K][1].forEach((i) => {
    txt.push(`\t\t${i}ₒ = ${kValue.value[To][i]} ${kName[i]}`);
  });

  txt.push(`\tวิธีคำนวน`);
  var str = "K = " + kFom[K][0][0];
  for (let i = 0; i < kFom[K][1].length; i++) {
    str +=
      " + " +
      kFom[K][0][i + 1] +
      "(" +
      kValue.value[Tt][kFom[K][1][i]] +
      "/" +
      kValue.value[To][kFom[K][1][i]] +
      ")";
  }
  txt.push(`\t\t${str}`);
  str = "";
  str += "K = " + kFom[K][0][0];
  for (let i = 0; i < kFom[K][1].length; i++) {
    str +=
      " + " +
      kFom[K][0][i + 1] +
      "(" +
      (
        +kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]]
      ).toFixed(6) +
      ")";
  }
  txt.push(`\t\t${str}`);
  txt.push(
    `\t\t\t<span style="color: #ec4899; font-size :0.8rem;">(กำหนดให้ใช้ทศนิยม 3 ตำแหน่ง ทุกขั้นตอนโดยไม่มีการปัดเศษ)</span>`
  );
  str = "";
  str += "K = " + kFom[K][0][0];
  for (let i = 0; i < kFom[K][1].length; i++) {
    str +=
      " + " +
      kFom[K][0][i + 1] +
      "(" +
      (+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]])
        .toFixed(6)
        .slice(0, -3) +
      ")";
  }
  txt.push(`\t\t${str}`);
  str = "";
  str += "K = " + kFom[K][0][0];
  for (let i = 0; i < kFom[K][1].length; i++) {
    str +=
      " + " +
      (
        +kFom[K][0][i + 1] *
        +(+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]])
          .toFixed(6)
          .slice(0, -3)
      ).toFixed(6);
  }
  txt.push(`\t\t${str}`);
  txt.push(
    `\t\t\t<span style="color: #ec4899; font-size :0.8rem;">(กำหนดให้ใช้ทศนิยม 3 ตำแหน่ง ทุกขั้นตอนโดยไม่มีการปัดเศษ)</span>`
  );
  str = "";
  str += "K = " + kFom[K][0][0];
  for (let i = 0; i < kFom[K][1].length; i++) {
    str +=
      " + " +
      (
        +kFom[K][0][i + 1] *
        +(+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]])
          .toFixed(6)
          .slice(0, -3)
      )
        .toFixed(6)
        .slice(0, -3);
  }
  txt.push(`\t\t${str}`);
  str = "";
  str += "K = ";
  sum = +kFom[K][0][0];
  for (let i = 0; i < kFom[K][1].length; i++) {
    sum += +(
      +kFom[K][0][i + 1] *
      +(+kValue.value[Tt][kFom[K][1][i]] / +kValue.value[To][kFom[K][1][i]])
        .toFixed(6)
        .slice(0, -3)
    )
      .toFixed(6)
      .slice(0, -3);
  }
  sum = sum.toFixed(3);
  str += sum;
  txt.push(`\t\t${str}`);

  var strs = "";
  txt.forEach((i) => {
    strs += i + "\r\n";
  });
  return [strs, sum];
}
var reports = computed(() => {
  // console.log('go to computed');
  var txt = [];
  var st = timeSummit.value;
  var ft = timeFinish.value;
  // console.log('st =' + st);
  // console.log('ft =' + ft);
  if (
    st === null ||
    ft === null ||
    timePay.value[0].time === null ||
    timePay.value[0].kValue[0].kIndex === null
  ) {
    return [false, ''];
  }
  // txt.push(
  //   `<div class="text-3xl text-center" style="color: red;">รายการคำนวน</div>`
  // );
  txt.push(
    `<span class="text-[0px] leading-[0px]"></span>`
  );
  txt.push(
    `<span class="text-lg text-violet-600 ">วันเสนอราคา          ${thaiDate(st)[3]
    }</span>`
  );
  txt.push(
    `<span class="text-lg text-violet-600">วันสิ้นสุดสัญญา        ${thaiDate(ft)[3]
    }</span>`
  );
  txt.push("");
  txt.push("<hr>");
  for (let i = 0; i < timePay.value.length; i++) {
    var pt = timePay.value[i].time;
    if (pt === null) {
      break;
    }
    txt.push(
      `<span class="text-lg text-violet-600">วันส่งมอบงาน งวดที่${i + 1}   ${thaiDate(pt)[3]
      }</span>`
    );
    if (pt <= ft) {
      var isInTime = true;
      txt.push(`\tวันส่งมอบงาน งวดที่${i + 1} ไม่เกิน วันสิ้นสุดสัญญา`);
      txt.push(`\tคำนวนค่า K เฉพาะเดือนวันส่งมอบงาน`);
    } else if (pt > ft) {
      var pts =
        new Date(pt).getFullYear().toString() + kMonth[new Date(pt).getMonth()];
      var fts =
        new Date(ft).getFullYear().toString() + kMonth[new Date(ft).getMonth()];
      if (pts === fts) {
        var isInTime = true;
        txt.push(`\tวันส่งมอบงาน งวดที่${i + 1} เกิน วันสิ้นสุดสัญญา`);
        txt.push(`\tแต่เดือนวันส่งมอบงาน อยู่ภายในเดือนวันสิ้นสุดสัญญา`);
        txt.push(`\tคำนวนค่า K เฉพาะเดือนวันส่งมอบงาน`);
      } else {
        var isInTime = false;
        txt.push(`\tวันส่งมอบงาน งวดที่${i + 1} เกิน วันสิ้นสุดสัญญา`);
        txt.push(
          `\tคำนวนค่า K ทั้งเดือนวันส่งมอบงาน และเดือนวันสิ้นสุดสัญญา ค่าไหนน้อยกว่าใช้ค่านั้น`
        );
      }
    }
    txt.push("");
    for (let j = 0; j < timePay.value[i].kValue.length; j++) {
      var K = timePay.value[i].kValue[j].kIndex;
      var m = timePay.value[i].kValue[j].money
        ? timePay.value[i].kValue[j].money
        : 0;
      var kc = "";
      if (K === null) {
        break;
      }
      txt.push(
        `\t<span class="text-lg text-violet-600">รายการที่${j + 1}  ${K.replace(
          /_/g,
          "."
        )}  ${kFom[K][2]}</span>`
      );
      txt.push(`\tสูตรคำนวน ${kFom[K][3]}`);
      if (isInTime) {
        var strArr = calK(st, pt, K, "pt");
        txt.push(strArr[0]);
        txt.push(
          `\t\tจึงใช้ ค่า K วันส่งมอบงาน  งวดที่${i + 1} = ${strArr[1]} คำนวน`
        );
        kc = strArr[1];
      } else {
        var strArr = calK(st, pt, K, "pt");
        txt.push(strArr[0]);
        var str2Arr = calK(st, ft, K, "ft");
        txt.push(str2Arr[0]);
        txt.push("");
        txt.push("\tเปรียบเทียบค่า K");
        txt.push(`\t\tK วันส่งมอบงาน งวดที่${i + 1} = ${strArr[1]}`);
        txt.push(`\t\tK วันสิ้นสุดสัญญา      = ${str2Arr[1]}`);
        if (+strArr[1] > +str2Arr[1]) {
          txt.push(
            `\t\tK วันสิ้นสุดสัญญา น้อยกว่า K วันส่งมอบงาน งวดที่${i + 1}`
          );
          txt.push(`\t\tจึงใช้ ค่า K วันสิ้นสุดสัญญา = ${str2Arr[1]} คำนวน`);
          kc = str2Arr[1];
        } else if (+strArr[1] < +str2Arr[1]) {
          txt.push(
            `\t\tK วันส่งมอบงาน  งวดที่${i + 1} น้อยกว่า K วันสิ้นสุดสัญญา`
          );
          txt.push(
            `\t\tจึงใช้ ค่า K วันส่งมอบงาน  งวดที่${i + 1} = ${strArr[1]} คำนวน`
          );
          kc = strArr[1];
        } else {
          txt.push(
            `\t\tK วันส่งมอบงาน  งวดที่${i + 1} เท่ากับ K วันสิ้นสุดสัญญา`
          );
          txt.push(
            `\t\tจึงใช้ ค่า K วันส่งมอบงาน  งวดที่${i + 1} = ${strArr[1]} คำนวน`
          );
          kc = strArr[1];
        }
      }
      timePay.value[i].kValue[j].kRe = kc;
      var kcInt = parseInt(+kc * 1000);
      // console.log(kcInt);

      var mReturn = "";
      var mReNum;
      if (kcInt > 1040) {
        txt.push(
          `\t\tค่า K เปลี่ยนแปลงเพิ่มขึ้นเกิน 4% ได้รับเงินชดเชย เท่ากับ ${kc} - 1.04 = ${(
            +kc - 1.04
          ).toFixed(3)}`
        );
        txt.push(
          `\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 10000).toLocaleString(
            "th-TH",
            { maximumFractionDigits: "4", minimumFractionDigits: "4" }
          )}`
        );
        mReNum = (+kc - 1.04) * m;
        mReturn = (((+kc - 1.04) * m) / 10000).toLocaleString("th-TH", {
          maximumFractionDigits: "4",
          minimumFractionDigits: "4",
        });
        txt.push(
          `\t\tในงวดนี้ ได้รับเงินชดเชย เท่ากับ ${(+kc - 1.04).toFixed(3)} x ${(
            m / 10000
          ).toLocaleString("th-TH", {
            maximumFractionDigits: "4",
            minimumFractionDigits: "4",
          })} = ${mReturn}`
        );
      } else if (kcInt <= 1040 && kcInt > 1000) {
        txt.push(`\t\tค่า K เปลี่ยนแปลงเพิ่มขึ้นไม่เกิน 4% ไม่ได้รับเงินชดเชย`);
        mReNum = 0;
        mReturn = (0).toLocaleString("th-TH", {
          maximumFractionDigits: "4",
          minimumFractionDigits: "4",
        });
      } else if (kcInt === 1000) {
        txt.push(`\t\tค่า K ไม่เปลี่ยนแปลง ไม่ได้รับเงินชดเชย`);
        mReNum = 0;
        mReturn = (0).toLocaleString("th-TH", {
          maximumFractionDigits: "4",
          minimumFractionDigits: "4",
        });
      } else if (kcInt < 1000 && kcInt >= 960) {
        txt.push(`\t\tค่า K เปลี่ยนแปลงลดลงไม่เกิน 4% ไม่ต้องคืนเงินชดเชย`);
        mReNum = 0;
        mReturn = (0).toLocaleString("th-TH", {
          maximumFractionDigits: "4",
          minimumFractionDigits: "4",
        });
      } else if (kcInt < 960) {
        txt.push(
          `\t\tค่า K เปลี่ยนแปลงลดลงเกิน 4% คืนเงินชดเชย เท่ากับ 0.960 - ${kc} = ${(
            0.960 - +kc
          ).toFixed(3)}`
        );
        txt.push(
          `\t\tจำนวนเงินส่งงวด รายการนี้เท่ากับ ${(m / 10000).toLocaleString(
            "th-TH",
            { maximumFractionDigits: "4", minimumFractionDigits: "4" }
          )}`
        );
        mReNum = (+kc - 0.96) * m;
        mReturn = (((+kc - 0.96) * m) / 10000).toLocaleString("th-TH", {
          maximumFractionDigits: "4",
          minimumFractionDigits: "4",
        });
        txt.push(
          `\t\tในงวดนี้ คืนเงินชดเชย เท่ากับ ${(0.96 - +kc).toFixed(3)} x ${(
            m / 10000
          ).toLocaleString("th-TH", {
            maximumFractionDigits: "4",
            minimumFractionDigits: "4",
          })} = ${mReturn}`
        );
      }
      txt.push("");
      timePay.value[i].kValue[j].mRe = mReturn;
    }
  }

  var strs = "";
  txt.forEach((i) => {
    strs += i + "\r\n";
  });
  // setTimeout(adjustPanel, 300);
  source.value = strs
    .replace(/<\/?span[^>]*>/g, "")
    .replace(/<\/?div[^>]*>/g, "")
    .replace(/<hr>/g, "");
  return [false, strs];
});
function addKItem(i) {
  timePay.value[i].kValue.push({
    id: Math.random().toString(),
    kIndex: null,
    money: null,
    kRe: "",
    mRe: "",
  });
}
function removeKItem(i, ki) {
  timePay.value[i].kValue.splice(ki, 1);
  console.log(timePay.value[i].kValue);
}
function addPay() {
  timePay.value.push({
    id: Math.random().toString(),
    time: null,
    kValue: [
      {
        id: Math.random().toString(),
        kIndex: null,
        money: null,
        kRe: "",
        mRe: "",
      },
    ],
  });
}
function removePay(i) {
  timePay.value.splice(i, 1);
}
function exportToExcel() {
  var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
  /* Export to file (start a download) */
  XLSX.writeFile(wb, "SummaryTable.xlsx");
}
function exportToDoc() {
  const link = document.createElement("a");
  const content = source.value;
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = "document.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function refresh() {
  timeSummit.value = null;
  timeFinish.value = null;
  timePay.value = [
    {
      id: Math.random().toString(),
      time: null,
      kValue: [
        {
          id: Math.random().toString(),
          kIndex: null,
          money: null,
          kRe: "",
          mRe: "",
        },
      ],
    },
  ];
  recal.value = false;
  await nextTick();
  recal.value = true;

}
var isCalTab = ref(true);

onMounted(() => {
  loadDoc();
});
</script>

<style lang="scss" scoped></style>