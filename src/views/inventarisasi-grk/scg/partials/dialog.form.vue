<script setup>
import { AmDialog, AmButton, AmChip } from 'amyun-ui-vue';
import { ref } from 'vue';
import FormInformasiUnitLaporan from '@/views/inventarisasi-grk/scg/partials/dialog-form/informasi-unit-laporan.vue';
import FormDataBahanBakarGenset from '@/views/inventarisasi-grk/scg/partials/dialog-form/data-bahan-bakar-genset.vue';
import FormSumberFileEvidence from '@/views/inventarisasi-grk/scg/partials/dialog-form/sumber-file-evidence.vue';
import BoxDetailDecoration from '@/components/BoxDetailDecoration.vue';
import DetailUnitLaporan from '@/views/inventarisasi-grk/scg/partials/dialog-form/detail-unit-laporan.vue';
import HasilPerhitunganEmisi from '@/views/inventarisasi-grk/scg/partials/dialog-form/hasil-perhitungan-emisi.vue';
import PreviewTableBahanBakarGenset from '@/views/inventarisasi-grk/scg/partials/dialog-form/preview-table-bahan-bakar-genset.vue';
import PreviewSumberDataFileEvidence from '@/views/inventarisasi-grk/scg/partials/dialog-form/preview-sumber-data-file-evidence.vue';

defineOptions({
  name: 'SCGDialogForm',
});

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  activeLaporan: {
    type: String,
    default: 'sendiri',
  },
  params: {
    type: Object,
    default: () => {},
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
  columnsPreviewBahanBakar: {
    type: Array,
    default: () => [],
  },
  dataPreviewBahanBakar: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits([
  'onClose',
  'onSelectLaporan',
  'addBahanBakar',
  'subtractBahanBakar',
  'onSaveDraft',
  'onPreview',
]);

const bulan = ref();
</script>

<template>
  <AmDialog
    :is-show="isShow"
    @on-close="
      () => {
        emits('onClose');
      }
    "
    expandable
    width="60vw"
    content-padding-reset
  >
    <template #dialog-title>
      <div class="text-lg text-netral-label">{{ title }}</div>
    </template>
    <template #dialog-content>
      <div class="bg-netral-background" v-if="!isPreview">
        <FormInformasiUnitLaporan
          :active-laporan="activeLaporan"
          @on-select-laporan="
            (value) => {
              emits('onSelectLaporan', value);
            }
          "
        />
        <FormDataBahanBakarGenset
          :params="params"
          @add-data="
            () => {
              emits('addBahanBakar');
            }
          "
          @subtract-data="
            (index) => {
              emits('subtractBahanBakar', index);
            }
          "
        />
        <FormSumberFileEvidence :params="params" />
      </div>
      <div class="bg-netral-background" v-if="isPreview">
        <DetailUnitLaporan />
        <HasilPerhitunganEmisi />
        <PreviewTableBahanBakarGenset
          :columns="columnsPreviewBahanBakar"
          :data="dataPreviewBahanBakar"
        />
        <PreviewSumberDataFileEvidence />
      </div>
    </template>
    <template #dialog-actions>
      <AmButton
        type="ghost"
        @click="
          () => {
            emits('onSaveDraft');
          }
        "
        >Simpan sebagai Draft</AmButton
      >
      <AmButton
        @click="
          () => {
            emits('onPreview');
          }
        "
        >Pratinjau Laporan</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
