<script setup>
defineProps({
  isTab: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="`${isTab ? '' : 'px-3 pb-8 pt-3 bg-netral-background'} h-[calc(100vh-105px)] overflow-y-auto`"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
