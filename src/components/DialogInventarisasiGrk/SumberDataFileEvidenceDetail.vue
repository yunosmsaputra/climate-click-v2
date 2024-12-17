<script setup>
import TitleSection from '@/components/TitleSection.vue'
import { ref } from 'vue'
import { AmFormLabel, AmText, AmFilePreview } from 'amyun-ui-vue'

defineOptions({
  name: 'DialogDetailSumberDataFileEvidence',
})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const isExpand = ref(true)

const handleOpenFile = () => {
  window.open(props.data.preview_file, '_blank')
}
</script>

<template>
  <div class="bg-netral-white pt-[18px] pr-[18px] pb-6 pl-6">
    <title-section with-button-expand :is-expand="isExpand" @on-click-expand="isExpand = !isExpand"
      >Sumber Data & File Evidence</title-section
    >
    <div class="mt-4" v-if="isExpand">
      <div class="flex gap-x-1.5 gap-y-2 flex-wrap">
        <AmFormLabel size="medium" class="w-[240px]">Sumber Data</AmFormLabel>
        <AmText
          :is-loading="isLoading"
          :class="`text-sm ${data.sumber_data ? 'text-netral-black' : 'text-netral-textField'} w-[calc(100%-246px)]`"
        >
          {{ data.sumber_data ?? 'Tidak ada sumber data' }}
        </AmText>
        <AmFormLabel size="medium" class="w-[240px]">File Evidence</AmFormLabel>
        <AmFilePreview
          :file-name="data.file ? data.file[0].name : data.file_evidence_url"
          hide-delete-actions
          @on-view="handleOpenFile"
          class="w-[calc(100%-246px)]"
          v-if="
            (data.file && data.file[0].type.includes('spreadsheet')) ||
            (data.file_evidence_url &&
              data.file_evidence_url
                .split('.')
                [data.file_evidence_url.split('.').length - 1].includes('xls'))
          "
        ></AmFilePreview>
        <iframe
          :src="data.preview_file"
          class="w-[calc(100%-246px)] h-[400px]"
          v-else-if="data.preview_file"
        ></iframe>
        <AmText
          :is-loading="isLoading"
          :class="`text-sm text-netral-textField w-[calc(100%-246px)]`"
          v-else
        >
          Tidak ada file evidence
        </AmText>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
