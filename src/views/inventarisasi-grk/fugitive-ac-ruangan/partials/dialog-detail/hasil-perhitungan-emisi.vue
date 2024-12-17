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
        <AmCounterCard class="w-[calc(50%-6px)]" bordered>
          <template #icon>
            <div class="text-[10px] text-netral-label font-semibold">kCO₂e</div>
          </template>
          <template #title> Emisi CO₂e </template>
          <template #data>
            <AmText :fontSize="18" :is-loading="isLoading">{{
              data.total_emisi ? konversiRibuan(data.total_emisi) : 0
            }}</AmText>
          </template>
          <template #summary>kCO₂e</template>
        </AmCounterCard>
        <AmCounterCard class="w-[calc(50%-6px)]" bordered :color="blueColorLib.main">
          <template #icon>
            <div class="text-[10px] text-blue-main font-semibold">tCO₂e</div>
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
        <div class="flex gap-x-1.5 items-center">
          <div
            class="bg-netral-background px-1.5 py-1 rounded text-[10px] text-yellow-main font-semibold"
          >
            kCO₂e
          </div>
          <div class="text-sm text-netral-black">
            Total Penggunaan Refrigerant x GWP Jenis Refrigerant x Operating Emissions X (% of
            capacity) dari Jenis AC
          </div>
        </div>
        <div class="flex gap-x-1.5 items-center mt-2">
          <div
            class="bg-netral-background px-1.5 py-1 rounded text-[10px] text-blue-main font-semibold"
          >
            tCO₂e
          </div>
          <div class="text-sm text-netral-black">Emisi kCO₂e / 1000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
