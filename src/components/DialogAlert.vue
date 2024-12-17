<script setup>
import { AmDialog, AmButton } from 'amyun-ui-vue';
import AlertSuccess from '@/assets/icons/alert-success.vue';
import AlertError from '@/assets/icons/alert-error.vue';

defineOptions({
  name: 'DialogAlert',
});

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  summaryAlert: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['onClose']);
</script>

<template>
  <AmDialog :is-show="isShow" type="alert">
    <template #dialog-alert-image>
      <AlertSuccess v-if="summaryAlert.isSuccess"></AlertSuccess>
      <AlertError v-else></AlertError>
    </template>
    <template #dialog-alert-title>{{ summaryAlert.title }}</template>
    <template #dialog-alert-message>{{ summaryAlert.message }}</template>
    <template #dialog-alert-actions>
      <AmButton
        block
        size="lg"
        @click="
          () => {
            emits('onClose');
          }
        "
        >{{ summaryAlert.buttonText }}</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
