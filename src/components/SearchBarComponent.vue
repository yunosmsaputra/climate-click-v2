<script setup>
import { AmSearchBar } from 'amyun-ui-vue';

defineOptions({
  name: 'SearchBarComponent',
});

const props = defineProps({
  summarySearch: {
    type: Object,
    default: () => ({}),
  },
  popupWidth: {
    type: String,
    default: '140px',
  },
});
const emits = defineEmits(['onSelectedIndexSearch', 'onSearch']);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-x-2">
      <AmSearchBar
        :placeholder="summarySearch.placeholder"
        :list-search="summarySearch.listSearch"
        :popup-width="popupWidth"
        @on-select-list="
          (value) => {
            emits('onSelectedIndexSearch', value);
          }
        "
        @on-search="
          (value) => {
            emits('onSearch', value);
          }
        "
      ></AmSearchBar>
      <slot name="additional"></slot>
    </div>
    <slot name="additional-right"></slot>
  </div>
</template>

<style scoped></style>
