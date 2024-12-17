<script setup>
import { AmTable } from 'amyun-ui-vue';
import TitleSection from '@/components/TitleSection.vue';
import { ref } from 'vue';

defineOptions({
  name: 'PreviewTableBahanBakarGenset',
});

const showExpand = ref(false);

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
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
    <TitleSection
      with-button-expand
      @on-click-expand="showExpand = !showExpand"
      :is-expand="showExpand"
      >Data Bahan Bakar Genset</TitleSection
    >
    <AmTable
      :columns="columns"
      :data="data"
      class="mt-4"
      v-if="showExpand"
    ></AmTable>
  </div>
</template>

<style scoped></style>
