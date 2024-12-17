<script setup>
import {
  AmCheckbox,
  AmFormCol,
  AmFormLabel,
  AmFormRow,
  AmSelectBox,
  AmSwitchButton,
  AmTextArea,
  AmTextField,
} from 'amyun-ui-vue';
import TitleSection from '@/components/TitleSection.vue';
import PartialsFormIsUnitMachine from '@/views/master/unit/partials/dialog-form/section-unit-machine.vue';

defineOptions({
  name: 'PartialsFormInformasiUnit',
});

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
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
});
</script>

<template>
  <div class="pt-[18px] pr-[18px] pb-6 pl-6 bg-netral-white">
    <title-section>Informasi Unit</title-section>
    <AmFormRow class="mt-4 gap-4 items-center">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required>Kode Unit</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi mengenai kode unit
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmTextField
          size="medium"
          placeholder="Kode Unit"
          v-model="params.code"
        ></AmTextField>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmCheckbox v-model="params.isSilm"
          >Kode Unit Merupakan Kode SILM</AmCheckbox
        >
      </AmFormCol>
    </AmFormRow>
    <AmFormRow class="mt-4 gap-4">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required>Unit</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Parent unit adalah unit diatas unit yang dimasukkan
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmTextField
          size="medium"
          placeholder="Nama Unit"
          v-model="params.name"
        ></AmTextField>
        <AmCheckbox class="mt-2" v-model="params.isUnitMachine"
          >Unit yang dimasukkan adalah Unit Mesin</AmCheckbox
        >
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmSelectBox
          size="medium"
          placeholder="Pilih Parent Unit"
          v-model="params.parent"
          :options="comboboxUnitList"
          identifier="id"
          text="name"
          searchable
          placeholder-search="Cari Unit"
        ></AmSelectBox>
      </AmFormCol>
    </AmFormRow>
    <AmFormRow class="mt-4 gap-4">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required>Level Organisasi Unit</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Semakin rendah level unit, semakin tinggi kedudukannya
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <div class="text-base text-netral-black font-semibold leading-6">
          Level {{ params.level ?? 0 }}
        </div>
      </AmFormCol>
    </AmFormRow>
    <AmFormRow class="mt-4 gap-4" v-if="params.parent && !params.isUnitMachine">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required>Regional & Grid</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi regional & grid / sistem unit
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmSelectBox
          size="medium"
          placeholder="Pilih Regional"
          v-model="params.regional"
          :options="comboboxRegionalList"
          identifier="id"
          text="nama"
          searchable
          placeholder-search="Cari Regional"
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
    <partials-form-is-unit-machine
      :params="params"
      v-if="params.isUnitMachine"
      :combobox-jenis-pembangkit-list="comboboxJenisPembangkitList"
      :combobox-grid-list="comboboxGridList"
      :combobox-tipe-boiler-list="comboboxTipeBoilerList"
    />
    <AmFormRow class="mt-4 gap-4">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required>Alamat Unit</AmFormLabel>
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi alamat lengkap, provinsi, kota, kecamatan, desa/kelurahan, kode
          pos, dan nomor telepon unit
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc(100%-256px)]">
        <AmTextArea
          rows="3"
          size="medium"
          placeholder="Alamat Lengkap"
          v-model="params.address"
        ></AmTextArea>
      </AmFormCol>
      <AmFormCol class="w-[240px]"> </AmFormCol>
      <AmFormCol class="w-[calc((100%-304px)/4)]">
        <AmSelectBox
          size="medium"
          placeholder="Pilih Provinsi"
          v-model="params.provinsi"
          :options="comboboxProvinsiList"
          identifier="id"
          text="nama"
          searchable
          placeholder-search="Cari Provinsi"
        ></AmSelectBox>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-304px)/4)]">
        <AmSelectBox
          size="medium"
          v-model="params.kota"
          placeholder="Pilih Kota / Kabupaten"
          :options="comboboxKotaList"
          identifier="id"
          text="nama"
          searchable
          placeholder-search="Cari Kota"
        ></AmSelectBox>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-304px)/4)]">
        <AmSelectBox
          size="medium"
          placeholder="Pilih Kecamatan"
          v-model="params.kecamatan"
          :options="comboboxKecamatanList"
          identifier="id"
          text="nama"
          searchable
          placeholder-search="Cari Kecamatan"
        ></AmSelectBox>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-304px)/4)]">
        <AmSelectBox
          size="medium"
          placeholder="Pilih Desa / Kelurahan"
          v-model="params.kelurahan"
          :options="comboboxKelurahanList"
          identifier="id"
          text="nama"
          searchable
          placeholder-search="Cari Kelurahan"
        ></AmSelectBox>
      </AmFormCol>
      <AmFormCol class="w-[240px]"> </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmTextField
          size="medium"
          placeholder="Kode Pos"
          v-model="params.postcode"
        />
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmTextField
          size="medium"
          placeholder="No. Telepon"
          v-model="params.phone"
        />
      </AmFormCol>
    </AmFormRow>
    <AmFormRow class="mt-4 gap-4">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required
          >Titik Lokasi (Geo Location)</AmFormLabel
        >
        <div class="text-xs leading-4 text-netral-textDisabled mt-[6px]">
          Berisi Lattitude dan Longitude
        </div>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmTextField
          size="medium"
          placeholder="Lattitude"
          v-model="params.latitude"
        ></AmTextField>
      </AmFormCol>
      <AmFormCol class="w-[calc((100%-272px)/2)]">
        <AmTextField
          size="medium"
          placeholder="Longitude"
          v-model="params.longitude"
        ></AmTextField>
      </AmFormCol>
    </AmFormRow>
    <AmFormRow class="mt-4 gap-4 items-center">
      <AmFormCol class="w-[240px]">
        <AmFormLabel size="medium" required>Status</AmFormLabel>
      </AmFormCol>
      <AmFormCol class="w-[calc(100%-256px)]">
        <AmSwitchButton v-model="params.isActive">{{
          params.isActive ? 'Aktif' : 'Nonaktif'
        }}</AmSwitchButton>
      </AmFormCol>
    </AmFormRow>
  </div>
</template>

<style scoped></style>
