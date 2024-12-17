<script setup>
import { AmText } from 'amyun-ui-vue'
defineOptions({
  name: 'UnitListInline',
})

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <AmText class="flex gap-x-2 text-sm items-center z-[2]" :is-loading="true" v-if="list.length > 4">
    <div class="text-netral-label">{{ list[0] }}</div>
    <div class="text-netral-stroke">/</div>
    <div class="text-netral-label">{{ list[1] }}</div>
    <div class="text-netral-stroke">/</div>
    <div class="text-netral-label">...</div>
    <div class="text-netral-stroke">/</div>
    <div class="text-netral-label">{{ list[list.length - 1] }}</div>
  </AmText>
  <AmText v-else class="flex gap-x-2 items-center text-sm z-[2]" :is-loading="isLoading">
    <div v-for="(item, index) in list" :key="index" class="flex gap-x-2">
      <div class="text-netral-label">{{ item }}</div>
      <div class="text-netral-stroke" v-if="index < list.length - 1">/</div>
    </div>
  </AmText>
</template>

<style scoped></style>
