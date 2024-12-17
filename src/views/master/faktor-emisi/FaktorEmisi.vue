<script setup>
import HeaderPage from '@/components/HeaderPage.vue';
import ContentSection from '@/components/ContentSection.vue';
import { useFaktorEmisiTableActions } from '@/views/master/faktor-emisi/hooks/faktor-emisi.js';
import TableWithSearchComponent from '@/components/TableWithSearchAndPagination.vue';
import { onMounted, watch } from 'vue';

defineOptions({
  name: 'MasterFaktorEmisi',
});

const {
  columns,
  data,
  summaryEmptyData,
  getData,
  summaryPagination,
  onChangePage,
  onChangeDataSize,
  summarySearch,
  onSelectedIndexSearch,
  onSearch,
  search,
  gotoPageLaporan,
} = useFaktorEmisiTableActions();

onMounted(() => {
  getData();
});

watch(search, () => {
  getData();
});
</script>

<template>
  <HeaderPage title="Faktor Emisi"></HeaderPage>
  <ContentSection>
    <div class="px-4 py-3 rounded-lg bg-white mt-3">
      <TableWithSearchComponent
        :columns="columns"
        :data="data"
        :summary-empty-data="summaryEmptyData"
        :summary-pagination="summaryPagination"
        @on-change-page="onChangePage"
        @on-change-data-size="onChangeDataSize"
        :summary-search="summarySearch"
        @on-select-index-search="onSelectedIndexSearch"
        @on-search="onSearch"
        @on-click-row="gotoPageLaporan"
      ></TableWithSearchComponent>
    </div>
  </ContentSection>
</template>

<style scoped></style>
