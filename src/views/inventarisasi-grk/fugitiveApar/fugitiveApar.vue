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
} from 'amyun-ui-vue'
import ContentSection from '@/components/ContentSection.vue'
import { useFugitiveAparActions } from '@/views/inventarisasi-grk/fugitiveApar/hooks/FugitiveApar.actions.js'
import FugitiveAparTableComponent from '@/views/inventarisasi-grk/fugitiveApar/partials/table.vue'
import { useFugitiveAparDialogActions } from '@/views/inventarisasi-grk/fugitiveApar/hooks/dialog.js'
import FugitiveAparDialogForm from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-form/dialog.form.vue'
import FugitiveAparDialogDetailComponent from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/dialog-detail.vue'
import { useFugitiveAparTableAllActions } from '@/views/inventarisasi-grk/fugitiveApar/hooks/table.js'
import { onMounted, watch } from 'vue'
import DialogConfirmation from '@/components/DialogConfirmation.vue'
import DialogAlert from '@/components/DialogAlert.vue'
import { useComboboxActions } from '@/utils/combobox.js'
import { userProfile } from '@/utils/constant.js'

defineOptions({
  name: 'InventarisasiGrkFugitiveAparPage',
})

const { activeTab } = useFugitiveAparActions()
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
} = useFugitiveAparTableAllActions()
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
} = useFugitiveAparDialogActions()
const { comboboxChildUnitList, getComboboxChildUnitList } = useComboboxActions()

onMounted(() => {
  periode.value = new Date().getFullYear()
  getData(summaryPagination.value.page, summaryPagination.value.dataSize)
  getComboboxChildUnitList(userProfile.unit.id)
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
    getData(summaryPagination.value.page, summaryPagination.value.dataSize)
  }
})
watch(periode, () => {
  getData(summaryPagination.value.page, summaryPagination.value.dataSize)
})
</script>

<template>
  <HeaderPage title="Fugitive APAR">
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
        <AmTabTitle :isActive="activeTab === 'Persetujuan Laporan'">Persetujuan Laporan</AmTabTitle>
        <AmTabTitle :isActive="activeTab === 'Final Laporan'">Final Laporan</AmTabTitle>
      </template>
      <template #tab-content="{ activeTab }">
        <AmTabContent :isActive="activeTab === 'Semua Laporan'">
          <FugitiveAparTableComponent
            @on-detail="onDetail"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
            :is-loading="loadingTable"
            v-model:periode="periode"
          ></FugitiveAparTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Draft Laporan'">
          <FugitiveAparTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
          ></FugitiveAparTableComponent
        ></AmTabContent>
        <AmTabContent :isActive="activeTab === 'Persetujuan Laporan'">
          <FugitiveAparTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
          ></FugitiveAparTableComponent>
        </AmTabContent>
        <AmTabContent :isActive="activeTab === 'Final Laporan'">
          <FugitiveAparTableComponent
            @on-detail="onDetail"
            :columns="columns"
            :data="data"
            :summary-search="summarySearch"
            :summary-empty-data="summaryEmptyData"
            :summary-pagination="summaryPagination"
          ></FugitiveAparTableComponent>
        </AmTabContent>
      </template>
    </AmTab>
  </ContentSection>
  <FugitiveAparDialogForm
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
  <FugitiveAparDialogDetailComponent
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
  ></FugitiveAparDialogDetailComponent>
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
