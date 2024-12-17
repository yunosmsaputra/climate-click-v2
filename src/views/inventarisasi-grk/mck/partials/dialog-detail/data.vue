<script setup>
import { AmTable } from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { h, ref } from 'vue'
import { konversiRibuan } from '@/utils/konversi.js'

defineOptions({
  name: 'DataFugitiveAcRuanganDetail',
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
    key: 'status_kepemilikan',
    title: 'Status Milik',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () =>
            data.status_kepemilikan == 'MILIK_PLN_GROUP' ? 'Milik PLN Group' : 'Sewa',
        }
      )
    },
  },
  {
    key: 'nama_faktor_emisi',
    title: 'Bahan Bakar',
    sort: false,
    clickRow: true,
  },
  {
    key: 'konsumsi_bb',
    title: 'Konsumsi (liter)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => konversiRibuan(data.konsumsi_bb),
        }
      )
    },
  },
  {
    key: 'emisi_co2',
    title: 'Emisi CO<sub>2</sub> (tCO<sub>2</sub>)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.emisi_co2 ? konversiRibuan(data.emisi_co2 / 1000) : '-'),
        }
      )
    },
  },
  {
    key: 'emisi_n2o',
    title: 'Emisi N<sub>2</sub>O (tN<sub>2</sub>O)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.emisi_n2o ? konversiRibuan(data.emisi_n2o / 1000) : '-'),
        }
      )
    },
  },
  {
    key: 'emisi_ch4',
    title: 'Emisi CH<sub>4</sub> (tCH<sub>4</sub>)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.emisi_ch4 ? konversiRibuan(data.emisi_ch4 / 1000) : '-'),
        }
      )
    },
  },
  {
    key: 'emisi_co2e',
    title: 'Emisi CO<sub>2</sub>e (tCO<sub>2</sub>e)',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.emisi_co2e ? konversiRibuan(data.emisi_co2e / 1000) : '-'),
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
      >Data Bahan Bakar Kendaraan</title-section
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
          <td class="p-3 text-xs text-[#5979A6] font-semibold" colspan="2">Total</td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.konsumsi_bb), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_co2 / 1000), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_n2o / 1000), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_ch4 / 1000), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_co2e / 1000), 0)
              )
            }}
          </td>
        </tr>
      </template>
    </AmTable>
  </div>
</template>

<style scoped></style>
