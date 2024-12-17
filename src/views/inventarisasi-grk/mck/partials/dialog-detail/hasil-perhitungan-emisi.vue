<script setup>
import TitleSection from '@/components/TitleSection.vue'
import { ref } from 'vue'
import { AmCounterCard, AmText } from 'amyun-ui-vue'
import { blueColorLib } from '@/utils/constant.js'
import { konversiRibuan } from '@/utils/konversi.js'

defineOptions({
  name: 'FugitiveAcRuanganHasilPerhitunganEmisi',
})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const isExpand = ref(true)
</script>

<template>
  <div class="bg-netral-white pt-[18px] pr-[18px] pb-6 pl-6">
    <title-section with-button-expand :is-expand="isExpand" @on-click-expand="isExpand = !isExpand"
      >Hasil Perhitungan Emisi</title-section
    >
    <div v-if="isExpand">
      <div class="flex gap-x-3 mt-4">
        <AmCounterCard class="w-[calc((100%/4)-9px)]" bordered>
          <template #icon>
            <div class="text-[10px] text-netral-label font-semibold">CO₂</div>
          </template>
          <template #title> Emisi CO₂ </template>
          <template #data>
            <AmText :fontSize="18" :is-loading="isLoading">{{
              data.total_emisi_co2 ? konversiRibuan(data.total_emisi_co2 / 1000) : 0
            }}</AmText>
          </template>
          <template #summary>tCO₂</template>
        </AmCounterCard>
        <AmCounterCard class="w-[calc((100%/4)-9px)]" bordered :color="blueColorLib.main">
          <template #icon>
            <div class="text-[10px] text-blue-main font-semibold">N₂O</div>
          </template>
          <template #title> Emisi N₂O </template>
          <template #data>
            <AmText :font-size="18" :is-loading="isLoading">{{
              data.total_emisi_n2o ? konversiRibuan(data.total_emisi_n2o / 1000) : 0
            }}</AmText>
          </template>
          <template #summary>tN₂O</template>
        </AmCounterCard>
        <AmCounterCard class="w-[calc((100%/4)-9px)]" bordered :color="blueColorLib.main">
          <template #icon>
            <div class="text-[10px] text-blue-main font-semibold">CH₄</div>
          </template>
          <template #title> Emisi CH₄ </template>
          <template #data>
            <AmText :font-size="18" :is-loading="isLoading">{{
              data.total_emisi_ch4 ? konversiRibuan(data.total_emisi_ch4 / 1000) : 0
            }}</AmText>
          </template>
          <template #summary>tCH₄</template>
        </AmCounterCard>
        <AmCounterCard class="w-[calc((100%/4)-9px)]" bordered :color="blueColorLib.main">
          <template #icon>
            <div class="text-[10px] text-blue-main font-semibold">N₂O</div>
          </template>
          <template #title> Emisi CO₂e </template>
          <template #data>
            <AmText :font-size="18" :is-loading="isLoading">{{
              data.total_emisi ? konversiRibuan(data.total_emisi / 1000) : 0
            }}</AmText>
          </template>
          <template #summary>tCO₂e</template>
        </AmCounterCard>
      </div>
      <div
        class="px-4 py-2 bg-netral-background rounded-t-lg font-semibold text-sm text-netral-label mt-4"
      >
        Rumusan Emisi
      </div>
      <div class="border border-solid border-netral-background p-3 rounded-b-lg">
        <div class="flex items-center gap-x-1.5 text-sm">
          <div
            class="w-[44px] h-6 rounded-[4px] text-yellow-main font-semibold bg-netral-background flex items-center justify-center"
          >
            CO<sub>2</sub>
          </div>
          <div>
            Konsumsi Bahan Bakar x FE CO<sub>2</sub> x NCV CO<sub>2</sub> x Densitas CO<sub>2</sub>
            x 10<sup>-9</sup>
          </div>
        </div>
        <div class="flex items-center gap-x-1.5 text-sm mt-2">
          <div
            class="w-[44px] h-6 rounded-[4px] text-red-main font-semibold bg-netral-background flex items-center justify-center"
          >
            N<sub>2</sub>O
          </div>
          <div>
            Konsumsi Bahan Bakar x FE N<sub>2</sub>O x NCV N<sub>2</sub>O x Densitas N<sub>2</sub>O
            x 10<sup>-9</sup>
          </div>
        </div>
        <div class="flex items-center gap-x-1.5 text-sm mt-2">
          <div
            class="w-[44px] h-6 rounded-[4px] text-green-main font-semibold bg-netral-background flex items-center justify-center"
          >
            CH<sub>4</sub>
          </div>
          <div>
            Konsumsi Bahan Bakar x FE CH<sub>4</sub> x NCV CH<sub>4</sub> x Densitas CH<sub>4</sub>
            x 10<sup>-9</sup>
          </div>
        </div>
        <div class="flex items-center gap-x-1.5 text-sm mt-2">
          <div
            class="w-[44px] h-6 rounded-[4px] text-blue-main font-semibold bg-netral-background flex items-center justify-center"
          >
            CO<sub>2</sub>e
          </div>
          <div>
            (Emisi CO<sub>2</sub> x GWP CO<sub>2</sub>) + (Emisi N<sub>2</sub>O x GWP
            N<sub>2</sub>O) + (Emisi CH<sub>4</sub>
            x GWP CH<sub>4</sub>)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
