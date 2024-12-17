<script setup>
import { AmDialog, AmFormLabel, AmStatus } from 'amyun-ui-vue';

defineOptions({
  name: 'PageLaporanDialogDetail',
});

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
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
    expandable
    width="40vw"
    withEdit
    content-padding-reset
  >
    <template #dialog-title>
      <div class="pl-2">Lihat Faktor Emisi</div>
    </template>
    <template #dialog-content>
      <div class="pl-6 pr-[18px]">
        <div
          class="flex gap-x-1.5 items-start mt-3"
          v-for="(item, index) in data"
          :key="index"
        >
          <AmFormLabel size="medium" class="w-[180px]">{{
            item.key
          }}</AmFormLabel>
          <div
            class="w-[calc(100%-186px)] text-sm text-netral-black flex items-center gap-x-1.5"
            v-if="item.key !== 'Status'"
          >
            <div v-if="item.key !== 'Sumber Data'">{{ item.value }}</div>
            <div v-else :class="`${item.value ?? 'text-netral-textField'}`">
              {{ item.value ?? 'Tidak ada data' }}
            </div>
            <div class="text-blue-main">{{ item.satuan }}</div>
          </div>
          <AmStatus
            :color="item.value ? '#138A63' : '#FF5656'"
            class="font-semibold"
            v-else
            >{{ item.value ? 'Aktif' : 'Nonaktif' }}</AmStatus
          >
        </div>
      </div>
    </template>
  </AmDialog>
</template>

<style scoped></style>
