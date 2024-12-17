<script setup>
import { AmTable } from 'amyun-ui-vue'
import TitleSection from '@/components/TitleSection.vue'
import { h, ref } from 'vue'
import { konversiRibuan } from '@/utils/konversi.js'
import AlertHelp from '@/assets/icons/alert-help.vue'

defineOptions({
  name: 'DataSf6Detail',
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
    key: '',
    title: 'Data ke-',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => index + 1,
        }
      )
    },
  },
  {
    key: 'sf6_disimpan',
    title: 'SF6 Disimpan',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.sf6_disimpan ? konversiRibuan(data.sf6_disimpan) : '-'),
        }
      )
    },
  },
  {
    key: 'sf6_digunakan',
    title: 'SF6 Digunakan',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.sf6_digunakan ? konversiRibuan(data.sf6_digunakan) : '-'),
        }
      )
    },
  },
  {
    key: 'faktor_emisi',
    title: 'Faktor Emisi',
    sort: false,
    clickRow: true,
    render: (data, index) => {
      return h(
        'div',
        {},
        {
          default: () => (data.faktor_emisi ? konversiRibuan(data.faktor_emisi) : '-'),
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
          default: () =>
            data.faktor_emisi
              ? konversiRibuan(
                  data.sf6_digunakan > data.sf6_disimpan
                    ? data.sf6_digunakan * data.faktor_emisi
                    : data.sf6_disimpan * data.faktor_emisi * 0.01
                )
              : '-',
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
          default: () =>
            data.faktor_emisi
              ? konversiRibuan(
                  data.sf6_digunakan > data.sf6_disimpan
                    ? (data.sf6_digunakan * data.faktor_emisi) / 1000
                    : (data.sf6_disimpan * data.faktor_emisi * 0.01) / 1000
                )
              : '-',
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
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.sf6_disimpan), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce((sum, item) => sum + parseFloat(item.sf6_digunakan), 0)
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              data.data_list?.length > 0
                ? data.data_list[0].faktor_emisi
                  ? konversiRibuan(data.data_list[0].faktor_emisi)
                  : 0
                : 0
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce(
                  (sum, item) =>
                    item.faktor_emisi
                      ? sum +
                        (item.sf6_digunakan > item.sf6_disimpan
                          ? item.sf6_digunakan * item.faktor_emisi
                          : item.sf6_disimpan * item.faktor_emisi * 0.01)
                      : 0,
                  0
                )
              )
            }}
          </td>
          <td class="p-3 text-xs text-blue-main font-semibold">
            {{
              konversiRibuan(
                data.data_list?.reduce(
                  (sum, item) =>
                    item.faktor_emisi
                      ? sum +
                        (item.sf6_digunakan > item.sf6_disimpan
                          ? item.sf6_digunakan * item.faktor_emisi
                          : item.sf6_disimpan * item.faktor_emisi * 0.01) /
                          1000
                      : 0,
                  0
                )
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
