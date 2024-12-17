<script setup>
import {
  AmButton,
  AmCounter,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmIcon,
  AmTextField,
  AmSelectBox,
} from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { blueColorLib, redColorLib } from '@/utils/constant.js'

defineOptions({
  name: 'FugitiveAcKulkasData',
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
  comboboxJenisAc: {
    type: Array,
    default: [],
  },
  comboboxJenisRefigerant: {
    type: Array,
    default: [],
  },
})
const emits = defineEmits(['addDataList', 'subtractDataList', 'update:params'])
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white">
    <TitleSection>Data Fugitive AC Kulkas</TitleSection>
    <div class="mt-4" v-for="(item, index) in params.data_list" :key="index">
      <div class="flex gap-x-1.5">
        <AmCounter :size="24" background="#2671D9">{{ index + 1 }}</AmCounter>
        <div
          class="w-6 h-6 border border-solid border-red-border rounded-md flex items-center justify-center hover:bg-red-surface"
          v-if="params.data_list.length > 1"
          @click="
            () => {
              emits('subtractDataList', index)
            }
          "
        >
          <AmIcon name="delete-outline" :size="12" :color="redColorLib.main"></AmIcon>
        </div>
      </div>
      <AmFormRow class="flex gap-x-4 mt-2">
        <AmFormCol class="w-[240px]">
          <AmFormLabel required size="medium">Data Refrigerant</AmFormLabel>
          <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
            Berisi jenis dan kapasitas refrigerant (freon) kulkas
          </div>
        </AmFormCol>
        <AmFormCol class="w-[calc((100%-272px)/2)]">
          <AmSelectBox
            v-model="params.data_list[index].faktor_emisi"
            placeholder="Pilih Jenis Refrigerant"
            size="medium"
            rules="required"
            searchable
            :options="comboboxJenisRefigerant"
            identifier="id"
            text="nama"
          ></AmSelectBox>
        </AmFormCol>
        <AmFormCol class="w-[calc((100%-272px)/2)]">
          <AmTextField
            v-model="params.data_list[index].penggunaan"
            placeholder="Kapasitas Refrigerant Kulkas"
            size="medium"
            rules="required|number|min:1"
            formattedNumber
            :is-loading="isLoading"
          >
            <template #append-inner>
              <div class="text-xs text-[#2671D9]">kg</div>
            </template>
          </AmTextField>
        </AmFormCol>
      </AmFormRow>
    </div>
    <div class="flex justify-end mt-4">
      <AmButton
        type="ghost"
        @click="
          () => {
            emits('addDataList')
          }
        "
      >
        <template #prepend>
          <AmIcon name="plus" :size="12" :color="blueColorLib.main"></AmIcon>
        </template>
        Tambah Data
      </AmButton>
    </div>
  </div>
</template>

<style scoped></style>
