<script setup>
import {
  AmDialog,
  AmButton,
  AmForm,
  AmFormCol,
  AmFormRow,
  AmFormLabel,
  AmTextField,
  AmTextArea,
  AmSwitchButton,
} from 'amyun-ui-vue';

defineOptions({
  name: 'PageLaporanDialogForm',
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
  field: {
    type: Array,
    default: () => [],
  },
  params: {
    type: Object,
    default: {},
  },
});
const emits = defineEmits(['onClose', 'onSave']);
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
        <AmFormRow class="gap-x-4">
          <AmFormCol
            :style="{
              width: item.width,
            }"
            v-for="(item, index) in field"
            :key="index"
          >
            <AmFormLabel
              :required="item.is_mandatory"
              v-html="item.nama_tampil"
            ></AmFormLabel>
            <AmTextField
              :rules="
                item.is_mandatory
                  ? item.tipe_data === 'DOUBLE'
                    ? 'required|number'
                    : 'required'
                  : ''
              "
              :placeholder="item.placeholder"
              v-model="params[item.nama]"
              class="mt-1.5"
              v-if="item.tipe_data !== 'TEXT'"
            >
              <template #append-inner v-if="item.satuan">
                <div class="text-blue-main" v-html="item.satuan"></div>
              </template>
            </AmTextField>
            <AmTextArea
              :rules="item.is_mandatory ? 'required' : ''"
              :placeholder="item.placeholder"
              v-model="params[item.nama]"
              class="mt-1.5"
              v-if="item.tipe_data === 'TEXT'"
            ></AmTextArea>
          </AmFormCol>
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
        >Simpan Data</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
