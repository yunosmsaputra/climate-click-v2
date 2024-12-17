<script setup>
import HeaderPage from '@/components/HeaderPage.vue'
import {
  AmButton,
  AmForm,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmIcon,
  AmTab,
  AmTabContent,
  AmTabTitle,
  AmTextArea,
  AmCounter,
} from 'amyun-ui-vue'
import ContentSection from '@/components/ContentSection.vue'
import { useInvenSf6Actions } from '@/views/inventarisasi-grk/inven-sf6/hooks/InvenSf6.actions.js'
import InvenSf6TableComponent from '@/views/inventarisasi-grk/inven-sf6/partials/table.vue'
import { useInvenSf6DialogActions } from '@/views/inventarisasi-grk/inven-sf6/hooks/dialog.js'
import InvenSf6DialogForm from '@/views/inventarisasi-grk/inven-sf6/partials/dialog-form/dialog.form.vue'
import InvenSf6DialogDetailComponent from '@/views/inventarisasi-grk/inven-sf6/partials/dialog-detail/dialog-detail.vue'
import { useInfenSf6TableAllActions } from '@/views/inventarisasi-grk/inven-sf6/hooks/table.js'
import { onMounted, watch } from 'vue'
import DialogConfirmation from '@/components/DialogConfirmation.vue'
import DialogAlert from '@/components/DialogAlert.vue'
import { useComboboxActions } from '@/utils/combobox.js'
import { userProfile } from '@/utils/constant.js'
import FugitiveAcRuanganTableComponent from '@/views/inventarisasi-grk/fugitive-ac-ruangan/partials/table.vue'

defineOptions({
  name: 'InventarisasiGrkInvenSf6Page',
})

const { activeTab } = useInvenSf6Actions()
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
  sortValue,
  onSort,
  counterDraft,
  sort,
} = useInfenSf6TableAllActions()
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
} = useInvenSf6DialogActions()
const { comboboxChildUnitList, getComboboxChildUnitList } = useComboboxActions()

onMounted(() => {
  periode.value = new Date().getFullYear()
  getData(summaryPagination.value.page, summaryPagination.value.dataSize)
  getComboboxChildUnitList(userProfile.unit.id)
})

watch(activeTab, (newValue) => {
  getData(
    summaryPagination.value.page,
    summaryPagination.value.dataSize,
    newValue,
    'updatedDate,desc',
    periode.value
  )
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
      sortValue.value,
      periode.value
    )
  }
})
watch(periode, (newValue) => {
  getData(
    summaryPagination.value.page,
    summaryPagination.value.dataSize,
    activeTab.value,
    sortValue.value,
    newValue
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
  <HeaderPage title="Inven SF6">
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
          <InvenSf6TableComponent
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
          ></InvenSf6TableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Draft Laporan'">
          <InvenSf6TableComponent
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
          ></InvenSf6TableComponent
        ></AmTabContent>
        <AmTabContent :isActive="activeTab.includes('Persetujuan Laporan')">
          <InvenSf6TableComponent
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
          ></InvenSf6TableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Final Laporan'">
          <InvenSf6TableComponent
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
          ></InvenSf6TableComponent>
        </AmTabContent>
      </template>
    </AmTab>
  </ContentSection>
  <InvenSf6DialogForm
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
  />
  <InvenSf6DialogDetailComponent
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
  ></InvenSf6DialogDetailComponent>
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
