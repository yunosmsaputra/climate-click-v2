<script setup>
defineOptions({
  name: 'HistoryData',
})

const props = defineProps({
  divider: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flex gap-x-3">
    <div class="w-[88px] text-sm text-netral-textField">
      <div>
        <slot name="date"></slot>
      </div>
      <div class="mt-1">
        <slot name="time"></slot>
      </div>
    </div>
    <div class="w-[22px] h-[22px] bg-blue-main border-[6px] rounded-[50%] z-[2]"></div>
    <div
      :class="`${divider ? 'w-[calc(100%-110px)] -ml-6 border-l border-solid border-l-netral-divider pl-6' : 'w-[calc(100%-134px)]'} pb-4`"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped></style>
