<script setup>
import HeaderPage from '@/components/HeaderPage.vue'
import {
  AmButton,
  AmCounter,
  AmForm,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmIcon,
  AmTab,
  AmTabContent,
  AmTabTitle,
  AmTextArea,
} from 'amyun-ui-vue'
import ContentSection from '@/components/ContentSection.vue'
import { onMounted, ref, watch } from 'vue'
import MckTableComponent from '@/views/inventarisasi-grk/mck/partials/table.vue'
import { useFugitiveAcRuanganTableActions } from '@/views/inventarisasi-grk/mck/hooks/table.js'
import { useComboboxActions } from '@/utils/combobox.js'
import { userProfile } from '@/utils/constant.js'
import { useFugitiveAcRuanganDialogActions } from '@/views/inventarisasi-grk/mck/hooks/dialog.js'
import MckDialogForm from '@/views/inventarisasi-grk/mck/partials/dialog-form/dialog.form.vue'
import DialogAlert from '@/components/DialogAlert.vue'
import DialogConfirmation from '@/components/DialogConfirmation.vue'
import FugitiveAcRuanganDialogDetailComponent from '@/views/inventarisasi-grk/mck/partials/dialog-detail/dialog.detail.vue'

defineOptions({
  name: 'MckPage',
})

const activeTab = ref('Semua Laporan')
const {
  loading: loadingTable,
  periode,
  summarySearch,
  columns,
  data,
  summaryPagination,
  summaryEmptyData,
  getData,
  idEditData,
  paramsDeleteData,
  paramsApproval,
  dataDetailRevisi,
  counterPersetujuan,
  onSort,
  sortValue,
} = useFugitiveAcRuanganTableActions()

const {
  loadingDialog,
  loadingButton,
  showDialogForm,
  closeDialogForm,
  openDialogForm,
  onSaveDraft,
  paramsForm,
  addDataList,
  onDetail,
  dataDetail,
  showDialogDetail,
  closeDialogDetail,
  showDialogConfirmation,
  openDialogConfirmation,
  summaryConfirmation,
  onSave,
  subtractDataList,
  onPratinjau,
  showPratinjau,
  dataPratinjau,
  backToForm,
  summaryDialogAlert,
  showDialogAlert,
  sendLaporan,
  closeDialogConfirmation,
  handleSubmitConfirmation,
  keteranganPenolakan,
  refForm,
  refFormReject,
  reFetchData,
  closeDialogAlert,
} = useFugitiveAcRuanganDialogActions()
const {
  comboboxChildUnitList,
  comboboxVariableFaktorEmisiList: comboboxJenisAc,
  comboboxFaktorEmisiList: comboboxJenisBahanbakar,
  getComboboxChildUnitList,
  getComboboxVariableFaktorEmisi,
  getComboboxFaktorEmisiList,
} = useComboboxActions()

onMounted(() => {
  periode.value = new Date().getFullYear()
  getData(summaryPagination.value.page, summaryPagination.value.dataSize)
  getComboboxChildUnitList(userProfile.unit.id)
  getComboboxVariableFaktorEmisi(`jenisLaporan.namaTrx=='Mobile Combustion Kendaraan'`)
  getComboboxFaktorEmisiList(`jenisLaporan.namaTrx=='Mobile Combustion Kendaraan'`)
})

watch(activeTab, (newValue) => {
  getData(summaryPagination.value.page, summaryPagination.value.dataSize, newValue)
})

watch(idEditData, (value) => {
  if (value) {
    openDialogForm(value)
  }
})
watch(showDialogForm, (value) => {
  if (!value) {
    idEditData.value = null
  }
})
watch(paramsDeleteData, (value) => {
  if (value) {
    openDialogConfirmation('delete', value)
  }
})
watch(paramsApproval, (newValue) => {
  if (newValue) {
    openDialogConfirmation(newValue.state, newValue)
  }
})
watch(dataDetailRevisi, (newValue) => {
  if (newValue) {
    openDialogConfirmation(newValue.state, newValue)
  }
})
watch(showDialogConfirmation, (value) => {
  if (!value) {
    paramsDeleteData.value = null
    paramsApproval.value = null
  }
})
watch(reFetchData, (newValue) => {
  if (newValue) {
    getData(
      summaryPagination.value.page,
      summaryPagination.value.dataSize,
      activeTab.value,
      sortValue.value
    )
  }
})
watch(periode, () => {
  getData(
    summaryPagination.value.page,
    summaryPagination.value.dataSize,
    activeTab.value,
    sortValue.value
  )
})
</script>

