<script setup>
import { AmButton, AmDialog, AmForm, AmIcon } from 'amyun-ui-vue'
import DataApar from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-form/fugitive-data-apar.vue'
import FugitiveAparDialogFormSumberData
  from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-form/sumber-data-file-evidence.vue'
import { blueColorLib } from '@/utils/constant.js'
import BasicInformationDetail from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/basic-information.vue'
import HasilPerhitunganEmisi
  from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/hasil-perhitungan-emisi.vue'
import DataAparDetail from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/data-apar.vue'
import SumberDataFileEvidenceDetail
  from '@/views/inventarisasi-grk/fugitiveApar/partials/dialog-detail/sumber-data-file-evidence.vue'
import InfoAlert from '@/components/InfoAlert.vue'
import { onMounted, ref } from 'vue'
import { useComboboxActions } from '@/utils/combobox.js'
import DialogFormInformasiUnitLaporanComponent from '@/components/DialogInventarisasiGrk/InformasiUnitLaporanForm.vue'

defineOptions({
  name: 'FugitiveAparDialogForm',
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
const {
  comboboxJenisGasList,
  getComboboxJenisGasList
} = useComboboxActions()

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
  getComboboxJenisGasList()
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
        <div class="text-lg text-netral-label font-semibold pl-2">Form Laporan Fugitive Apar</div>
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
        <BasicInformationDetail :data="params"></BasicInformationDetail>
        <hasil-perhitungan-emisi :data="params" class="mt-2"></hasil-perhitungan-emisi>
        <data-apar-detail :data="params" class="mt-2" />
        <sumber-data-file-evidence-detail :data="params" class="mt-2" />
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
          <data-apar
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
            :combobox-jenis-gas-list="comboboxJenisGasList"
            :is-loading="isLoadingDialog"
          />
          <fugitive-apar-dialog-form-sumber-data
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
