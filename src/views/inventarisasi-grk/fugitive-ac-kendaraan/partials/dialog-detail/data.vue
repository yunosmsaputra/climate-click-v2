<script setup>
import { AmTable } from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { h, ref } from 'vue'
import { konversiRibuan } from '@/utils/konversi.js'
import AlertHelp from '@/assets/icons/alert-help.vue'

defineOptions({
  name: 'DataFugitiveAcKendaraanDetail',
})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const columns = ref([
  {
    key: 'namaFaktorEmisi',
    title: 'Jenis Freon',
    sort: false,
    clickRow: true,
  },
  {
    key: 'penggunaan',
    title: 'Total Kapasitas AC Mobil / Berat Refrigerant (kg)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => konversiRibuan(data.penggunaan),
        }
      )
    },
  },
  {
    key: '',
    title: 'Emisi CO₂e (kCO₂e)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => konversiRibuan(data.emisiCo2e),
        }
      )
    },
  },
  {
    key: '',
    title: 'Emisi CO₂e (tCO₂e)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => konversiRibuan(data.emisiCo2e / 1000),
        }
      )
    },
  },
])
const isExpand = ref(true)
</script>

<template>
  <div class="bg-netral-white pt-[18px] pr-[18px] pb-6 pl-6">
    <title-section with-button-expand :is-expand="isExpand" @on-click-expand="isExpand = !isExpand"
      >Data SF6</title-section
    >
    <AmTable
      :columns="columns"
      :data="data.data_list"
      class="mt-4"
      :is-loading="isLoading"
      v-if="isExpand && data.data_list?.length > 0"
    >
      <template #footer>
        <tr>
          <td class="p-3 text-xs text-[#5979A6] font-semibold">Total</td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.penggunaan), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisiCo2e), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisiCo2e) / 100, 0)
              )
            }}
          </td>
        </tr>
      </template>
    </AmTable>
    <div
      v-else-if="isExpand && data.data_list?.length === 0"
      class="border border-solid border-netral-divider rounded-lg py-4"
    >
      <div class="flex justify-center">
        <alert-help />
      </div>
      <div class="text-center text-base text-netral-black font-semibold mt-2">
        Data Laporan Belum Tersedia
      </div>
      <div class="text-center text-sm text-netral-black mt-2">
        Silahkan menambahkan data laporan terlebih dahulu
      </div>
    </div>
  </div>
</template>

<style scoped></style>
