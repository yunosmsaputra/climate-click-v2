<script setup>
import TitleSection from '@/components/TitleSection.vue';
import { ref } from 'vue';
import { AmCounterCard } from 'amyun-ui-vue';
import { blueColorLib, neutralColorLib } from '@/utils/constant.js';

const showExpand = ref(false);
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
    <TitleSection
      with-button-expand
      @on-click-expand="showExpand = !showExpand"
      :is-expand="showExpand"
      >Hasil Perhitungan Emisi</TitleSection
    >
    <div class="flex gap-x-3 mt-4 flex-wrap">
      <AmCounterCard
        class="w-[calc((100%/4)-9px)]"
        :color="neutralColorLib.label"
        bordered
      >
        <template #icon>
          <div class="text-xs leading-4 font-medium text-netral-label">CO₂</div>
        </template>
        <template #title>Emisi CO₂</template>
        <template #data>1,41</template>
        <template #summary>tCO₂</template>
      </AmCounterCard>
      <AmCounterCard
        class="w-[calc((100%/4)-9px)]"
        :color="neutralColorLib.label"
        bordered
      >
        <template #icon>
          <div class="text-xs leading-4 font-medium text-netral-label">N₂O</div>
        </template>
        <template #title>Emisi N₂O</template>
        <template #data>1,41</template>
        <template #summary>tN₂O</template>
      </AmCounterCard>
      <AmCounterCard
        class="w-[calc((100%/4)-9px)]"
        :color="neutralColorLib.label"
        bordered
      >
        <template #icon>
          <div class="text-xs leading-4 font-medium text-netral-label">CH₄</div>
        </template>
        <template #title>Emisi CH₄</template>
        <template #data>1,41</template>
        <template #summary>tCH₄</template>
      </AmCounterCard>
      <AmCounterCard
        class="w-[calc((100%/4)-9px)]"
        :color="blueColorLib.main"
        bordered
      >
        <template #icon>
          <div class="text-xs leading-4 font-medium text-blue-main">CO₂e</div>
        </template>
        <template #title>Emisi CO₂e</template>
        <template #data>1,41</template>
        <template #summary>tCO₂e</template>
      </AmCounterCard>
    </div>
    <div v-if="showExpand">
      <div
        class="bg-netral-background px-4 py-2 rounded-tl-lg rounded-tr-lg text-sm text-netral-label font-semibold mt-4"
      >
        Rumusan Emisi
      </div>
      <div
        class="p-3 border border-solid border-netral-background rounded-bl-lg rounded-br-lg"
      >
        <div class="flex items-center gap-x-1.5 text-sm">
          <div
            class="w-[44px] h-6 rounded-[4px] text-yellow-main font-semibold bg-netral-background flex items-center justify-center"
          >
            CO₂
          </div>
          <div>
            Konsumsi Bahan Bakar x FE CO2 x NCV CO2 x Densitas CO2 x 10-9
          </div>
        </div>
        <div class="flex items-center gap-x-1.5 text-sm mt-2">
          <div
            class="w-[44px] h-6 rounded-[4px] text-red-main font-semibold bg-netral-background flex items-center justify-center"
          >
            N₂O
          </div>
          <div>
            Konsumsi Bahan Bakar x FE N2O x NCV N2O x Densitas N2O x 10-9
          </div>
        </div>
        <div class="flex items-center gap-x-1.5 text-sm mt-2">
          <div
            class="w-[44px] h-6 rounded-[4px] text-green-main font-semibold bg-netral-background flex items-center justify-center"
          >
            CH₄
          </div>
          <div>
            Konsumsi Bahan Bakar x FE CH₄ x NCV CH₄ x Densitas CH₄ x 10-9
          </div>
        </div>
        <div class="flex items-center gap-x-1.5 text-sm mt-2">
          <div
            class="w-[44px] h-6 rounded-[4px] text-blue-main font-semibold bg-netral-background flex items-center justify-center"
          >
            CO₂e
          </div>
          <div>
            (Emisi CO2 x GWP CO2) + (Emisi N2O x GWP N2O) + (Emisi CH₄ x GWP
            CH₄)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
