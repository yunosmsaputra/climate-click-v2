<script setup>
import { AmDialog, AmStatus } from 'amyun-ui-vue';
import HeaderInformationDialog from '@/components/HeaderInformationDialog.vue';
import DetailExpandCollapse from '@/components/DetailExpandCollapse.vue';
import TitleSection from '@/components/TitleSection.vue';
import { greenColorLib, redColorLib } from '@/utils/constant.js';

defineOptions({
  name: 'DialogDetailMasterUnit',
});

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(['onClose', 'onEdit']);

const handleClose = () => {
  emits('onClose');
};
const handleEdit = () => {
  emits('onEdit');
};
</script>

<template>
  <AmDialog
    :isShow="isShow"
    @onClose="handleClose"
    expandable
    width="1124px"
    contentPaddingReset
    withEdit
    @onEdit="handleEdit"
  >
    <template #dialog-title>
      <div class="text-lg font-semibold text-netral-label">
        Lihat Detail Unit
      </div>
    </template>
    <template #dialog-content>
      <div class="bg-netral-background">
        <HeaderInformationDialog>
          <div class="flex gap-2 items-center text-sm leading-5">
            <div class="flex gap-[6px] items-center">
              <div class="text-netral-label">Kode Unit</div>
              <div class="text-blue-main font-semibold">{{ data.code }}</div>
            </div>
            <div class="text-netral-stroke">/</div>
            <div class="flex gap-[6px] items-center">
              <div class="text-netral-label">Kode Dari SILM</div>
              <div class="text-netral-black font-semibold">
                {{ data.isSilm ? 'Data Dari SILM' : 'Bukan Data SILM' }}
              </div>
            </div>
            <div class="text-netral-stroke">/</div>
            <div class="flex gap-[6px] items-center">
              <div class="text-netral-label">Level Unit</div>
              <div class="text-netral-black font-semibold">
                {{ data.level }}
              </div>
            </div>
            <div class="text-netral-stroke">/</div>
            <div class="flex gap-[6px] items-center">
              <div class="text-netral-label">Status</div>
              <AmStatus
                :color="data.isActive ? greenColorLib.main : redColorLib.main"
              >
                <div class="font-semibold">
                  {{ data.isActive ? 'Aktif' : 'Nonaktif' }}
                </div>
              </AmStatus>
            </div>
          </div>
          <div class="mt-4 text-xl font-bold text-netral-black uppercase">
            {{ data.name }}
          </div>
          <div class="flex gap-1.5 mt-2 text-sm leading-5">
            <div class="text-netral-label">Parent Unit</div>
            <div
              :class="
                data.namaUnitParent
                  ? 'text-netral-black font-semibold'
                  : 'text-netral-textField'
              "
            >
              {{ data.namaUnitParent ?? 'Tidak ada parent unit' }}
            </div>
          </div>
        </HeaderInformationDialog>
        <DetailExpandCollapse
          title-collapse="Informasi Unit"
          title-expand="Informasi Unit"
          is-expand
          class="mt-2"
        >
          <div class="flex gap-x-[6px] gap-y-2 items-start flex-wrap">
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
              v-if="data.nameRegional"
            >
              Regional
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
              v-if="data.nameRegional"
            >
              {{ data.nameRegional }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
              v-if="data.nameGrid"
            >
              Grid / Sistem
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
              v-if="data.nameGrid"
            >
              {{ data.nameGrid }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              Alamat Unit
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.address }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label flex gap-x-2 font-semibold"
            >
              <div>Provinsi</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>Kota / Kabupaten</div>
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black flex gap-x-2"
            >
              <div>{{ data.provinsi?.nama }}</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>{{ data.kota?.nama }}</div>
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label flex gap-x-2 font-semibold"
            >
              <div>Kecamatan</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>Desa / Kelurahan</div>
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black flex gap-x-2"
            >
              <div>{{ data.kecamatan?.nama }}</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>{{ data.kelurahan?.nama }}</div>
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              Kode Pos
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.postcode }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              No. Telepon
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.phone }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label flex gap-x-2 font-semibold"
            >
              <div>Latitude</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>Longitude</div>
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black flex gap-x-2"
            >
              <div>{{ data.latitude }}</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>{{ data.longitude }}</div>
              <div class="text-blue-main cursor-pointer">Lihat Peta</div>
            </div>
          </div>
        </DetailExpandCollapse>
        <DetailExpandCollapse
          title-expand="PIC Data"
          title-collapse="PIC Data & Unit"
          is-expand
          class="mt-2"
        >
          <div class="flex gap-x-[6px] gap-y-2 items-start flex-wrap">
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              Nama
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.picDataName }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              Jabatan
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.picDataPosition }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label flex gap-x-2 font-semibold"
            >
              <div>Email</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>No. HP</div>
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black flex gap-x-2"
            >
              <div>{{ data.picDataEmail }}</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>{{ data.picDataPhone }}</div>
            </div>
          </div>
          <TitleSection class="mt-8">PIC Unit</TitleSection>
          <div class="flex gap-x-[6px] gap-y-2 items-start flex-wrap mt-4">
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              Nama
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.picUnitName }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label font-semibold"
            >
              Jabatan
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black"
            >
              {{ data.picUnitPosition }}
            </div>
            <div
              class="w-[240px] text-sm leading-5 text-netral-label flex gap-x-2 font-semibold"
            >
              <div>Email</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>No. HP</div>
            </div>
            <div
              class="w-[calc(100%-246px)] text-sm leading-5 text-netral-black flex gap-x-2"
            >
              <div>{{ data.picUnitEmail }}</div>
              <div class="text-netral-stroke font-normal">/</div>
              <div>{{ data.picUnitPhone }}</div>
            </div>
          </div>
        </DetailExpandCollapse>
      </div>
    </template>
  </AmDialog>
</template>

<style scoped></style>
