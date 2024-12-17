<script setup>
import TableWithPagination from '@/components/TableWithPagination.vue';

defineOptions({
  name: 'SCGAllReportSection',
});

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  summaryEmptyData: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="bg-netral-background px-3 pt-3 pb-8">
    <div class="bg-netral-white px-4 py-3 rounded-lg">
      <TableWithPagination
        :columns="columns"
        :data="data"
        :summary-empty-data="summaryEmptyData"
      ></TableWithPagination>
    </div>
  </div>
</template>

<style scoped></style>
