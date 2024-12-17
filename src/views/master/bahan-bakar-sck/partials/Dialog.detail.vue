<script setup>
import { AmDialog, AmFormLabel, AmStatus } from 'amyun-ui-vue';
import { greenColorLib, redColorLib } from '@/utils/constant.js';
defineOptions({
  name: 'MasterBahanBakarSckDialogDetail',
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['onClose', 'onEdit']);
</script>
<template>
  <AmDialog
    :is-show="isShow"
    @on-close="
      () => {
        emits('onClose');
      }
    "
    with-edit
    expandable
    width="40vw"
    @on-edit="
      () => {
        emits('onEdit', data);
      }
    "
  >
    <template #dialog-title>Lihat Bahan Bakar SCK</template>
    <template #dialog-content>
      <div class="flex flex-wrap items-center gap-x-1.5 gap-y-3">
        <div class="w-[180px]">
          <AmFormLabel size="medium">Nama Bahan Bakar</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)] text-sm text-netral-black">
          {{ data.nama }}
        </div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Parent Bahan Bakar</AmFormLabel>
        </div>
        <div
          :class="`w-[calc(100%-186px)] text-sm ${data.nama_parent ? 'text-netral-black' : 'text-netral-textField'}`"
        >
          {{ data.nama_parent ?? 'Tidak ada data' }}
        </div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Level Bahan Bakar</AmFormLabel>
        </div>
        <div :class="`w-[calc(100%-186px)] text-sm text-netral-black`">
          <span class="font-semibold">{{ data.level }}</span> ({{
            data.level === 0
              ? 'Klasifikasi Bahan Bakar'
              : data.level === 1
                ? 'Jenis Bahan Bakar'
                : 'Detail Bahan Bakar'
          }})
        </div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Keterangan</AmFormLabel>
        </div>
        <div
          :class="`w-[calc(100%-186px)] text-sm ${data.keterangan ? 'text-netral-black' : 'text-netral-textField'}`"
        >
          {{ data.keterangan ?? 'Tidak ada data' }}
        </div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Status</AmFormLabel>
        </div>
        <div :class="`w-[calc(100%-186px)]`">
          <AmStatus
            :color="data.is_active ? greenColorLib.main : redColorLib.main"
            class="font-semibold"
            >{{ data.is_active ? 'Aktif' : 'Nonaktif' }}</AmStatus
          >
        </div>
      </div>
    </template>
  </AmDialog>
</template>

<style scoped></style>
