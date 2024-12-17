<script setup>
import {
  AmCheckbox,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmSwitchButton,
  AmTextField,
  AmDatePicker,
  AmSelectBox,
} from 'amyun-ui-vue';
import { ref } from 'vue';

defineOptions({
  name: 'PartialsFormIsUnitMachine',
});

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
  comboboxGridList: {
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
});

const isFuel = ref(false);
const isOther = ref(false);
const mulutTambangOptions = ref([
  {
    id: true,
    nama: 'Ya',
  },
  {
    id: false,
    nama: 'Tidak',
  },
]);
const bendunganOptions = ref([
  {
    value: true,
    label: 'Bendungan telah tersedia sebelum pembangunan PLTA',
  },
  {
    value: false,
    label: 'Bendungan dibangun untuk kebutuhan PLTA',
  },
]);
</script>

<template>
  <AmFormRow class="mt-4 gap-4">
    <AmFormCol class="w-[240px]">
      <AmFormLabel size="medium" required>Jenis Pembangkit & Grid</AmFormLabel>
      <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
        Berisi jenis pembangkit & grid / sistem unit
      </div>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmSelectBox
        size="medium"
        placeholder="Pilih Jenis Pembangkit"
        v-model="params.jenisPembangkit"
        :options="comboboxJenisPembangkitList"
        identifier="id"
        text="nama"
        searchable
        placeholder-search="Cari Jenis Pembangkit"
      ></AmSelectBox>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmSelectBox
        size="medium"
        placeholder="Pilih Grid"
        v-model="params.grid"
        :options="comboboxGridList"
        identifier="id"
        text="nama"
        searchable
        placeholder-search="Cari Grid"
      ></AmSelectBox>
    </AmFormCol>
  </AmFormRow>
  <AmFormRow class="mt-4 gap-4">
    <AmFormCol class="w-[240px]">
      <AmFormLabel size="medium" required
        >Cod & Kapasitas Terpasang</AmFormLabel
      >
      <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
        Commercial of Date & Kapasitas terpasang unit mesin
      </div>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmDatePicker
        size="medium"
        v-model="params.dateOperationCommercial"
      ></AmDatePicker>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmTextField
        v-model="params.installedCapacity"
        placeholder="Kapasitas Terpasang"
        size="medium"
      >
        <template #append-inner>
          <div class="text-xs text-blue-main">MW</div>
        </template>
      </AmTextField>
    </AmFormCol>
  </AmFormRow>
  <AmFormRow
    class="mt-4 gap-4"
    v-if="
      params.jenisPembangkit &&
      params.jenisPembangkit.nama.toLowerCase().includes('pltu - batubara')
    "
  >
    <AmFormCol class="w-[240px]">
      <AmFormLabel size="medium" required>Boiler & Mulut Tambang</AmFormLabel>
      <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
        Tipe Boiler & Apakah pembangkit mulut tambang atau tidak
      </div>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmSelectBox
        size="medium"
        placeholder="Pilih Tipe Boiler"
        v-model="params.tipeBoiler"
        :options="comboboxTipeBoilerList"
        identifier="id"
        text="nama"
        searchable
        placeholder-search="Cari Tipe Boiler"
      ></AmSelectBox>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmSelectBox
        size="medium"
        placeholder="Apakah Pembangkit Mulut Tambang"
        v-model="params.isMulutTambang"
        :options="mulutTambangOptions"
        identifier="id"
        text="nama"
      ></AmSelectBox>
    </AmFormCol>
  </AmFormRow>
  <AmFormRow
    class="mt-4 gap-4"
    v-if="
      params.jenisPembangkit &&
      params.jenisPembangkit.nama.toLowerCase().includes('plta waduk')
    "
  >
    <AmFormCol class="w-[240px]">
      <AmFormLabel size="medium" required>Bendungan & Luas Waduk</AmFormLabel>
      <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
        Status bendungan & luas waduk setelah pelaksanaan
      </div>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmSelectBox
        size="medium"
        placeholder="Status Bendungan"
        v-model="params.isBendungan"
        :options="bendunganOptions"
        identifier="value"
        text="label"
      ></AmSelectBox>
    </AmFormCol>
    <AmFormCol class="w-[calc((100%-272px)/2)]">
      <AmTextField
        v-model="params.reservoirArea"
        placeholder="Luas Waduk Setelah Pelaksanaan"
        size="medium"
      >
        <template #append-inner>
          <div class="text-blue-main">m<sup>2</sup></div>
        </template>
      </AmTextField>
    </AmFormCol>
  </AmFormRow>
  <AmFormRow class="mt-4 gap-4">
    <AmFormCol class="w-[240px]">
      <AmFormLabel size="medium" required
        >Instalasi Pengendalian Pencemaran Udara</AmFormLabel
      >
    </AmFormCol>
    <AmFormCol class="w-[calc(100%-256px)]">
      <AmSwitchButton v-model="params.isIppu"
        >Ada Instalasi pengendalian pencemaran udara (IPPU)</AmSwitchButton
      >
      <AmFormRow class="flex gap-4 mt-4" v-if="params.isIppu">
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox
            v-model="params.listIppu"
            value="Electrostatic Precipipittaor (ESP)"
            >Electrostatic Precipipittaor (ESP)</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox
            v-model="params.listIppu"
            value="Fabric Filter (FF) / Baghouse Filter"
            >Fabric Filter (FF) / Baghouse Filter
          </AmCheckbox>
        </AmFormCol>
      </AmFormRow>
      <AmFormRow class="flex gap-4 mt-4" v-if="params.isIppu">
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="params.listIppu" value="Limestone Injection"
            >Limestone Injection</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="params.listIppu" value="Low NOx Burner"
            >Low NOx Burner</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox
            v-model="params.listIppu"
            value="Selective Catalyc Reduction"
            >Selective Catalyc Reduction</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox
            v-model="params.listIppu"
            value="Selective Non-Catalyc Reduction"
            >Selective Non-Catalyc Reduction</AmCheckbox
          >
        </AmFormCol>
      </AmFormRow>
      <AmFormRow class="flex gap-4 mt-4" v-if="params.isIppu">
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="isFuel">Fuel Gas Desulphuraztion</AmCheckbox>
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]" v-if="isFuel">
          <AmCheckbox v-model="params.listIppu" value="Low NOx Burner"
            >Low NOx Burner</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]" v-if="isFuel">
          <AmCheckbox
            v-model="params.listIppu"
            value="Selective Catalyc Reduction"
            >Selective Catalyc Reduction</AmCheckbox
          >
        </AmFormCol>
      </AmFormRow>
      <AmFormRow class="flex gap-4 mt-4" v-if="params.isIppu">
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="isOther">Lainnya</AmCheckbox>
        </AmFormCol>
      </AmFormRow>
      <AmFormRow class="flex gap-4 mt-4" v-if="params.isIppu && isOther">
        <AmFormCol class="w-[calc(50%-8px)]">
          <AmTextField
            v-model="params.lainnya"
            size="medium"
            placeholder="Instalasi Pengendailan Pencemaran Udara"
          ></AmTextField>
        </AmFormCol>
      </AmFormRow>
    </AmFormCol>
  </AmFormRow>
  <AmFormRow class="mt-4 gap-4">
    <AmFormCol class="w-[240px]">
      <AmFormLabel size="medium"
        >Informasi Perusahaan Pengendalian Pencemaran Udara</AmFormLabel
      >
    </AmFormCol>
    <AmFormCol class="w-[calc(100%-256px)]">
      <AmFormRow class="flex gap-4">
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="params.listPppu" value="ISO 50001"
            >ISO 50001</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="params.listPppu" value="ISO 9001"
            >ISO 9001</AmCheckbox
          >
        </AmFormCol>
        <AmFormCol class="w-[calc(25%-12px)]">
          <AmCheckbox v-model="params.listPppu" value="OHSAS 18001"
            >OHSAS 18001</AmCheckbox
          >
        </AmFormCol>
      </AmFormRow>
    </AmFormCol>
  </AmFormRow>
</template>

<style scoped></style>
