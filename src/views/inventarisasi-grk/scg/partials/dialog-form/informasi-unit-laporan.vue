<script setup>
import { AmFormLabel, AmMonthPicker, AmSelectBox } from 'amyun-ui-vue';
import { blueColorLib, greenColorLib } from '@/utils/constant.js';
import TitleSection from '@/components/TitleSection.vue';
import BoxDecoration from '@/components/BoxDecoration.vue';
import IconFrameBlue from '@/assets/icons/icon-frame-blue.vue';
import IconFrameGreen from '@/assets/icons/icon-frame-green.vue';
import { ref } from 'vue';

defineOptions({
  name: 'FormInformasiUnitLaporan',
});

const props = defineProps({
  activeLaporan: {
    type: String,
    default: 'sendiri',
  },
});
const emits = defineEmits(['onSelectLaporan']);

const onHoverSendiri = ref(false);
const onHoverLain = ref(false);
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white">
    <TitleSection>Informasi Unit Laporan</TitleSection>
    <div class="flex gap-4 flex-wrap mt-4">
      <div class="w-[240px]">
        <AmFormLabel required size="medium">Unit Laporan</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi laporan untuk unit ini atau laporan unit lainnya
        </div>
      </div>
      <div class="w-[calc((100%-272px)/2)]">
        <BoxDecoration
          color="blue"
          :active="activeLaporan === 'sendiri'"
          :hover="onHoverSendiri"
          @mouseover="onHoverSendiri = true"
          @mouseleave="onHoverSendiri = false"
          @click="
            () => {
              emits('onSelectLaporan', 'sendiri');
            }
          "
        >
          <div class="flex gap-2 items-center">
            <icon-frame-blue />
            <div class="text-lg text-netral-black font-semibold">
              Laporan Unit Ini
            </div>
          </div>
          <div class="mt-3 text-lg text-black">PLTU Pangkalan Susu</div>
        </BoxDecoration>
      </div>
      <div class="w-[calc((100%-272px)/2)]">
        <BoxDecoration
          color="green"
          :active="activeLaporan === 'lain'"
          :hover="onHoverLain"
          @mouseover="onHoverLain = true"
          @mouseleave="onHoverLain = false"
          @click="
            () => {
              emits('onSelectLaporan', 'lain');
            }
          "
        >
          <div class="flex gap-2 items-center">
            <icon-frame-green />
            <div class="text-lg text-netral-black font-semibold">
              Laporan Unit Lain
            </div>
          </div>
          <AmSelectBox
            size="medium"
            class="mt-[6px]"
            :customColor="{
              background:
                onHoverLain || activeLaporan === 'lain'
                  ? greenColorLib.main
                  : '#FFFFFF',
              placeholder:
                onHoverLain || activeLaporan === 'lain' ? '#FFFFFF' : '#9C9C9C',
              iconColor:
                onHoverLain || activeLaporan === 'lain'
                  ? '#FFFFFF'
                  : blueColorLib.main,
            }"
          ></AmSelectBox>
        </BoxDecoration>
      </div>
      <div class="w-[240px]">
        <AmFormLabel required size="medium">Bulan Laporan</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi periode bulan laporan
        </div>
      </div>
      <div class="w-[calc((100%-272px)/2)]">
        <AmMonthPicker
          auto-select
          placeholder="Pilih Bulan Laporan"
          month-type="short"
          size="medium"
        ></AmMonthPicker>
      </div>
      <div class="w-[calc((100%-272px)/2)]"></div>
    </div>
  </div>
</template>

<style scoped></style>
