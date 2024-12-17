<script setup>
import { AmButton, AmDialog, AmForm, AmIcon } from 'amyun-ui-vue'
import DataSf6 from '@/views/inventarisasi-grk/inven-sf6/partials/dialog-form/data-sf6.vue'
import { blueColorLib } from '@/utils/constant.js'
import HasilPerhitunganEmisi from '@/views/inventarisasi-grk/inven-sf6/partials/dialog-detail/hasil-perhitungan-emisi.vue'
import DataSf6Detail from '@/views/inventarisasi-grk/inven-sf6/partials/dialog-detail/data-sf6.vue'
import InfoAlert from '@/components/InfoAlert.vue'
import { onMounted, ref } from 'vue'
import DialogDetailBasicInformation from '@/components/DialogInventarisasiGrk/BasicInformationDetail.vue'
import DialogDetailSumberDataFileEvidence from '@/components/DialogInventarisasiGrk/SumberDataFileEvidenceDetail.vue'
import DialogFormInformasiUnitLaporanComponent from '@/components/DialogInventarisasiGrk/InformasiUnitLaporanForm.vue'
import DialogFormSumberDataFileEvidenceComponent from '@/components/DialogInventarisasiGrk/SumberDataFileEvidenceForm.vue'

defineOptions({
  name: 'InvenSf6DialogForm',
})

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  showPratinjau: {
    type: Boolean,
    default: false,
  },
  dataPratinjau: {
    type: Object,
    default: () => ({}),
  },
  refForm: {
    type: Object,
    default: () => ({}),
  },
  optionsChildUnit: {
    type: Array,
    default: () => [],
  },
  isLoadingButton: {
    type: Boolean,
    default: false,
  },
  isLoadingDialog: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits([
  'onClose',
  'onSaveDraft',
  'addDataList',
  'subtractDataList',
  'onPratinjau',
  'sendLaporan',
  'onBack',
  'update:refForm',
])

const refData = ref(null)

onMounted(() => {
  emits('update:refForm', refData.value)
})
</script>

<template>
  <AmDialog
    :is-show="isShow"
    @on-close="() => emits('onClose')"
    content-padding-reset
    expandable
    width="80vw"
  >
    <template #dialog-title>
      <div class="flex items-center">
        <AmIcon
          name="chevron-left"
          :size="24"
          :color="blueColorLib.main"
          v-if="showPratinjau"
          @click="
            () => {
              emits('onBack', params)
            }
          "
        ></AmIcon>
        <div class="text-lg text-netral-label font-semibold pl-2">Form Laporan Inven SF6</div>
      </div>
    </template>
    <template #dialog-content>
      <div v-show="showPratinjau">
        <div class="px-[18px] pt-2 bg-white" v-if="params.status === 'DITOLAK_OLEH_UI_SH'">
          <InfoAlert>
            <template #title>Ditolak Unit Induk / Subholding</template>
            <template #message>{{ params.keterangan_tolak }}</template>
          </InfoAlert>
        </div>
        <dialog-detail-basic-information :data="params"></dialog-detail-basic-information>
        <hasil-perhitungan-emisi :data="params" class="mt-2"></hasil-perhitungan-emisi>
        <data-sf6-detail :data="params" class="mt-2" />
        <dialog-detail-sumber-data-file-evidence :data="params" class="mt-2" />
      </div>
      <div v-show="!showPratinjau">
        <div
          class="px-[18px] pt-2 bg-white"
          v-if="
            params.status === 'DITOLAK_OLEH_UI_SH' || params.status === 'PERMINTAAN_REVISI_DIVTEK'
          "
        >
          <InfoAlert>
            <template #title>{{
              params.status === 'DITOLAK_OLEH_UI_SH'
                ? 'Ditolak Unit Induk / Subholding'
                : 'Permintaan Revisi DIVTEK'
            }}</template>
            <template #message>{{ params.keterangan_tolak }}</template>
          </InfoAlert>
        </div>
        <AmForm ref="refData">
          <dialog-form-informasi-unit-laporan-component
            :params="params"
            :options-child-unit="optionsChildUnit"
            :is-loading="isLoadingDialog"
          />
          <data-sf6
            :params="params"
            @add-data-list="
              () => {
                emits('addDataList')
              }
            "
            @subtract-data-list="
              (index) => {
                emits('subtractDataList', index)
              }
            "
            class="border-t-8 border-t-solid border-t-netral-background"
            :is-loading="isLoadingDialog"
          />
          <dialog-form-sumber-data-file-evidence-component
            :params="params"
            class="border-t-8 border-t-solid border-t-netral-background"
            :is-loading="isLoadingDialog"
          />
        </AmForm>
      </div>
    </template>
    <template #dialog-actions>
      <AmButton
        type="ghost"
        @click="
          () => {
            emits('onSaveDraft')
          }
        "
        >Simpan sebagai Draft</AmButton
      >
      <AmButton
        @click="
          () => {
            emits('onPratinjau')
          }
        "
        v-if="!showPratinjau"
        :is-loading="isLoadingButton"
        >Hitung Emisi</AmButton
      >
      <AmButton
        @click="
          () => {
            emits('sendLaporan')
          }
        "
        v-if="showPratinjau"
        >Kirim Laporan</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
