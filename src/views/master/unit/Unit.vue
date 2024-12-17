<script setup>
import { AmButton, AmIcon, AmForm } from 'amyun-ui-vue';
import ContentSection from '@/components/ContentSection.vue';
import { onMounted, watch } from 'vue';
import { blueColorLib, neutralColorLib } from '@/utils/constant.js';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import TableWithPagination from '@/components/TableWithPagination.vue';
import { useMasterUnitActions } from '@/views/master/unit/Unit.actions.js';
import HeaderPage from '@/components/HeaderPage.vue';
import DialogConfirmation from '@/components/DialogConfirmation.vue';
import DialogAlert from '@/components/DialogAlert.vue';
import DialogFormMasterUnit from '@/views/master/unit/partials/dialog.form.vue';
import { useComboboxActions } from '@/utils/combobox.js';
import DialogDetailMasterUnit from '@/views/master/unit/partials/dialog.detail.vue';

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
  showDialogForm,
  openDialogForm,
  closeDialogForm,
  titleDialogForm,
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
  getListBahanBakar,
  listBahanBakar,
  textSubmitDialogForm,
  refForm,
} = useMasterUnitActions();
const {
  comboboxProvinsiList,
  comboboxKotaList,
  comboboxKecamatanList,
  comboboxKelurahanList,
  comboboxUnitList,
  comboboxGridList,
  comboboxRegionalList,
  comboboxJenisPembangkitList,
  comboboxTipeBoilerList,
  getComboboxProvinsilist,
  getComboboxKotaList,
  getComboboxKecamatanList,
  getComboboxKelurahanList,
  getComboboxListUnit,
  getComboboxGridList,
  getComboboxRegionalList,
  getComboboxJenisPembangkitList,
  getComboboxTipeBoilerList,
} = useComboboxActions();

defineOptions({
  name: 'MasterUnitPage',
});

onMounted(() => {
  getData();
  getComboboxProvinsilist();
  getComboboxListUnit();
});

watch(
  () => paramsForm.provinsi,
  (newValue) => {
    if (newValue) {
      getComboboxKotaList(newValue.id);
    }
  },
);

watch(
  () => paramsForm.kota,
  (newValue) => {
    if (newValue) {
      getComboboxKecamatanList(newValue.id);
    }
  },
);

watch(
  () => paramsForm.kecamatan,
  (newValue) => {
    if (newValue) {
      getComboboxKelurahanList(newValue.id);
    }
  },
);
watch(
  () => paramsForm.value.parent,
  (newValue) => {
    if (newValue) {
      paramsForm.value.level = newValue.level + 1;
      getComboboxGridList();
      getComboboxRegionalList();
    }
  },
);
watch(
  () => paramsForm.value.isIppu,
  (newValue) => {
    paramsForm.value.listIppu = [];
  },
);
watch(
  () => paramsForm.value.isUnitMachine,
  (newValue) => {
    paramsForm.value.listPppu = [];
    getComboboxJenisPembangkitList();
    getComboboxTipeBoilerList();
    getComboboxGridList();
  },
);
</script>

<template>
  <HeaderPage title="Unit">
    <template #action>
      <AmButton
        @click="
          () => {
            openDialogForm();
          }
        "
      >
        <template #prepend>
          <AmIcon name="plus" color="#FFF" :size="14"></AmIcon>
        </template>
        Tambah Unit
      </AmButton>
    </template>
  </HeaderPage>
  <ContentSection>
    <div class="px-4 py-3 rounded-lg bg-white mt-3">
      <SearchBarComponent
        :summary-search="summarySearch"
        @on-search="onSearch"
        @on-selected-index-search="onSelectedIndexSearch"
      >
        <template #additional>
          <AmButton
            type="ghost"
            :color="neutralColorLib.divider"
            class="text-netral-textDisabled"
          >
            <template #prepend>
              <AmIcon
                name="filter"
                :color="blueColorLib.main"
                :size="14"
              ></AmIcon>
            </template>
            Filter
          </AmButton>
          <AmButton
            type="ghost"
            :color="neutralColorLib.divider"
            class="text-netral-textDisabled"
          >
            <template #prepend>
              <AmIcon
                name="document"
                :color="blueColorLib.main"
                :size="14"
              ></AmIcon>
            </template>
            Export
          </AmButton>
        </template>
      </SearchBarComponent>
      <TableWithPagination
        :columns="columns"
        :data="data"
        :summary-empty-data="summaryEmptyData"
        :summary-pagination="summaryPagination"
        @on-change-page="onChangePage"
        @on-change-data-size="onChangeDataSize"
        @on-click-row="onDetail"
        class="mt-3"
      ></TableWithPagination>
    </div>
  </ContentSection>
  <DialogFormMasterUnit
    :is-show="showDialogForm"
    @on-close="closeDialogForm"
    v-model:params="paramsForm"
    @on-save="
      () => {
        openDialogConfirmation(
          textSubmitDialogForm === 'Simpan Data' ? 'edit' : 'add',
        );
      }
    "
    :title="titleDialogForm"
    :text-submit-form="textSubmitDialogForm"
    :combobox-provinsi-list="comboboxProvinsiList"
    :combobox-kota-list="comboboxKotaList"
    :combobox-kecamatan-list="comboboxKecamatanList"
    :combobox-kelurahan-list="comboboxKelurahanList"
    :combobox-unit-list="comboboxUnitList"
    :combobox-grid-list="comboboxGridList"
    :combobox-regional-list="comboboxRegionalList"
    :combobox-jenis-pembangkit-list="comboboxJenisPembangkitList"
    :combobox-tipe-boiler-list="comboboxTipeBoilerList"
    v-model:refForm="refForm"
  />
  <DialogDetailMasterUnit
    :is-show="showDialogDetail"
    :data="dataDetail"
    @on-close="showDialogDetail = false"
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
