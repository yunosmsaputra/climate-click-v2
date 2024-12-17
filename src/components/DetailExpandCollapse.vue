<script setup>
import TitleSection from '@/components/TitleSection.vue';
import { onMounted, ref } from 'vue';
import { AmIcon } from 'amyun-ui-vue';
import { blueColorLib } from '@/utils/constant.js';

defineOptions({
  name: 'DetailExpandCollapse',
});

const props = defineProps({
  titleExpand: {
    type: String,
    default: '',
  },
  titleCollapse: {
    type: String,
    default: '',
  },
  isExpand: {
    type: Boolean,
    default: false,
  },
});
const isExpand = ref(false);

onMounted(() => {
  isExpand.value = props.isExpand;
});
</script>

<template>
  <div class="bg-netral-white pt-[18px] pr-[18px] pb-6 pl-6">
    <div
      :class="`flex justify-between items-center select-none cursor-pointer${isExpand ? ' mb-4' : ''}`"
      @click="isExpand = !isExpand"
    >
      <TitleSection>{{
        isExpand ? props.titleExpand : props.titleCollapse
      }}</TitleSection>
      <div
        class="rounded-lg w-6 h-6 bg-blue-surface flex items-center justify-center"
      >
        <AmIcon
          :name="isExpand ? 'chevron-up' : 'chevron-down'"
          :size="16"
          :color="blueColorLib.main"
        ></AmIcon>
      </div>
    </div>
    <div v-if="isExpand">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
