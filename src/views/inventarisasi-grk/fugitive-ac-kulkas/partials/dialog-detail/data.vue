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
    key: 'nama_variabel_faktor_emisi',
    title: 'Jenis AC',
    sort: false,
    clickRow: true,
  },
  {
    key: 'nama_faktor_emisi',
    title: 'Jenis Refrigerant',
    sort: false,
    clickRow: true,
  },
  {
    key: 'penggunaan',
    title: 'Jumlah Penggunaan (kg)',
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
          default: () => konversiRibuan(data.emisi_co2e),
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
          default: () => konversiRibuan(data.emisi_co2e / 1000),
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
      v-if="isExpand"
    >
      <template #footer>
        <tr>
          <td class="p-3 text-xs text-[#5979A6] font-semibold" colspan="2">Total</td>
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
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_co2e), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.emisi_co2e) / 100, 0)
              )
            }}
          </td>
        </tr>
      </template>
    </AmTable>
  </div>
</template>

<style scoped></style>
