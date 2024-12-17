<script setup>
import {
  AmFilePreview,
  AmFileUpload,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmTextArea,
} from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'

defineOptions({
  name: 'InvenSf6DialogFormSumberData',
})

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:params'])
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white">
    <TitleSection>Sumber Data & File Evidence</TitleSection>
    <AmFormRow class="flex gap-x-4 flex-wrap mt-2">
      <AmFormCol class="w-[240px]">
        <AmFormLabel required size="medium">Sumber Data</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi sumber data yang digunakan untuk laporan ini
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc(100%-256px)]">
        <AmTextArea
          v-model="params.sumber_data"
          placeholder="Contoh : Data Konsumsi BBM untuk Genset"
          size="medium"
          rules="required"
          :is-loading="isLoading"
        ></AmTextArea>
      </AmFormCol>
      <AmFormCol class="w-[240px]">
        <AmFormLabel required size="medium">File Evidence</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Tipe file yang dapat diunggah .jpg, .png, .jpeg, .pdf, atau .xlsx
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc(100%-256px)]">
        <AmFileUpload
          accept=".jpg,.png,.jpeg,.pdf,.xlsx"
          :max-file-size="{ size: 10, type: 'MB' }"
          v-model="params.file"
          rules="required"
          v-if="!params.file_evidence_url"
          :is-loading="isLoading"
        ></AmFileUpload>
        <AmFilePreview
          :file-name="params.file_evidence_url"
          v-else
          @on-delete="params.file_evidence_url = null"
        />
      </AmFormCol>
    </AmFormRow>
  </div>
</template>

<style scoped></style>
