<script setup>
import { AmDialog, AmFormLabel, AmStatus } from 'amyun-ui-vue';
import { greenColorLib, redColorLib } from '@/utils/constant.js';
defineOptions({
  name: 'UserManagementDialogDetail',
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isShow: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['onClose', 'onEdit']);
</script>
<template>
  <AmDialog
    :is-show="isShow"
    @on-close="
      () => {
        emits('onClose');
      }
    "
    with-edit
    expandable
    width="40vw"
    @on-edit="
      () => {
        emits('onEdit', data);
      }
    "
  >
    <template #dialog-title>Lihat Data User</template>
    <template #dialog-content>
      <div class="flex flex-wrap items-center gap-x-[6px] gap-y-3">
        <div class="w-[180px]">
          <AmFormLabel size="medium">Nama User</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">{{ data.nama }}</div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">UserName</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">{{ data.username }}</div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Email</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">{{ data.email }}</div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Unit Level</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">{{ data.unitLevel ?? '-' }}</div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Unit</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">{{ data.perusahaan?.nama }}</div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Role User</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">
          {{ data.roles?.length > 0 ? data.roles[0].nama : '' }}
        </div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Tipe User</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)] font-semibold">
          {{ data.is_user_sso ? 'User SSO' : 'User Non-SSO' }}
        </div>
        <div class="w-[180px]">
          <AmFormLabel size="medium">Status</AmFormLabel>
        </div>
        <div class="w-[calc(100%-186px)]">
          <AmStatus :color="greenColorLib.main" class="font-semibold">{{
            data.is_active ? 'Aktif' : 'Nonaktif'
          }}</AmStatus>
        </div>
      </div>
    </template>
  </AmDialog>
</template>

<style scoped></style>
