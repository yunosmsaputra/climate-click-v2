<script setup>
import TitleSection from '@/components/TitleSection.vue';
import { ref } from 'vue';
import HistoryData from '@/components/HistoryData.vue';
import moment from 'moment';

defineOptions({
  name: 'RiwayatLaporan',
});
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const isExpand = ref(true);
</script>

<template>
  <div class="bg-netral-white pt-[18px] pr-[18px] pb-6 pl-6">
    <title-section
      with-button-expand
      :is-expand="isExpand"
      @on-click-expand="isExpand = !isExpand"
      :class="`${isExpand ? 'mb-4' : ''}`"
      >Riwayat Laporan</title-section
    >
    <div v-if="isExpand">
      <HistoryData
        v-for="(item, index) in data.history_list"
        :key="index"
        :divider="index < data.history_list.length - 1"
      >
        <template #date>{{
          moment(item.updated_date).format('DD MMM YYYY')
        }}</template>
        <template #time>{{
          moment(item.updated_date).format('HH:mm')
        }}</template>
        <template #content>
          <div class="text-sm text-netral-label font-semibold">
            {{ item.judul }}
          </div>
          <div class="text-sm flex gap-x-2 mt-1">
            <div class="text-netral-label2">Dilakukan oleh:</div>
            <div class="text-netral-black">{{ item.nama_user }}</div>
            <div class="text-netral-textField">({{ item.username }})</div>
          </div>
          <div class="text-netral-textField text-s mt-1">
            ({{ item.keterangan }})
          </div>
        </template>
      </HistoryData>
    </div>
  </div>
</template>

<style scoped></style>
