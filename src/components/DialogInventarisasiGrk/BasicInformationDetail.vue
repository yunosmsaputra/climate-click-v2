<script setup>
import BoxDetailDecoration from '@/components/BoxDetailDecoration.vue'
import { monthShort } from '@/utils/constant.js'
import { AmChip, AmText } from 'amyun-ui-vue'
import UnitListInline from '@/components/UnitListInline.vue'
import { statusLaporan } from '@/utils/enums.js'

defineOptions({
  name: 'DialogDetailBasicInformation',
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
</script>

<template>
  <BoxDetailDecoration>
    <div class="flex gap-x-2 items-center text-sm">
      <div class="flex gap-x-1.5 items-center">
        <div class="text-netral-label">Periode Laporan</div>
        <AmText
          :fontSize="14"
          :is-loading="isLoading"
          :class="`${isLoading ? 'w-16 ' : ''}text-netral-black font-semibold`"
        >
          {{ monthShort[data.bulan - 1] }} {{ data.tahun }}
        </AmText>
      </div>
      <div class="text-netral-stroke">/</div>
      <div class="flex gap-x-1.5 items-center">
        <div class="text-netral-label">Created Date</div>
        <AmText
          :fontSize="14"
          :is-loading="isLoading"
          :class="`${isLoading ? 'w-[135px] ' : ''}text-netral-black font-semibold`"
        >
          {{ $moment(data.created_date).format('DD MMM YYYY HH:mm:ss') }}
        </AmText>
      </div>
      <div class="text-netral-stroke">/</div>
      <div class="flex gap-x-1.5 items-center">
        <div class="text-netral-label">Last Update</div>
        <AmText
          :fontSize="14"
          :is-loading="isLoading"
          :class="`${isLoading ? 'w-[135px] ' : ''}text-netral-black font-semibold`"
        >
          {{ $moment(data.updated_date).format('DD MMM YYYY HH:mm:ss') }}
        </AmText>
      </div>
      <div class="text-netral-stroke">/</div>
      <div class="flex gap-x-1.5 items-center">
        <div class="text-netral-label">Status</div>
        <AmChip
          :color-scheme="statusLaporan(data.status, 'chipColor')"
          fontsize="sm"
          class="capitalize"
          :is-loading="isLoading"
          >{{ statusLaporan(data.status) }}</AmChip
        >
      </div>
    </div>
    <AmText class="text-xl text-netral-black font-semibold mt-4" :is-loading="isLoading">
      {{ data.nama_unit }}
    </AmText>
    <UnitListInline class="mt-2" :list="data.list_unit" :is-loading="isLoading"></UnitListInline>
  </BoxDetailDecoration>
</template>

<style scoped></style>
