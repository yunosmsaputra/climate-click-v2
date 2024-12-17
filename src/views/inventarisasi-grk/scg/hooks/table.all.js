import { h, ref } from 'vue';
import { AmChip, AmMenuPopup, AmButton, AmIcon } from 'amyun-ui-vue';
import { blueColorLib, greenColorLib, redColorLib } from '@/utils/constant.js';

export const useSCGTableAllReportActions = () => {
  const columns = ref([
    {
      key: 'bulan',
      title: 'Bulan Laporan',
      sort: true,
      clickRow: true,
      width: '144px',
    },
    {
      key: 'unit',
      title: 'Laporan Unit',
      sort: true,
      clickRow: true,
    },
    {
      key: 'unitInduk',
      title: 'Unit Induk / Subholding',
      sort: true,
      clickRow: true,
    },
    {
      key: 'konsumsiBahanBakar',
      title: 'Total Konsumsi Bahan Bakar (liter)',
      sort: true,
      clickRow: true,
      width: '214px',
    },
    {
      key: 'emisi',
      title: 'Total Emisi (tCO₂e)',
      sort: true,
      clickRow: true,
      width: '214px',
    },
    {
      key: 'status',
      title: 'Status',
      sort: true,
      clickRow: true,
      width: '192px',
      render: (value) => {
        return h(
          AmChip,
          {
            size: 'small',
            colorScheme:
              value.status === 'Draft'
                ? 'blue'
                : value.status === 'Menunggu Persetujuan UI/SH'
                  ? 'yellow'
                  : value.status === 'Final'
                    ? 'green'
                    : 'red',
          },
          {
            default: () => value.status,
          },
        );
      },
    },
    {
      key: '',
      title: '',
      sort: true,
      clickRow: true,
      width: '52px',
      render: (value) => {
        return h(
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
                  notHovered: true,
                },
                {
                  default: () =>
                    h(AmIcon, {
                      name: 'three-dots',
                      color: '#9C9C9C',
                      size: 12,
                    }),
                },
              ),
            ['popup-list']: () =>
              h(
                'div',
                {
                  class:
                    'border border-solid border-netral-stroke rounded-lg overflow-hidden',
                },
                {
                  default: () => {
                    return value.status === 'Draft'
                      ? [
                          h(
                            'div',
                            {
                              class:
                                'px-3 py-[10px] cursor-pointer hover:bg-netral-background',
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
                                ],
                              ),
                            ],
                          ),
                          h(
                            'div',
                            {
                              class:
                                'px-3 py-[10px] border-t border-solid border-netral-divider cursor-pointer hover:bg-netral-background',
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
                                  'Delete',
                                ],
                              ),
                            ],
                          ),
                        ]
                      : value.status === 'Menunggu Persetujuan UI/SH'
                        ? [
                            h(
                              'div',
                              {
                                class:
                                  'px-3 py-[10px] cursor-pointer hover:bg-netral-background',
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
                                      name: 'check',
                                      size: 14,
                                      color: greenColorLib.main,
                                    }),
                                    'Setujui Laporan',
                                  ],
                                ),
                              ],
                            ),
                            h(
                              'div',
                              {
                                class:
                                  'px-3 py-[10px] border-t border-solid border-netral-divider cursor-pointer hover:bg-netral-background',
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
                                  ],
                                ),
                              ],
                            ),
                          ]
                        : 'asdasd';
                  },
                },
              ),
          },
        );
      },
    },
  ]);
  const data = ref([]);
  const summaryEmptyData = ref({
    title: 'Data Laporan Belum Tersedia',
    subTitle: 'Silahkan menambahkan data laporan terlebih dahulu',
  });

  const getData = () => {
    data.value = [
      {
        bulan: 'Januari',
        unit: 'PLTU Pangkalan Susu',
        unitInduk: 'PLN IP - SUMATERA',
        konsumsiBahanBakar: 1032,
        emisi: 1032,
        status: 'Draft',
      },
      {
        bulan: 'Januari',
        unit: 'PLTU Pangkalan Susu',
        unitInduk: 'PLN IP - SUMATERA',
        konsumsiBahanBakar: 1032,
        emisi: 1032,
        status: 'Menunggu Persetujuan UI/SH',
      },
      {
        bulan: 'Januari',
        unit: 'PLTU Pangkalan Susu',
        unitInduk: 'PLN IP - SUMATERA',
        konsumsiBahanBakar: 1032,
        emisi: 1032,
        status: 'Ditolak UI/SH',
      },
      {
        bulan: 'Januari',
        unit: 'PLTU Pangkalan Susu',
        unitInduk: 'PLN IP - SUMATERA',
        konsumsiBahanBakar: 1032,
        emisi: 1032,
        status: 'Final',
      },
      {
        bulan: 'Januari',
        unit: 'PLTU Pangkalan Susu',
        unitInduk: 'PLN IP - SUMATERA',
        konsumsiBahanBakar: 1032,
        emisi: 1032,
        status: 'Permintaan Revisi DIVTEK',
      },
      {
        bulan: 'Januari',
        unit: 'PLTU Pangkalan Susu',
        unitInduk: 'PLN IP - SUMATERA',
        konsumsiBahanBakar: 1032,
        emisi: 1032,
        status: 'Permintaan Revisi UI/SH',
      },
    ];
  };

  return {
    columns,
    data,
    summaryEmptyData,
    getData,
  };
};
