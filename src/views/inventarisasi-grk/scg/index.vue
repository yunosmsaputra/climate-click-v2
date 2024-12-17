<script setup>
import {
  AmButton,
  AmIcon,
  AmTab,
  AmTabContent,
  AmTabTitle,
} from 'amyun-ui-vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { blueColorLib, neutralColorLib } from '@/utils/constant.js';
import { useScgActions } from '@/views/inventarisasi-grk/scg/hooks/scg.actions.js';
import ContentSection from '@/components/ContentSection.vue';
import SCGAllReportSection from '@/views/inventarisasi-grk/scg/partials/all.report.vue';
import { useSCGTableAllReportActions } from '@/views/inventarisasi-grk/scg/hooks/table.all.js';
import { onMounted } from 'vue';
import SCGDialogForm from '@/views/inventarisasi-grk/scg/partials/dialog.form.vue';
import { useScgDialogFormActions } from '@/views/inventarisasi-grk/scg/hooks/dialog.form.js';

defineOptions({
  name: 'InventarisasiGrkScgPage',
});

const { activeTab } = useScgActions();
const {
  columns: allReportColumn,
  data: allReportData,
  summaryEmptyData: allReportSummaryEmptyData,
  getData: allReportGetData,
} = useSCGTableAllReportActions();
const {
  showDialog,
  openDialogForm,
  closeDialogForm,
  titleDialog,
  activeLaporan,
  paramsForm,
  addBahanBakar,
  subtractBahanBakar,
  onSaveDraft,
  isPreview,
  onPreview,
  dataPreviewBahanBakar,
  columnPreviewBahanBakar,
} = useScgDialogFormActions();

onMounted(() => {
  allReportGetData();
});
</script>

<template>
  <HeaderPage title="Stationary Combustion Genset">
    <template #action>
      <AmButton type="ghost">
        <template #prepend>
          <AmIcon name="upload" :color="blueColorLib.main" :size="14" />
        </template>
        Import Laporan
      </AmButton>
      <AmButton @click="openDialogForm">
        <template #prepend>
          <AmIcon name="plus" :color="neutralColorLib.white" :size="14" />
        </template>
        Tambah Laporan
      </AmButton>
    </template>
  </HeaderPage>
  <ContentSection is-tab>
    <AmTab v-model:activeTab="activeTab">
      <template #tab-title="{ activeTab }">
        <div class="flex gap-[6px] pl-4 pr-[18px]">
          <AmTabTitle :isActive="activeTab === 'Semua Laporan'"
            >Semua Laporan</AmTabTitle
          >
          <AmTabTitle :isActive="activeTab === 'Draft Laporan'"
            >Draft Laporan</AmTabTitle
          >
          <AmTabTitle :isActive="activeTab === 'Persetujuan Laporan'"
            >Persetujuan Laporan</AmTabTitle
          >
          <AmTabTitle :isActive="activeTab === 'Final Laporan'"
            >Final Laporan</AmTabTitle
          >
        </div>
      </template>
      <template #tab-content="{ activeTab }">
        <AmTabContent :isActive="activeTab === 'Semua Laporan'">
          <SCGAllReportSection
            :columns="allReportColumn"
            :data="allReportData"
            :summary-empty-data="allReportSummaryEmptyData"
          />
        </AmTabContent>
      </template>
    </AmTab>
  </ContentSection>
  <SCGDialogForm
    :is-show="showDialog"
    @on-close="closeDialogForm"
    :title="titleDialog"
    :active-laporan="activeLaporan"
    @on-select-laporan="
      (value) => {
        activeLaporan = value;
      }
    "
    :params="paramsForm"
    @add-bahan-bakar="addBahanBakar"
    @subtract-bahan-bakar="subtractBahanBakar"
    @on-save-draft="onSaveDraft"
    @on-preview="onPreview"
    :is-preview="isPreview"
    :columns-preview-bahan-bakar="columnPreviewBahanBakar"
    :data-preview-bahan-bakar="dataPreviewBahanBakar"
  />
</template>

<style scoped></style>
