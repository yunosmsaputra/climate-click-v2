<script setup>
import {
  AmButton,
  AmCheckbox,
  AmDialog,
  AmForm,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmTextField,
} from 'amyun-ui-vue';
import TitleSection from '@/components/TitleSection.vue';
import PartialsFormInformasiUnit from '@/views/master/unit/partials/dialog-form/informasi-unit.vue';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'DialogFormMasterUnit',
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
  textSubmitForm: {
    type: String,
    default: '',
  },
  comboboxProvinsiList: {
    type: Array,
    default: () => [],
  },
  comboboxKotaList: {
    type: Array,
    default: () => [],
  },
  comboboxKecamatanList: {
    type: Array,
    default: () => [],
  },
  comboboxKelurahanList: {
    type: Array,
    default: () => [],
  },
  comboboxUnitList: {
    type: Array,
    default: () => [],
  },
  comboboxGridList: {
    type: Array,
    default: () => [],
  },
  comboboxRegionalList: {
    type: Array,
    default: () => [],
  },
  comboboxJenisPembangkitList: {
    type: Array,
    default: () => [],
  },
  comboboxTipeBoilerList: {
    type: Array,
    default: () => [],
  },
  refForm: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits([
  'onClose',
  'onSave',
  'update:params',
  'update:refForm',
]);
const refData = ref(null);

const handleClose = () => {
  emits('onClose');
};

onMounted(() => {
  emits('update:refForm', refData.value);
});
</script>

<template>
  <AmDialog
    :isShow="isShow"
    expandable
    @onClose="handleClose"
    width="60vw"
    contentPaddingReset
  >
    <template #dialog-title>
      <div class="text-lg font-semibold text-netral-label">
        {{ title }}
      </div>
    </template>
    <template #dialog-content>
      <div class="bg-netral-background">
        <AmForm ref="refData">
          <PartialsFormInformasiUnit
            :params="params"
            :combobox-provinsi-list="comboboxProvinsiList"
            :combobox-kota-list="comboboxKotaList"
            :combobox-kecamatan-list="comboboxKecamatanList"
            :combobox-kelurahan-list="comboboxKelurahanList"
            :combobox-unit-list="comboboxUnitList"
            :combobox-grid-list="comboboxGridList"
            :combobox-regional-list="comboboxRegionalList"
            :combobox-jenis-pembangkit-list="comboboxJenisPembangkitList"
            :combobox-tipe-boiler-list="comboboxTipeBoilerList"
          />
          <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
            <title-section>PIC Data</title-section>
            <AmFormRow class="mt-4 gap-4">
              <AmFormCol class="w-[240px]">
                <AmFormLabel size="medium" required>Nama & Jabatan</AmFormLabel>
                <div
                  class="text-xs leading-4 text-netral-textDisabled mt-[6px]"
                >
                  Nama & Jabatan PIC Data
                </div>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Nama PIC Data"
                  v-model="params.picDataName"
                ></AmTextField>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Jabatan PIC Data"
                  v-model="params.picDataPosition"
                ></AmTextField>
              </AmFormCol>
            </AmFormRow>
            <AmFormRow class="mt-4 gap-4">
              <AmFormCol class="w-[240px]">
                <AmFormLabel size="medium" required>Email & No HP</AmFormLabel>
                <div
                  class="text-xs leading-4 text-netral-textDisabled mt-[6px]"
                >
                  Email & No HP PIC Data
                </div>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Email"
                  v-model="params.picDataEmail"
                ></AmTextField>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Nomor HP"
                  v-model="params.picDataPhone"
                ></AmTextField>
              </AmFormCol>
            </AmFormRow>
            <AmFormRow class="mt-4 gap-4">
              <AmCheckbox v-model="params.isPicDataParent" v-if="params.parent"
                >PIC Data sama dengan PIC pada Unit
                {{ params.parent?.name }}</AmCheckbox
              >
            </AmFormRow>
          </div>
          <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white mt-2">
            <title-section>PIC Unit</title-section>
            <AmFormRow class="mt-4 gap-4">
              <AmFormCol class="w-[240px]">
                <AmFormLabel size="medium" required>Nama & Jabatan</AmFormLabel>
                <div
                  class="text-xs leading-4 text-netral-textDisabled mt-[6px]"
                >
                  Nama & Jabatan PIC Unit
                </div>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Nama PIC Unit"
                  v-model="params.picUnitName"
                ></AmTextField>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Jabatan PIC Unit"
                  v-model="params.picUnitPosition"
                ></AmTextField>
              </AmFormCol>
            </AmFormRow>
            <AmFormRow class="mt-4 gap-4">
              <AmFormCol class="w-[240px]">
                <AmFormLabel size="medium" required>Email & No HP</AmFormLabel>
                <div
                  class="text-xs leading-4 text-netral-textDisabled mt-[6px]"
                >
                  Email & No HP PIC Unit
                </div>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Email"
                  v-model="params.picUnitEmail"
                ></AmTextField>
              </AmFormCol>
              <AmFormCol class="w-[calc((100%-272px)/2)]">
                <AmTextField
                  size="medium"
                  placeholder="Nomor HP"
                  v-model="params.picUnitPhone"
                ></AmTextField>
              </AmFormCol>
            </AmFormRow>
            <AmFormRow class="mt-4 gap-4">
              <AmCheckbox v-model="params.isPicUnitParent" v-if="params.parent"
                >PIC Unit sama dengan PIC pada Data
                {{ params.parent?.name }}</AmCheckbox
              >
            </AmFormRow>
          </div>
        </AmForm>
      </div>
    </template>
    <template #dialog-actions>
      <AmButton type="ghost" @click="handleClose">Batalkan</AmButton>
      <AmButton
        @click="
          () => {
            emits('onSave');
          }
        "
        >{{ textSubmitForm }}</AmButton
      >
    </template>
  </AmDialog>
</template>

<style scoped></style>
