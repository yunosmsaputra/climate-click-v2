<script setup>
import { AmTable } from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { h, ref } from 'vue'
import { konversiRibuan } from '@/utils/konversi.js'

defineOptions({
  name: 'DataAparDetail',
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
    key: 'nama_faktor_emisi',
    title: 'Jenis Gas',
    sort: false,
    clickRow: true,
  },
  {
    key: 'penyimpanan_apar_fixed',
    title: 'Penyimpanan APAR - Fixed (kgCO2)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => konversiRibuan(data.penyimpanan_apar_fixed),
        }
      )
    },
  },
  {
    key: 'penyimpanan_apar_portable',
    title: 'Penyimpanan APAR - Portable (kgCO₂)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.penyimpanan_apar_portable ? konversiRibuan(data.penyimpanan_apar_portable) : '-'),
        }
      )
    },
  },
  {
    key: 'penggunaan_apar',
    title: 'Penggunaan APAR (kgCO₂)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.penggunaan_apar ? konversiRibuan(data.penggunaan_apar) : '-'),
        }
      )
    },
  },
  {
    key: 'emisi_co2',
    title: 'Emisi CO₂ (kCO₂e)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.emisi_co2 ? konversiRibuan(data.emisi_co2) : '-'),
        }
      )
    },
  },
  {
    key: 'emisi_co2e',
    title: 'Emisi CO₂e (kCO₂e)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.emisi_co2e ? konversiRibuan(data.emisi_co2e) : '-'),
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
      >Data Fugitive Apar</title-section
    >
    <AmTable
      :columns="columns"
      :data="data.data_list"
      class="mt-4"
      :is-loading="isLoading"
      v-if="isExpand"
    >
      <template #footer>
        <tr>
          <td class="p-3 text-xs text-[#5979A6] font-semibold">Total</td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.penyimpanan_apar_fixed), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.penyimpanan_apar_portable), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.penggunaan_apar), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_co2), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_co2e), 0)
              )
            }}
          </td>
        </tr>
      </template>
    </AmTable>
  </div>
</template>

<style scoped></style>
