<script setup>
import { AmButton, AmDialog, AmTab, AmTabContent, AmTabTitle } from 'amyun-ui-vue'
import { ref } from 'vue'
import {redColorLib, userProfile} from '@/utils/constant.js'
import InfoAlert from '@/components/InfoAlert.vue'
import DialogDetailBasicInformation from '@/components/DialogInventarisasiGrk/BasicInformationDetail.vue'
import DialogDetailSumberDataFileEvidence from '@/components/DialogInventarisasiGrk/SumberDataFileEvidenceDetail.vue'
import DialogDetailRiwayatLaporan from '@/components/DialogInventarisasiGrk/RiwayatLaporanDetail.vue'
import FugitiveAcKendaraanHasilPerhitunganEmisi from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/partials/dialog-detail/hasil-perhitungan-emisi.vue'
import DataFugitiveAcKendaraanDetail from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/partials/dialog-detail/data.vue'

defineOptions({
  name: 'FugitiveAcKendaraanDialogDetailComponent',
})

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['onClose', 'onEdit', 'onApprove', 'onReject', 'onRevisi'])

const activeTab = ref('Detail Laporan')

const handleClose = () => {
  emits('onClose')
  activeTab.value = 'Detail Laporan'
}
</script>

<template>
  <AmDialog
    :is-show="isShow"
    @on-close="handleClose"
    expandable
    width="80vw"
    :with-edit="(data.status === 'DRAFT' || data.status === 'DITOLAK_OLEH_UI_SH' || data.status === 'PERMINTAAN_REVISI_DIVTEK') && userProfile.role.includes('SUBMITTER')"
    content-padding-reset
    @on-edit="
      () => {
        emits('onEdit', data)
      }
    "
    :style="{
      '--var-height':
        ((data.status === 'MENUNGGU_PERSETUJUAN_UI_SH' && userProfile.role.includes('APPROVER')) || (data.status === 'FINAL' && userProfile.role.includes('DIVTEK')))
          ? 'calc(100vh - 128px)'
          : 'calc(100vh - 74px)',
    }"
  >
    <template #dialog-title>
      <div :class="`text-lg text-netral-label font-semibold pl-2`">
        Lihat Detail Laporan Fugitive AC Kendaraan
      </div>
    </template>
    <template #dialog-content>
      <AmTab v-model:activeTab="activeTab">
        <template #tab-title="{ activeTab }">
          <AmTabTitle :is-active="activeTab === 'Detail Laporan'">Detail Laporan</AmTabTitle>
          <AmTabTitle :is-active="activeTab === 'Riwayat Laporan'">Riwayat Laporan</AmTabTitle>
        </template>
        <template #tab-content="{ activeTab }">
          <AmTabContent :is-active="activeTab === 'Detail Laporan'">
            <div
              class="px-[18px] pt-2 bg-white"
              v-if="
                data.status === 'DITOLAK_OLEH_UI_SH' || data.status === 'PERMINTAAN_REVISI_DIVTEK'
              "
            >
              <InfoAlert>
                <template #title>{{
                  data.status === 'DITOLAK_OLEH_UI_SH'
                    ? 'Ditolak Unit Induk / Subholding'
                    : 'Permintaan Revisi DIVTEK'
                }}</template>
                <template #message>{{ data.keterangan_tolak }}</template>
              </InfoAlert>
            </div>
            <dialog-detail-basic-information :data="data" :is-loading="isLoading" />
            <fugitive-ac-kendaraan-hasil-perhitungan-emisi
              :data="data"
              :is-loading="isLoading"
              class="border-t-8 border-t-solid border-t-netral-background"
            />
            <data-fugitive-ac-kendaraan-detail
              :data="data"
              :is-loading="isLoading"
              class="border-t-8 border-t-solid border-t-netral-background"
            />
            <dialog-detail-sumber-data-file-evidence
              :is-loading="isLoading"
              :data="data"
              @on-view-file="
                () => {
                  emits('onViewFile')
                }
              "
              class="border-t-8 border-t-solid border-t-netral-background"
            />
          </AmTabContent>
          <AmTabContent :is-active="activeTab === 'Riwayat Laporan'">
            <div class="px-[18px] pt-2 bg-white" v-if="data.status === 'DITOLAK_OLEH_UI_SH'">
              <InfoAlert>
                <template #title>Ditolak Unit Induk / Subholding</template>
                <template #message>{{ data.keterangan_tolak }}</template>
              </InfoAlert>
            </div>
            <dialog-detail-basic-information :data="data" />
            <dialog-detail-riwayat-laporan
              :data="data"
              class="border-t-8 border-t-solid border-t-netral-background"
            ></dialog-detail-riwayat-laporan>
          </AmTabContent>
        </template>
      </AmTab>
    </template>
    <template
      #dialog-actions
      v-if="(data.status === 'MENUNGGU_PERSETUJUAN_UI_SH' && userProfile.role.includes('APPROVER')) || (data.status === 'FINAL' && userProfile.role.includes('DIVTEK'))"
    >
      <AmButton
        type="ghost"
        :color="redColorLib.main"
        @click="
          () => {
            emits('onReject', data)
          }
        "
        v-if="data.status === 'MENUNGGU_PERSETUJUAN_UI_SH'"
        >Tolak Laporan</AmButton
      >
      <AmButton
        @click="
          () => {
            emits('onApprove', data)
          }
        "
        v-if="data.status === 'MENUNGGU_PERSETUJUAN_UI_SH'"
        >Setujui Laporan</AmButton
      >
      <AmButton
        @click="
          () => {
            emits('onRevisi', data)
          }
        "
        type="ghost"
        :color="redColorLib.main"
        v-if="data.status === 'FINAL'"
        >Permintaan Revisi</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped>
::v-deep(.am-dialog-title) {
  border-bottom: none !important;
  padding-bottom: 4px !important;
}
::v-deep(.am-dialog-content) {
  height: var(--var-height) !important;
}
::v-deep(.am-tab-title) {
  padding: 0 16px;
  border-bottom: 1px solid #f0f3f7;
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
