<script setup>
import { AmDialog, AmButton } from 'amyun-ui-vue'

defineOptions({
  name: 'DialogConfirmation',
})

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  summaryConfirmation: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: String,
    default: '480px',
  },
  disableSubmit: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['onClose', 'onSubmit'])
</script>

<template>
  <AmDialog
    :is-show="isShow"
    @on-close="
      () => {
        emits('onClose')
      }
    "
    type="confirmation"
    :width="width"
  >
    <template #dialog-title>{{ summaryConfirmation.title }}</template>
    <template #dialog-content>
      <div class="text-sm text-netral-black" v-html="summaryConfirmation.message"></div>
      <slot name="additional-content"></slot>
    </template>
    <template #dialog-actions>
      <AmButton
        type="ghost"
        @click="
          () => {
            emits('onClose')
          }
        "
        >{{ summaryConfirmation.textCancel }}</AmButton
      >
      <AmButton
        :color="summaryConfirmation.submitColor"
        @click="
          () => {
            emits('onSubmit')
          }
        "
        :disabled="disableSubmit"
        :is-loading="isLoading"
        >{{ summaryConfirmation.textSubmit }}</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
