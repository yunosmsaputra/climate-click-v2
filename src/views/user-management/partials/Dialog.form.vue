<script setup>
import {
  AmDialog,
  AmButton,
  AmForm,
  AmSelectBox,
  AmFormRow,
  AmFormLabel,
  AmTextField,
  AmTextArea,
  AmSwitchButton,
} from 'amyun-ui-vue';

defineOptions({
  name: 'UserManagementDialogForm',
});

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  params: {
    type: Object,
    default: {},
  },
  comboboxUnitList: {
    type: Array,
    default: () => [],
  },
  textSubmit: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['onClose', 'onSave', 'onChangeParent']);
</script>

<template>
  <AmDialog
    :is-show="isShow"
    @on-close="
      () => {
        emits('onClose');
      }
    "
    expandable
    width="40vw"
  >
    <template #dialog-title>{{ title }}</template>
    <template #dialog-content>
      <AmForm>
        <AmFormRow>
          <AmFormLabel required>Nama User</AmFormLabel>
          <AmTextField
            rules="'required'"
            placeholder="Contoh: John Doe"
            v-model="params.nama"
            class="mt-1.5"
          ></AmTextField>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel>UserName</AmFormLabel>
          <AmTextField
            rules="'required'"
            placeholder="Contoh: john.doe"
            v-model="params.username"
            class="mt-1.5"
          ></AmTextField>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel required>Email</AmFormLabel>
          <AmTextField
            rules="'required'"
            placeholder="Contoh: john.doe"
            v-model="params.email"
            class="mt-1.5"
          ></AmTextField>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel optional>Unit</AmFormLabel>
          <AmSelectBox
            size="medium"
            placeholder="Pilih Unit"
            v-model="params.unit"
            :options="comboboxUnitList"
            identifier="id"
            text="name"
            searchable
            placeholder-search="Cari Unit"
          ></AmSelectBox>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel optional class="mt-4">Role</AmFormLabel>
          <AmSelectBox
            size="medium"
            placeholder="Pilih Role"
            v-model="params.role"
            :options="comboboxUnitList"
            identifier="id"
            text="name"
            searchable
            placeholder-search="Cari Unit"
          ></AmSelectBox>
        </AmFormRow>
        <AmFormRow class="mt-4">
          <AmFormLabel>Status</AmFormLabel>
          <AmSwitchButton class="w-full mt-1.5" v-model="params.is_active">{{
            params.is_active ? 'Aktif' : 'Nonaktif'
          }}</AmSwitchButton>
        </AmFormRow>
      </AmForm>
    </template>
    <template #dialog-actions>
      <AmButton type="ghost" @click="emits('onClose')">Batalkan</AmButton>
      <AmButton
        @click="
          () => {
            emits('onSave');
          }
        "
        >{{ textSubmit }}</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
