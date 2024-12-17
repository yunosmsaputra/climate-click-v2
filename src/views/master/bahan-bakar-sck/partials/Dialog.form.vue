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
  name: 'MasterBahanBakarSckDialogForm',
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
  listBahanBakar: {
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
          <AmFormLabel required>Nama Bahan Bakar</AmFormLabel>
          <AmTextField
            rules="'required'"
            placeholder="Contoh: Batubara"
            v-model="params.nama"
            class="mt-1.5"
          ></AmTextField>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel>Parent Bahan Bakar</AmFormLabel>
          <AmSelectBox
            class="mt-1.5"
            :options="listBahanBakar"
            identifier="id"
            text="nama"
            v-model="params.parent"
            placeholder="Pilih Parent Bahan Bakar"
          ></AmSelectBox>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel required class="mt-4">Tingkat Bahan Bakar</AmFormLabel>
          <div class="w-full text-base text-netral-black font-semibold mt-1.5">
            Level {{ params.parent ? params.parent.level + 1 : '0' }}
          </div>
        </AmFormRow>
        <AmFormRow>
          <AmFormLabel optional class="mt-4">Keterangan</AmFormLabel>
          <AmTextArea
            v-model="params.keterangan"
            placeholder="Contoh: Merupakan data klasifikasi bahan bakar"
            class="mt-1.5"
          ></AmTextArea>
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
