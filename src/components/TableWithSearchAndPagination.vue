<script setup>
import { AmTable } from 'amyun-ui-vue'
import AlertHelp from '@/assets/icons/alert-help.vue'
import { ISummaryPagination, ISummarySearch } from '@/utils/interface.js'

defineOptions({
  name: 'TableWithSearchComponent',
})

defineProps({
  columns: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  summaryEmptyData: {
    type: Object,
    default: {
      title: '',
      subTitle: '',
    },
  },
  summaryPagination: {
    type: Object,
    default: ISummaryPagination(),
  },
  summarySearch: {
    type: Object,
    default: ISummarySearch(),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits([
  'onChangePage',
  'onChangeDataSize',
  'onSelectIndexSearch',
  'onSearch',
  'onClickRow',
])
</script>

<template>
  <AmTable
    :columns="columns"
    :data="data"
    searchable
    pagination
    :summaryPagination="summaryPagination"
    @onChangePage="
      (page) => {
        emits('onChangePage', page)
      }
    "
    @onChangeDataSize="
      (size) => {
        emits('onChangeDataSize', size)
      }
    "
    :summary-search="summarySearch"
    @onSelectIndexSearch="
      (value) => {
        emits('onSelectIndexSearch', value)
      }
    "
    @onSearch="
      (value) => {
        emits('onSearch', value)
      }
    "
    @onClickRow="
      (data) => {
        emits('onClickRow', data)
      }
    "
    :isLoading="isLoading"
    isLoadingFullRow
  >
    <template #customEmptyData>
      <div class="h-[calc(100vh-256px)] flex justify-center flex-wrap content-center">
        <AlertHelp></AlertHelp>
        <div class="w-full text-base text-center font-semibold text-netral-black mt-2">
          {{ summaryEmptyData.title }}
        </div>
        <div class="w-full text-sm text-center font-normal text-netral-black mt-2">
          {{ summaryEmptyData.subTitle }}
        </div>
      </div>
    </template>
  </AmTable>
</template>

<style scoped></style>
