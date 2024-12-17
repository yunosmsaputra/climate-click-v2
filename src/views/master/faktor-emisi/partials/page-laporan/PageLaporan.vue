<script setup>
import { AmButton, AmIcon, AmDialog } from 'amyun-ui-vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { onMounted } from 'vue';
import { useFaktorEmisiPageLaporanActions } from '@/views/master/faktor-emisi/hooks/page-laporan.js';
import { neutralColorLib } from '@/utils/constant.js';
import ContentSection from '@/components/ContentSection.vue';
import TableWithSearchComponent from '@/components/TableWithSearchAndPagination.vue';
import { useRouter } from 'vue-router';
import PageLaporanDialogForm from '@/views/master/faktor-emisi/partials/page-laporan/Dialog.form.vue';
import PageLaporanDialogDetail from '@/views/master/faktor-emisi/partials/page-laporan/Dialog.detail.vue';
import DialogConfirmation from '@/components/DialogConfirmation.vue';
import DialogAlert from '@/components/DialogAlert.vue';

defineOptions({
  name: 'PageLaporanFaktorEmisi',
});

const router = useRouter();

const {
  getFormFields,
  titlePage,
  data,
  columns,
  getData,
  summaryPagination,
  summaryEmptyData,
  showDialogForm,
  openDialogForm,
  closeDialogForm,
  titleDialogForm,
  fieldForm,
  paramsForm,
  onSave,
  onDetail,
  showDialogDetail,
  dataDetail,
  showDialogConfirmation,
  openDialogConfirmation,
  closeDialogConfirmation,
  summaryConfirmation,
  handleSubmitConfirmation,
  showDialogAlert,
  summaryAlert,
  closeDialogAlert,
} = useFaktorEmisiPageLaporanActions();

onMounted(() => {
  getFormFields();
  getData(summaryPagination.value.page, summaryPagination.value.dataSize);
});
</script>

<template>
  <HeaderPage
    :title="titlePage"
    with-back-button
    @on-back="
      () => {
        router.go(-1);
      }
    "
  >
    <template #action>
      <AmButton
        @click="
          () => {
            openDialogForm();
          }
        "
      >
        <template #prepend>
          <AmIcon
            name="plus"
            :size="14"
            :color="neutralColorLib.white"
          ></AmIcon>
        </template>
        Tambah Faktor Emisi
      </AmButton>
    </template>
  </HeaderPage>
  <ContentSection>
    <div class="px-4 py-3 rounded-lg bg-netral-white">
      <TableWithSearchComponent
        :summary-empty-data="summaryEmptyData"
        :columns="columns"
        :data="data"
        @on-click-row="onDetail"
      />
    </div>
  </ContentSection>
  <PageLaporanDialogForm
    :is-show="showDialogForm"
    @on-close="closeDialogForm"
    :title="titleDialogForm"
    :field="fieldForm"
    :params="paramsForm"
    @onSave="
      () => {
        openDialogConfirmation('add');
      }
    "
  />
  <PageLaporanDialogDetail
    :is-show="showDialogDetail"
    @on-close="
      () => {
        showDialogDetail = false;
      }
    "
    :data="dataDetail"
  />
  <DialogConfirmation
    :is-show="showDialogConfirmation"
    @on-close="closeDialogConfirmation"
    :summary-confirmation="summaryConfirmation"
    @on-submit="handleSubmitConfirmation"
  />
  <DialogAlert
    :is-show="showDialogAlert"
    @on-close="closeDialogAlert"
    :summary-alert="summaryAlert"
  />
</template>

<style scoped></style>
