<script setup>
import { AmIcon } from 'amyun-ui-vue';
import { neutralColorLib } from '@/utils/constant.js';
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  withBackButton: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['onBack']);
</script>

<template>
  <div class="w-full bg-white py-3 pl-6 pr-4 flex justify-between items-center">
    <div class="flex items-center gap-x-3">
      <div
        v-if="withBackButton"
        class="w-[30px] h-8 bg-blue-main rounded-md flex items-center justify-center"
        @click="
          () => {
            emits('onBack');
          }
        "
      >
        <AmIcon
          name="chevron-left"
          :size="10"
          :color="neutralColorLib.white"
        ></AmIcon>
      </div>
      <div class="font-bold text-netral-black text-xl">{{ props.title }}</div>
    </div>
    <div v-if="$slots.action" class="flex gap-x-2">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style scoped></style>
