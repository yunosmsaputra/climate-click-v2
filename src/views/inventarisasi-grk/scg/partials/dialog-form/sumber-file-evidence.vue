<script setup>
import TitleSection from '@/components/TitleSection.vue';
import { AmFormLabel, AmTextArea, AmFileUpload } from 'amyun-ui-vue';

defineOptions({
  name: 'FormSumberFileEvidence',
});

const props = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
    <TitleSection>Sumber Data & File Evidence</TitleSection>
    <div class="flex gap-4 flex-wrap mt-4">
      <div class="w-[240px]">
        <AmFormLabel required size="medium">Sumber Data</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi sumber data yang digunakan untuk laporan ini
        </div>
      </div>
      <div class="w-[calc(100%-256px)]">
        <AmTextArea
          placeholder="Contoh: Data Konsumsi BBM untuk Genset"
        ></AmTextArea>
      </div>
      <div class="w-[240px]">
        <AmFormLabel required size="medium">File Evidence</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Tipe file yang dapat diunggah .jpg, .png, .jpeg, .pdf, atau .xlsx
        </div>
      </div>
      <div class="w-[calc(100%-256px)]">
        <AmFileUpload
          accept=".pdf,.jpg,.png,.jpeg,.pdf,.xlsx"
          :maxFileSize="{ size: 10, type: 'MB' }"
          v-model="params.fileEvidence"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
