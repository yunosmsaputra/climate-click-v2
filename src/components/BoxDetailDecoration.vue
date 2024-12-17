<script setup>
import ImageDecorationBlue from '@/assets/icons/image-decoration-blue.vue';
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white relative">
    <slot></slot>
    <div class="absolute bottom-0 right-0">
      <ImageDecorationBlue />
    </div>
  </div>
</template>

<style scoped></style>
