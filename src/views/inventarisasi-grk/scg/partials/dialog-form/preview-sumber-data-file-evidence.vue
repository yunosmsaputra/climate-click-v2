<script setup>
import TitleSection from '@/components/TitleSection.vue';
import { ref } from 'vue';
import { AmFormLabel } from 'amyun-ui-vue';

const showExpand = ref(false);
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
    <TitleSection
      with-button-expand
      @on-click-expand="showExpand = !showExpand"
      :is-expand="showExpand"
      >Sumber Data & File Evidence</TitleSection
    >
    <div v-if="showExpand">
      <div class="flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-4">
        <AmFormLabel size="medium" class="w-[240px]">Sumber Data</AmFormLabel>
        <div class="text-sm text-netral-black w-[calc(100%-246px)]">
          Data Konsumsi BBM dari bagian CAH/Energi Primer
        </div>
        <AmFormLabel size="medium" class="w-[240px]">File Evidence</AmFormLabel>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