<template>
  <HeaderPage title="Mobile Combustion Kendaraan">
    <template #action>
      <AmButton type="ghost">
        <template #prepend>
          <AmIcon name="upload" color="#2671D9" :size="14"></AmIcon>
        </template>
        Import Laporan
      </AmButton>
      <AmButton
        @click="
          () => {
            openDialogForm()
          }
        "
      >
        <template #prepend>
          <AmIcon name="plus" color="#FFFFFF" :size="14"></AmIcon>
        </template>
        Tambah Laporan
      </AmButton>
    </template>
  </HeaderPage>
  <ContentSection is-tab>
    <AmTab v-model:activeTab="activeTab">
      <template #tab-title="{ activeTab }">
        <AmTabTitle :isActive="activeTab === 'Semua Laporan'" class="ml-4"
          >Semua Laporan</AmTabTitle
        >
        <AmTabTitle :isActive="activeTab === 'Draft Laporan'">Draft Laporan</AmTabTitle>
        <AmTabTitle :isActive="activeTab.includes('Persetujuan Laporan')">
          <div class="flex items-center gap-x-1.5">
            <div class="am-tab-title-list">Persetujuan Laporan</div>
            <AmCounter class="rounded" v-if="counterPersetujuan > 0">
              <div class="text-[10px]">{{ counterPersetujuan }}</div>
            </AmCounter>
          </div>
        </AmTabTitle>
        <AmTabTitle :isActive="activeTab === 'Final Laporan'">Final Laporan</AmTabTitle>
      </template>
      <template #tab-content="{ activeTab }">
        <AmTabContent :isActive="activeTab === 'Semua Laporan'">
          <MckTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
            :is-loading="loadingTable"
            v-model:periode="periode"
            @on-sort="
              (sort) => {
                onSort(activeTab, sort)
              }
            "
          ></MckTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Draft Laporan'">
          <MckTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
            :is-loading="loadingTable"
            v-model:periode="periode"
            @on-sort="
              (sort) => {
                onSort(activeTab, sort)
              }
            "
          ></MckTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Persetujuan Laporan'">
          <MckTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
            :is-loading="loadingTable"
            v-model:periode="periode"
            @on-sort="
              (sort) => {
                onSort(activeTab, sort)
              }
            "
          ></MckTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Final Laporan'">
          <MckTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
            :is-loading="loadingTable"
            v-model:periode="periode"
            @on-sort="
              (sort) => {
                onSort(activeTab, sort)
              }
            "
          ></MckTableComponent>
        </AmTabContent>
      </template>
    </AmTab>
  </ContentSection>
  <MckDialogForm
    :is-show="showDialogForm"
    @on-close="closeDialogForm"
    @on-save-draft="onSaveDraft"
    v-model:params="paramsForm"
    @add-data-list="addDataList"
    @subtract-data-list="subtractDataList"
    @on-pratinjau="onPratinjau"
    :show-pratinjau="showPratinjau"
    @on-back="backToForm"
    :data-pratinjau="dataPratinjau"
    @send-laporan="
      () => {
        openDialogConfirmation('send')
      }
    "
    v-model:refForm="refForm"
    :options-child-unit="comboboxChildUnitList"
    :is-loading-button="loadingButton"
    :is-loading-dialog="loadingDialog"
    :combobox-jenis-bahanbakar="comboboxJenisBahanbakar"
  />
  <fugitive-ac-ruangan-dialog-detail-component
    :is-show="showDialogDetail"
    :data="dataDetail"
    @on-close="
      () => {
        closeDialogDetail()
      }
    "
    @on-edit="
      (data) => {
        openDialogForm(data.id)
      }
    "
    @on-approve="
      (data) => {
        openDialogConfirmation('approve', data)
      }
    "
    @on-reject="
      (data) => {
        openDialogConfirmation('reject', data)
      }
    "
    @on-revisi="
      (data) => {
        openDialogConfirmation('revisi', data)
      }
    "
    :is-loading="loadingDialog"
  ></fugitive-ac-ruangan-dialog-detail-component>
  <DialogConfirmation
    :is-show="showDialogConfirmation"
    :summary-confirmation="summaryConfirmation"
    @on-close="closeDialogConfirmation"
    @on-submit="handleSubmitConfirmation"
    :is-loading="loadingButton"
  >
    <template
      #additional-content
      v-if="
        summaryConfirmation.title.includes('Tolak') || summaryConfirmation.title.includes('Revisi')
      "
    >
      <AmForm ref="refFormReject">
        <AmFormRow class="w-full">
          <AmFormCol class="w-full">
            <AmFormLabel class="mt-3" required>{{
              summaryConfirmation.title.includes('Tolak')
                ? 'Keterangan Penolakan'
                : 'Keterangan Permintaan Revisi'
            }}</AmFormLabel>
            <AmTextArea
              placeholder="Contoh: File evidence tidak sesuai"
              v-model="keteranganPenolakan"
              class="mt-1.5"
              rules="required"
            ></AmTextArea>
          </AmFormCol>
        </AmFormRow>
      </AmForm>
    </template>
  </DialogConfirmation>
  <DialogAlert
    :is-show="showDialogAlert"
    :summary-alert="summaryDialogAlert"
    @on-close="closeDialogAlert"
  ></DialogAlert>
</template>

<style scoped></style>
