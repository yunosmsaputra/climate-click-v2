<script setup>
import BoxDetailDecoration from '@/components/BoxDetailDecoration.vue';
import UnitListInline from '@/components/UnitListInline.vue';
import { AmChip } from 'amyun-ui-vue';

defineOptions({
  name: 'DetailUnitLaporan',
});
</script>

<template>
  <BoxDetailDecoration>
    <div class="flex gap-x-2 items-center">
      <div class="flex gap-1.5 text-sm">
        <div class="text-netral-label">Periode Laporan</div>
        <div class="text-netral-black font-medium">Nov 2024</div>
      </div>
      <div class="text-sm text-netral-stroke">/</div>
      <div class="flex gap-1.5 text-sm">
        <div class="text-netral-label">Created Date</div>
        <div class="text-netral-black font-medium">23 Sep 2024 13:24:01</div>
      </div>
      <div class="text-sm text-netral-stroke">/</div>
      <div class="flex gap-1.5 text-sm">
        <div class="text-netral-label">Last Update</div>
        <div class="text-netral-black font-medium">23 Sep 2024 13:24:01</div>
      </div>
      <div class="text-sm text-netral-stroke">/</div>
      <div class="flex gap-1.5 items-center text-sm">
        <div class="text-netral-label">Status</div>
        <div class="text-netral-black font-medium">
          <AmChip colorScheme="blue">Draft</AmChip>
        </div>
      </div>
    </div>
    <div class="text-xl text-netral-black font-medium mt-4">
      PLTU Pangkalan Susu
    </div>
    <UnitListInline
      :list="[
        'PLN Indonesia Power',
        'PLN - IP Sumatera',
        'PLN - IP Sumatera Selatan',
        'PLN - IP Palembang',
        'AMC PLTU Pangkalan Susu',
      ]"
      class="mt-2"
    />
  </BoxDetailDecoration>
</template>

<style scoped></style>
