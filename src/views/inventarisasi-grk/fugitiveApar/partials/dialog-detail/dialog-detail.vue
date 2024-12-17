<script setup>
import { AmButton, AmDialog, AmTab, AmTabContent, AmTabTitle } from 'amyun-ui-vue'
import { ref } from 'vue'
import BasicInformationDetail from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/basic-information.vue'
import HasilPerhitunganEmisi from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/hasil-perhitungan-emisi.vue'
import DataApar from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/data-apar.vue'
import SumberDataFileEvidenceDetail from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/sumber-data-file-evidence.vue'
import RiwayatLaporan from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/riwayat-laporan.vue'
import { redColorLib } from '@/utils/constant.js'
import InfoAlert from '@/components/InfoAlert.vue'

defineOptions({
  name: 'FugitiveAparDialogDetailComponent',
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
    :with-edit="data.status === 'DRAFT' || data.status === 'DITOLAK_OLEH_UI_SH'"
    content-padding-reset
    @on-edit="
      () => {
        emits('onEdit', data)
      }
    "
    :style="{
      '--var-height':
        data.status === 'MENUNGGU_PERSETUJUAN_UI_SH' || data.status === 'FINAL'
          ? 'calc(100vh - 128px)'
          : 'calc(100vh - 74px)',
    }"
  >
    <template #dialog-title>
      <div :class="`text-lg text-netral-label font-semibold pl-2`">
        Lihat Detail Laporan Fugitive Apar
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
            <BasicInformationDetail :data="data" :is-loading="isLoading" />
            <HasilPerhitunganEmisi :data="data" :is-loading="isLoading" class="mt-2" />
            <DataApar :data="data" :is-loading="isLoading" class="mt-2" />
            <SumberDataFileEvidenceDetail :is-loading="isLoading" :data="data" class="mt-2" />
          </AmTabContent>
          <AmTabContent :is-active="activeTab === 'Riwayat Laporan'">
            <div class="px-[18px] pt-2 bg-white" v-if="data.status === 'DITOLAK_OLEH_UI_SH'">
              <InfoAlert>
                <template #title>Ditolak Unit Induk / Subholding</template>
                <template #message>{{ data.keterangan_tolak }}</template>
              </InfoAlert>
            </div>
            <BasicInformationDetail :data="data" />
            <RiwayatLaporan :data="data" class="mt-2"></RiwayatLaporan>
          </AmTabContent>
        </template>
      </AmTab>
    </template>
    <template
      #dialog-actions
      v-if="data.status === 'MENUNGGU_PERSETUJUAN_UI_SH' || data.status === 'FINAL'"
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
  background: #f0f3f7 !important;
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
