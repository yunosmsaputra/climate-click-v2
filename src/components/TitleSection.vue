<script setup>
import { blueColorLib } from '@/utils/constant.js'
import { AmIcon } from 'amyun-ui-vue'

const props = defineProps({
  withButtonExpand: {
    type: Boolean,
    default: false,
  },
  isExpand: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['onClickExpand'])
</script>

<template>
  <div
    class="flex justify-between items-center select-none cursor-pointer"
    @click="
      () => {
        emits('onClickExpand')
      }
    "
  >
    <div class="flex items-center gap-1.5">
      <div class="w-[6px] h-7 bg-blue-main rounded-[100px]"></div>
      <div class="text-lg font-semibold text-netral-black leading-7">
        <slot></slot>
      </div>
    </div>
    <div
      v-if="withButtonExpand"
      class="bg-blue-surface rounded-lg w-6 h-6 flex items-center justify-center"
    >
      <AmIcon
        :name="isExpand ? 'chevron-up' : 'chevron-down'"
        :size="16"
        :color="blueColorLib.main"
      ></AmIcon>
    </div>
  </div>
</template>

<style scoped></style>
