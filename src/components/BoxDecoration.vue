<script setup>
import ImageDecorationBlue from '@/assets/icons/image-decoration-blue.vue';
import ImageDecorationGreen from '@/assets/icons/image-decoration-green.vue';

defineOptions({
  name: 'BoxDecoration',
});

const props = defineProps({
  color: {
    type: String,
    default: 'blue',
  },
  active: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  isInput: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="`w-full h-[96px] relative pt-3 ${isInput ? 'pb-4' : 'pb-6'} px-4 rounded-lg border border-solid ${active || hover ? (color === 'blue' ? 'bg-blue-surface border-blue-main' : color === 'green' ? 'bg-green-surface border-green-main' : 'bg-netral-white border-netral-stroke') : 'bg-netral-white border-netral-stroke'}`"
  >
    <div
      v-if="(active || hover) && color === 'blue'"
      class="absolute bottom-0 right-0"
    >
      <ImageDecorationBlue />
    </div>
    <div
      v-if="(active || hover) && color === 'green'"
      class="absolute bottom-0 right-0"
    >
      <ImageDecorationGreen />
    </div>
    <div class="z-2">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
