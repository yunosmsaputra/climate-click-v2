<script setup>
import TitleSection from '@/components/TitleSection.vue';
import {
  AmButton,
  AmCounter,
  AmFormLabel,
  AmIcon,
  AmSelectBox,
  AmTextField,
} from 'amyun-ui-vue';
import { blueColorLib, redColorLib } from '@/utils/constant.js';

defineOptions({
  name: 'FormDataBahanBakarGenset',
});

const props = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(['addData', 'subtractData']);
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
    <TitleSection>Data Bahan Bakar Genset</TitleSection>
    <div v-for="(item, index) in params.dataBahanBakar" :key="index">
      <div class="flex gap-x-[6px] mt-4">
        <AmCounter :size="24" :background="blueColorLib.main">{{
          index + 1
        }}</AmCounter>
        <div
          class="w-6 h-6 rounded-md border border-solid border-red-border flex items-center justify-center hover:bg-red-surface"
          @click="
            () => {
              emits('subtractData', index);
            }
          "
          v-if="params.dataBahanBakar.length > 1"
        >
          <AmIcon name="delete" :color="redColorLib.main" :size="12"></AmIcon>
        </div>
      </div>
      <div class="flex gap-4 flex-wrap mt-4">
        <div class="w-[240px]">
          <AmFormLabel required size="medium">Status Kepemilikan</AmFormLabel>
          <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
            Berisi status kepemilikan genset
          </div>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmSelectBox
            placeholder="Pilih Status Kepemilikan"
            size="medium"
          ></AmSelectBox>
        </div>
        <div class="w-[calc((100%-272px)/2)]"></div>
        <div class="w-[240px]">
          <AmFormLabel required size="medium">Bahan Bakar Genset</AmFormLabel>
          <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
            Berisi jenis bahan bakar dan jumlah konsumsi bahan bakar genset
          </div>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmSelectBox
            placeholder="Pilih Jenis Bahan Bakar"
            size="medium"
          ></AmSelectBox>
        </div>
        <div class="w-[calc((100%-272px)/2)]">
          <AmTextField
            placeholder="Jumlah Konsumsi Bahan Bakar"
            size="medium"
            v-model="params.dataBahanBakar[index].konsumsiBahanBakar"
          >
            <template #append-inner>
              <div class="text-xs leading-4 text-blue-main">Liter</div>
            </template>
          </AmTextField>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <AmButton
        type="ghost"
        @click="
          () => {
            emits('addData');
          }
        "
      >
        <template #prepend>
          <AmIcon name="plus" :size="14" :color="blueColorLib.main"></AmIcon>
        </template>
        Tambah Data
      </AmButton>
    </div>
  </div>
</template>

<style scoped></style>
