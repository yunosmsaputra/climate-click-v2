import { h, ref } from 'vue'
import {
  blueColorLib,
  greenColorLib,
  host,
  monthFull,
  redColorLib,
  userProfile,
} from '@/utils/constant.js'
import { callApi } from '@/utils/api.js'
import { ISummaryPagination } from '@/utils/interface.js'
import { AmButton, AmChip, AmIcon, AmMenuPopup } from 'amyun-ui-vue'
import { konversiRibuan } from '@/utils/konversi.js'
import { statusLaporan } from '@/utils/enums.js'

export const useInfenSf6TableAllActions = () => {
  const loading = ref(false)
  const periode = ref(null)
  const summarySearch = ref({
    placeholder: 'Cari sesuatu disini',
    listSearch: [],
  })
  const iconActionHover = ref([false])
  const columns = ref([
    {
      key: 'bulan',
      title: 'Bulan Laporan',
      sort: true,
      clickRow: true,
      width: '144px',
      render: (val) => {
        return h(
          'div',
          {},
          {
            default: () => monthFull[val.bulan - 1],
          }
        )
      },
    },
    {
      key: 'nama_unit',
      title: 'Laporan Unit',
      sort: true,
      clickRow: true,
    },
    {
      key: 'nama_uish',
      title: 'Unit Induk / Subholding',
      sort: true,
      clickRow: true,
    },
    {
      key: 'sf6_disimpan',
      title: 'SF6 Disimpan (kg)',
      sort: false,
      clickRow: true,
      // width: '214px',
      render: (val) => {
        return h(
          'div',
          {},
          {
            default: () => konversiRibuan(val.sf6_disimpan),
          }
        )
      },
    },
    {
      key: 'sf6_digunakan',
      title: 'SF6 Digunakan (kg)',
      sort: false,
      clickRow: true,
      // width: '214px',
      render: (val) => {
        return h(
          'div',
          {},
          {
            default: () => konversiRibuan(val.sf6_digunakan),
          }
        )
      },
    },
    {
      key: 'total_emisi',
      title: 'Total Emisi (tCO₂e)',
      sort: true,
      clickRow: true,
      // width: '214px',
      render: (val) => {
        return h(
          'div',
          {},
          {
            default: () => konversiRibuan(val.total_emisi),
          }
        )
      },
    },
    {
      key: 'status',
      title: 'Status',
      sort: false,
      clickRow: true,
      width: '198px',
      render: (value) => {
        return h(
          AmChip,
          {
            size: 'small',
            colorScheme: statusLaporan(value.status, 'chipColor'),
          },
          {
            default: () => statusLaporan(value.status),
          }
        )
      },
    },
    {
      key: '',
      title: '',
      sort: false,
      clickRow: false,
      width: '52px',
      render: (value, index) => {
        return (
          (((value.status === 'DRAFT' || value.status === 'DITOLAK_OLEH_UI_SH') && userProfile.role.includes('SUBMITTER')) ||
            (value.status === 'MENUNGGU_PERSETUJUAN_UI_SH' &&
              userProfile.role.includes('APPROVER')) || (value.status === 'FINAL' && userProfile.role.includes('DIVTEK'))) &&
          h(
            AmMenuPopup,
            {
              position: 'bottom-right',
              top: '26px',
              popupWidth: '160px',
            },
            {
              activator: () =>
                h(
                  AmButton,
                  {
                    btnIcon: true,
                    color: '#E5E7E9',
                    onMouseover: () => {
                      iconActionHover.value[index] = true
                    },
                    onMouseleave: () => {
                      iconActionHover.value[index] = false
                    },
                  },
                  {
                    default: () =>
                      h(AmIcon, {
                        name: 'three-dots',
                        color: iconActionHover.value[index] ? '#FFFFFF' : '#9C9C9C',
                        size: 12,
                      }),
                  }
                ),
              ['popup-list']: () =>
                h(
                  'div',
                  {
                    class: 'border border-solid border-netral-stroke rounded-lg overflow-hidden',
                  },
                  {
                    default: () => {
                      return value.status === 'DRAFT' ||
                        value.status === 'DITOLAK_OLEH_UI_SH' ||
                        value.status === 'PERMINTAAN_REVISI_DIVTEK'
                        ? [
                            h(
                              'div',
                              {
                                class: 'px-3 py-[10px] cursor-pointer hover:bg-netral-background',
                                onClick: () => {
                                  openDialogForm(value)
                                },
                              },
                              [
                                h(
                                  'div',
                                  {
                                    class:
                                      'flex items-center gap-3 text-sm text-netral-black leading-5',
                                  },
                                  [
                                    h(AmIcon, {
                                      name: 'edit-outline',
                                      size: 14,
                                      color: blueColorLib.main,
                                    }),
                                    'Edit',
                                  ]
                                ),
                              ]
                            ),
                            h(
                              'div',
                              {
                                class:
                                  'px-3 py-[10px] border-t border-solid border-netral-divider cursor-pointer hover:bg-netral-background',
                                onClick: () => {
                                  openDialogConfirmationDelete(value)
                                },
                              },
                              [
                                h(
                                  'div',
                                  {
                                    class:
                                      'flex items-center gap-3 text-sm text-netral-black leading-5',
                                  },
                                  [
                                    h(AmIcon, {
                                      name: 'delete-outline',
                                      size: 14,
                                      color: redColorLib.main,
                                    }),
                                    'Hapus',
                                  ]
                                ),
                              ]
                            ),
                          ]
                        : value.status === 'MENUNGGU_PERSETUJUAN_UI_SH'
                          ? [
                              h(
                                'div',
                                {
                                  class: 'px-3 py-[10px] cursor-pointer hover:bg-netral-background',
                                },
                                [
                                  h(
                                    'div',
                                    {
                                      class:
                                        'flex items-center gap-3 text-sm text-netral-black leading-5',
                                      onClick: () => {
                                        openDialogConfirmationApproval(value, 'approve')
                                      },
                                    },
                                    [
                                      h(AmIcon, {
                                        name: 'check',
                                        size: 14,
                                        color: greenColorLib.main,
                                      }),
                                      'Setujui Laporan',
                                    ]
                                  ),
                                ]
                              ),
                              h(
                                'div',
                                {
                                  class:
                                    'px-3 py-[10px] border-t border-solid border-netral-divider cursor-pointer hover:bg-netral-background',
                                  onClick: () => {
                                    openDialogConfirmationApproval(value, 'reject')
                                  },
                                },
                                [
                                  h(
                                    'div',
                                    {
                                      class:
                                        'flex items-center gap-3 text-sm text-netral-black leading-5',
                                    },
                                    [
                                      h(AmIcon, {
                                        name: 'cross',
                                        size: 14,
                                        color: redColorLib.main,
                                      }),
                                      'Tolak Laporan',
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          : value.status === 'FINAL'
                            ? [
                                h(
                                  'div',
                                  {
                                    class:
                                      'px-3 py-[10px] cursor-pointer hover:bg-netral-background',
                                    onClick: () => {
                                      openDialogRevisi(value)
                                    },
                                  },
                                  [
                                    h(
                                      'div',
                                      {
                                        class:
                                          'flex items-center gap-3 text-sm text-netral-black leading-5',
                                      },
                                      [
                                        h(AmIcon, {
                                          name: 'folder-sync',
                                          size: 14,
                                          color: redColorLib.main,
                                        }),
                                        'Revisi Laporan',
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            : ''
                    },
                  }
                ),
            }
          )
        )
      },
    },
  ])
  const data = ref([])
  const summaryPagination = ref(ISummaryPagination())
  const summaryEmptyData = ref({
    title: 'Data Laporan Belum Tersedia',
    subTitle: 'Silahkan menambahkan data laporan terlebih dahulu',
  })
  const idEditData = ref(null)
  const paramsDeleteData = ref(null)
  const paramsApproval = ref(null)
  const dataDetailRevisi = ref(null)
  const counterPersetujuan = ref(0)
  const sortValue = ref('updatedDate,desc')
  const counterDraft = ref(0)

  const getData = (
    page = 1,
    size = 10,
    activeTab = 'Semua Laporan',
    sort = 'updatedDate,desc',
    periode = new Date().getFullYear()
  ) => {
    loading.value = true
    callApi({
      config: {
        url: `${host.grk}/api/v2/inven-sf6/page`,
        method: 'GET',
        params: {
          page: page - 1,
          size: size,
          sort: sort,
          q: `tahun==${periode}${
            activeTab.includes('Draft Laporan')
              ? `;status=in=('DRAFT','DITOLAK_OLEH_UI_SH','PERMINTAAN_REVISI_DIVTEK')`
              : activeTab.includes('Persetujuan Laporan')
                ? `;status=in=('MENUNGGU_PERSETUJUAN_UI_SH','MENUNGGU_PERSETUJUAN_DIVTEK','MENUNGGU_PERSETUJUAN_DIVAKT')`
                : activeTab === 'Final Laporan'
                  ? `;status=='FINAL'`
                  : ``
          }`,
        },
      },
      onSuccess: (response) => {
        data.value = response.data.data.content
        summaryPagination.value.page = response.data.data.number + 1
        summaryPagination.value.totalPage = response.data.data.totalPages
        summaryPagination.value.totalData = response.data.data.totalElements
        summaryPagination.value.dataSize = response.data.data.size
        if (userProfile.role === 'DIVTEK' || userProfile.role.includes('APPROVER')) {
          getCounterPersetujuan()
        }
        if (userProfile.role.includes('SUBMITTER')) {
          getCounterDraft()
        }
        loading.value = false
      },
      onError: () => {
        loading.value = false
        data.value = []
        summaryPagination.value = ISummaryPagination()
      },
    })
  }

  const getCounterPersetujuan = () => {
    callApi({
      config: {
        url: `${host.grk}/api/v2/inven-sf6/list`,
        method: 'GET',
        params: {
          q: `status==${userProfile.role === 'DIVTEK' ? 'MENUNGGU_PERSETUJUAN_DIVTEK' : 'MENUNGGU_PERSETUJUAN_UI_SH'};tahun==${periode.value}`,
        },
      },
      onSuccess: (response) => {
        counterPersetujuan.value = response.data.data.length
      },
    })
  }

  const getCounterDraft = () => {
    callApi({
      config: {
        url: `${host.grk}/api/v2/inven-sf6/list`,
        method: 'GET',
        params: {
          ...(userProfile.role.includes('SUBMITTER') && {
            q: `status=in=('DRAFT','DITOLAK_OLEH_UI_SH','PERMINTAAN_REVISI_DIVTEK');tahun==${periode.value}`,
          }),
        },
      },
      onSuccess: (response) => {
        counterDraft.value = response.data.data.length
      },
    })
  }

  const openDialogForm = (value) => {
    idEditData.value = value.id
  }

  const openDialogConfirmationDelete = (value) => {
    paramsDeleteData.value = value
  }

  const openDialogConfirmationApproval = (value, state) => {
    paramsApproval.value = {
      ...value,
      state: state,
    }
  }

  const openDialogRevisi = (value) => {
    dataDetailRevisi.value = {
      ...value,
      state: 'revisi',
    }
  }

  const onSort = (activeTab, sort) => {
    sortValue.value = `${sort.key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())},${sort.type}`
    getData(
      summaryPagination.value.page,
      summaryPagination.value.dataSize,
      activeTab,
      sortValue.value,
      periode.value
    )
  }

  return {
    loading,
    periode,
    summarySearch,
    columns,
    data,
    summaryPagination,
    summaryEmptyData,
    getData,
    idEditData,
    paramsDeleteData,
    paramsApproval,
    dataDetailRevisi,
    counterPersetujuan,
    sortValue,
    onSort,
    counterDraft,
  }
}
