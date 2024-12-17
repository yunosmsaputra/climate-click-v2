<script setup>
import {
  AmButton,
  AmCounter,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmIcon, AmSelectBox,
  AmTextField,
} from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { blueColorLib, redColorLib } from '@/utils/constant.js'

defineOptions({
  name: 'FugitiveAparDialogFormDataApar',
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
  comboboxJenisGasList: {
    type: Array,
    default: () => [],
  },
})
const emits = defineEmits(['addDataList', 'subtractDataList', 'update:params'])
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white">
    <TitleSection>Data Fugitive APAR</TitleSection>
    <div class="mt-4" v-for="(item, index) in params.data_list" :key="index">
      <div class="flex gap-x-1.5">
        <AmCounter :size="24" background="#2671D9">{{ index + 1 }}</AmCounter>
        <div
          class="w-6 h-6 border border-solid border-red-border rounded-md flex items-center justify-center hover:bg-red-surface"
          v-if="params.data_list.length > 1"
          @click="
            () => {
              emits('subtractDataList', index);
            }
          "
        >
          <AmIcon
            name="delete-outline"
            :size="12"
            :color="redColorLib.main"
          ></AmIcon>
        </div>
      </div>
      <div class="flex gap-x-4 mt-2">
        <div class="w-[240px]">
          <AmFormLabel required size="medium">Jenis Gas</AmFormLabel>
          <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
            Berisi jenis gas APAR
          </div>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmSelectBox
            size="medium"
            placeholder="Pilih Jenis Gas"
            v-model="params.data_list[index].jenis_gas"
            :options="comboboxJenisGasList"
            identifier="id"
            text="nama"
            searchable
            rules="required"
            placeholder-search="Cari Jenis Gas"
            :is-loading="isLoading"
          ></AmSelectBox>
        </div>
      </div>
      <div class="flex gap-x-4 mt-2">
        <div class="w-[240px]">
          <AmFormLabel required size="medium">Penyimpanan APAR</AmFormLabel>
          <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
            Berisi jumlah penyeimpanan gas APAR dengan tipe APAR fixed dan portable
          </div>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmTextField
            v-model="params.data_list[index].penyimpanan_apar_fixed"
            placeholder="Jumlah Penyimpanan APAR Fixed"
            size="medium"
            rules="required|number|min:1"
            formattedNumber
            :is-loading="isLoading"
          >
            <template #append-inner>
              <div class="text-xs text-[#2671D9]">kgCO2</div>
            </template>
          </AmTextField>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmTextField
            v-model="params.data_list[index].penyimpanan_apar_portable"
            placeholder="Jumlah Penyimpanan APAR Portable"
            size="medium"
          >
            <template #append-inner>
              <div class="text-xs text-[#2671D9]">kgCO2</div>
            </template>
          </AmTextField>
        </div>
      </div>
      <div class="flex gap-x-4 mt-2">
        <div class="w-[240px]">
          <AmFormLabel required size="medium">Penggunaan APAR</AmFormLabel>
          <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
            Berisi jumlah penggunaan gas APAR secara keseluruhan
          </div>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmTextField
            v-model="params.data_list[index].penggunaan_apar"
            placeholder="Jumlah Penggunaan APAR"
            size="medium"
            rules="required|number|min:1"
            formattedNumber
            :is-loading="isLoading"
          >
            <template #append-inner>
              <div class="text-xs text-[#2671D9]">kgCO2</div>
            </template>
          </AmTextField>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <AmButton
        type="ghost"
        @click="
          () => {
            emits('addDataList');
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
