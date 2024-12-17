<script setup>
import SearchBarComponent from '@/components/SearchBarComponent.vue'
import TableWithPagination from '@/components/TableWithPagination.vue'
import { AmYearPicker } from 'amyun-ui-vue'
import { nextTick, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'FugitiveAparTableAllLaporanComponent',
})

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  summaryEmptyData: {
    type: Object,
    default: () => ({}),
  },
  summarySearch: {
    type: Object,
    default: () => ({}),
  },
  summaryPagination: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  periode: {
    type: Number,
    default: null,
  },
})

const periodeYear = ref(null)

const emits = defineEmits(['onDetail', 'update:periode'])

watch(periodeYear, (newValue) => {
  emits('update:periode', newValue)
})

onMounted(() => {
  periodeYear.value = new Date().getFullYear()
})
</script>

<template>
  <div class="bg-netral-background px-3 pt-3 pb-8">
    <div class="bg-netral-white px-4 py-3 rounded-lg h-[calc(100vh-184px)]">
      <SearchBarComponent :summary-search="summarySearch">
        <template #additional-right>
          <AmYearPicker popup-position="bottom-right" v-model="periodeYear"></AmYearPicker>
        </template>
      </SearchBarComponent>
      <TableWithPagination
        :summary-empty-data="summaryEmptyData"
        :columns="columns"
        :data="data"
        @on-click-row="
          (data) => {
            emits('onDetail', data)
          }
        "
        :summary-pagination="summaryPagination"
        :is-loading="isLoading"
        class="mt-3"
      ></TableWithPagination>
    </div>
  </div>
</template>

<style scoped></style>
