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
import { useComboboxActions } from '@/utils/combobox.js'
import { userProfile } from '@/utils/constant.js'
import DialogAlert from '@/components/DialogAlert.vue'
import DialogConfirmation from '@/components/DialogConfirmation.vue'
import FugitiveAcRuanganDialogDetailComponent from '@/views/inventarisasi-grk/fugitive-ac-ruangan/partials/dialog-detail/dialog.detail.vue'
import { useFugitiveAcKendaraanTableActions } from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/hooks/table.js'
import { useFugitiveAcKendaraanDialogActions } from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/hooks/dialog.js'
import FugitiveAcKendaraanTableComponent from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/partials/table.vue'
import FugitiveAcKendaraanDialogForm from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/partials/dialog-form/dialog.form.vue'
import FugitiveAcKendaraanDialogDetailComponent from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/partials/dialog-detail/dialog.detail.vue'

defineOptions({
  name: 'InventarisasiGrkFugitiveAcKendaraanPage',
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
  counterDraft,
} = useFugitiveAcKendaraanTableActions()

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
} = useFugitiveAcKendaraanDialogActions()
const {
  comboboxChildUnitList,
  comboboxFaktorEmisiList: comboboJenisRefigerant,
  getComboboxChildUnitList,
  getComboboxFaktorEmisiList,
} = useComboboxActions()

onMounted(() => {
  periode.value = new Date().getFullYear()
  getData(summaryPagination.value.page, summaryPagination.value.dataSize)
  getComboboxChildUnitList(userProfile.unit.id)
  getComboboxFaktorEmisiList(`jenisLaporan.namaTrx=='Fugitive AC Kendaraan'`)
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
watch(
  () => paramsForm.value.isUnitLaporanSendiri,
  (newValue) => {
    if (newValue) {
      paramsForm.value.unitChild = null
      paramsForm.value.isUnitLaporanSendiri = true
    }
  },
  { deep: true }
)
</script>

<template>
  <HeaderPage title="Fugitive AC Kendaraan">
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
        <AmTabTitle :isActive="activeTab.includes('Draft Laporan')">
          <div class="flex items-center gap-x-1.5">
            <div class="am-tab-title-list">Draft Laporan</div>
            <AmCounter
              class="rounded"
              v-if="counterDraft > 0 && userProfile.role.includes('SUBMITTER')"
            >
              <div class="text-[10px]">{{ counterDraft }}</div>
            </AmCounter>
          </div>
        </AmTabTitle>
        <AmTabTitle :isActive="activeTab.includes('Persetujuan Laporan')">
          <div class="flex items-center gap-x-1.5">
            <div class="am-tab-title-list">Persetujuan Laporan</div>
            <AmCounter
              class="rounded"
              v-if="counterPersetujuan > 0 && userProfile.role.includes('APPROVER')"
            >
              <div class="text-[10px]">{{ counterPersetujuan }}</div>
            </AmCounter>
          </div>
        </AmTabTitle>
        <AmTabTitle :isActive="activeTab === 'Final Laporan'">Final Laporan</AmTabTitle>
      </template>
      <template #tab-content="{ activeTab }">
        <AmTabContent :isActive="activeTab === 'Semua Laporan'">
          <FugitiveAcKendaraanTableComponent
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
          ></FugitiveAcKendaraanTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab.includes('Draft Laporan')">
          <FugitiveAcKendaraanTableComponent
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
          ></FugitiveAcKendaraanTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab.includes('Persetujuan Laporan')">
          <FugitiveAcKendaraanTableComponent
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
          ></FugitiveAcKendaraanTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Final Laporan'">
          <FugitiveAcKendaraanTableComponent
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
          ></FugitiveAcKendaraanTableComponent>
        </AmTabContent>
      </template>
    </AmTab>
  </ContentSection>
  <FugitiveAcKendaraanDialogForm
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
    :combobox-jenis-refigerant="comboboJenisRefigerant"
  />
  <fugitive-ac-kendaraan-dialog-detail-component
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
  ></fugitive-ac-kendaraan-dialog-detail-component>
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
