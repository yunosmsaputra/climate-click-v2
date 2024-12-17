<script setup>
import { AmFormLabel, AmMonthPicker, AmSelectBox, AmFormRow, AmFormCol, AmDiv } from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { blueColorLib, greenColorLib, neutralColorLib, userProfile } from '@/utils/constant.js'
import IconFrameGreen from '@/assets/icons/icon-frame-green.vue'
import BoxDecoration from '@/components/BoxDecoration.vue'
import IconFrameBlue from '@/assets/icons/icon-frame-blue.vue'
import { computed, ref } from 'vue'

defineOptions({
  name: 'InvenSf6DialogFormInformasiUnitLaporan',
})

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
  optionsChildUnit: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const isHoverUnitSendiri = ref(false)
const isHoverUnitLain = ref(false)
const propsRequiredChildUnit = computed(() => {
  return !props.params.isUnitLaporanSendiri
    ? {
        rules: 'required',
      }
    : {}
})
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-white">
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
          :active="params.isUnitLaporanSendiri"
          :hover="isHoverUnitSendiri"
          @mouseover="isHoverUnitSendiri = true"
          @mouseleave="isHoverUnitSendiri = false"
          @click="params.isUnitLaporanSendiri = true"
        >
          <div class="flex gap-2 items-center">
            <icon-frame-blue />
            <div class="text-base text-netral-black font-semibold">Laporan Unit Ini</div>
          </div>
          <div class="mt-3 text-base text-black">{{ userProfile.unit.nama }}</div>
        </BoxDecoration>
      </div>
      <div class="w-[calc((100%-272px)/2)]">
        <BoxDecoration
          color="green"
          is-input
          :active="!params.isUnitLaporanSendiri"
          :hover="isHoverUnitLain"
          @mouseover="isHoverUnitLain = true"
          @mouseleave="isHoverUnitLain = false"
          @click="params.isUnitLaporanSendiri = false"
        >
          <div class="flex gap-2 items-center">
            <icon-frame-green />
            <div class="text-base text-netral-black font-semibold">Laporan Unit Lain</div>
          </div>
          <AmFormRow class="w-full">
            <AmFormCol class="w-full">
              <AmSelectBox
                size="medium"
                class="mt-[6px]"
                :customColor="{
                  background:
                    isHoverUnitLain || !params.isUnitLaporanSendiri
                      ? greenColorLib.main
                      : '#FFFFFF',
                  placeholder:
                    isHoverUnitLain || !params.isUnitLaporanSendiri ? '#FFFFFF' : '#9C9C9C',
                  iconColor:
                    isHoverUnitLain || !params.isUnitLaporanSendiri ? '#FFFFFF' : blueColorLib.main,
                  textColor:
                    isHoverUnitLain || !params.isUnitLaporanSendiri
                      ? neutralColorLib.white
                      : neutralColorLib.black,
                }"
                :options="optionsChildUnit"
                v-model="params.unitChild"
                identifier="id"
                text="name"
                searchable
                placeholder="Pilih Unit"
                v-bind="propsRequiredChildUnit"
                :is-loading="isLoading"
              ></AmSelectBox>
            </AmFormCol>
          </AmFormRow>
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
          v-model="params.periode"
          :is-loading="isLoading"
        ></AmMonthPicker>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
