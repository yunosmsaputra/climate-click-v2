<script setup>
import { AmTable } from 'amyun-ui-vue';
import AlertHelp from '@/assets/icons/alert-help.vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(['onClickRow']);

const handleClickRow = (data) => {
  emits('onClickRow', data);
};
</script>

<template>
  <div class="bg-white rounded-lg px-4 py-3">
    <AmTable
      :columns="props.columns"
      :data="data"
      searchable
      pagination
      @onClickRow="handleClickRow"
    >
      <template v-slot:customEmptyData>
        <div class="h-[560px] flex justify-center flex-wrap content-center">
          <AlertHelp></AlertHelp>
          <div class="w-full text-base font-semibold text-netral-black mt-2">
            Data Unit Belum Tersedia
          </div>
          <div class="w-full text-sm font-normal text-netral-black mt-2">
            Silahkan menambahkan data unit terlebih dahulu
          </div>
        </div>
      </template>
    </AmTable>
  </div>
</template>

<style scoped></style>
