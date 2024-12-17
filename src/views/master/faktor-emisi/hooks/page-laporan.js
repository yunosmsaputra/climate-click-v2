import { h, ref } from 'vue';
import { callApi } from '@/utils/api.js';
import { useRoute } from 'vue-router';
import {
  ISummaryAlert,
  ISummaryConfirmation,
  ISummaryPagination,
} from '@/utils/interface.js';
import {
  blueColorLib,
  host,
  neutralColorLib,
  redColorLib,
} from '@/utils/constant.js';
import { updateBreadcrumb } from '@/utils/store.js';
import { AmSwitchButton, AmMenuPopup, AmButton, AmIcon } from 'amyun-ui-vue';
import { setLoading } from '@/utils/store.js';
import { konversiRibuan } from '@/utils/konversi.js';

export const useFaktorEmisiPageLaporanActions = () => {
  const route = useRoute();
  const titlePage = ref('');
  const columns = ref([]);
  const data = ref([]);
  const summaryPagination = ref(ISummaryPagination());
  const summaryEmptyData = ref({
    title: 'Data Faktor Emisi Belum Tersedia',
    subTitle: 'Silahkan menambahkan data faktor emisi terlebih dahulu',
  });
  const showDialogForm = ref(false);
  const titleDialogForm = ref('');
  const fieldForm = ref([]);
  const paramsForm = ref({});
  const paramsFaktorEmisiParent = ref({});
  const showDialogDetail = ref(false);
  const dataDetail = ref({});
  const showDialogConfirmation = ref(false);
  const summaryConfirmation = ref(ISummaryConfirmation());
  const showDialogAlert = ref(false);
  const summaryAlert = ref(ISummaryAlert());

  const getFormFields = () => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/jenis-laporan/list`,
        method: 'GET',
        params: {
          q: `id=='${route.query.id}'`,
        },
      },
      onSuccess: (response) => {
        if (response.data.data.length > 0) {
          titlePage.value = response.data.data[0].nama_trx;
          updateBreadcrumb(
            ['Master', 'Faktor Emisi', titlePage.value],
            titlePage.value,
          );
          const updateField = response.data.data[0].field_emisi_list.map(
            (item) => ({
              ...item,
              width:
                item.col === 12
                  ? '100%'
                  : `calc((100% / ${12 / item.col}) - ${(16 * (12 / item.col - 1)) / (item.col - 1)}px)`,
            }),
          );
          fieldForm.value = updateField;
          const colData = response.data.data[0].field_emisi_list.map(
            (item, index) => ({
              key: item.nama,
              title: item.nama_tampil,
              sort: true,
              clickRow: true,
              width:
                response.data.data[0].field_emisi_list.length > 4
                  ? item.nama === 'sumberData'
                    ? '240px'
                    : index === 1
                      ? '150px'
                      : '124px'
                  : 'auto',
              sticky: index === 0,
              left: index === 0 ? '0px' : '',
              ...(item.tipe_data === 'DOUBLE' && {
                render: (val) => {
                  return h(
                    'div',
                    {},
                    {
                      default: () => konversiRibuan(val[item.nama]),
                    },
                  );
                },
              }),
            }),
          );
          columns.value = [
            ...colData,
            {
              key: '',
              title: 'Status',
              sort: false,
              clickRow: false,
              width: '90px',
              render: (val) => {
                return h(AmSwitchButton, {
                  modelValue: val.is_active,
                  onOnChange: (active) =>
                    openDialogConfirmation('status', active),
                });
              },
            },
            {
              key: '',
              title: '',
              sort: false,
              width: '52px',
              clickRow: false,
              sticky: true,
              right: '0',
              render: (val) => {
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
                              color: neutralColorLib.textField,
                              size: 12,
                            }),
                        },
                      ),
                    ['popup-list']: () =>
                      h(
                        'div',
                        {
                          class:
                            'border border-solid border-netral-stroke rounded-[6px] overflow-hidden',
                        },
                        [
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
                                  onClick: () => {
                                    openDialogForm(val);
                                  },
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
                                'px-3 py-[10px] cursor-pointer hover:bg-netral-background border-t border-solid border-netral-divider',
                            },
                            [
                              h(
                                'div',
                                {
                                  class:
                                    'flex items-center gap-3 text-sm text-netral-black leading-5',
                                  onClick: () => {
                                    openDialogConfirmation('delete', val);
                                  },
                                },
                                [
                                  h(AmIcon, {
                                    name: 'delete-outline',
                                    size: 14,
                                    color: redColorLib.main,
                                  }),
                                  'Hapus',
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                  },
                );
              },
            },
          ];
          paramsFaktorEmisiParent.value = response.data.data[0];
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const getData = (page = 1, size = 10) => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/faktor-emisi/page`,
        method: 'GET',
        params: {
          page: page - 1,
          size: size,
          sort: 'updatedDate,desc',
          q: `jenisLaporan.id==${route.query.id}`,
        },
      },
      onSuccess: (res) => {
        const dataTransform = res.data.data.content.map((data) => {
          const mappedFields = data.acuan_field_list.reduce((acc, field) => {
            const value = data.values[field.nama];
            if (value !== undefined) {
              acc[field.nama] = value;
            }
            return acc;
          }, {});
          return {
            ...mappedFields,
            is_active: data.is_active,
            id: data.id,
            id_jenis_laporan: data.id_jenis_laporan,
            nama: data.nama,
            nama_jenis_laporan: data.nama_jenis_laporan,
          };
        });
        data.value = dataTransform;
        summaryPagination.value.page = res.data.data.number + 1;
        summaryPagination.value.totalPage = res.data.data.totalPages;
        summaryPagination.value.totalData = res.data.data.totalElements;
        summaryPagination.value.dataSize = res.data.data.size;
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
        data.value = [];
        summaryPagination.value = ISummaryPagination();
        setLoading(false);
      },
    });
  };

  const openDialogForm = (data = null) => {
    titleDialogForm.value = 'Tambah Faktor Emisi';
    const paramsFormReduce = fieldForm.value.reduce((acc, item) => {
      acc[item.nama] = '';
      return acc;
    }, {});
    paramsForm.value = {
      ...paramsFormReduce,
      is_active: true,
    };
    if (data) {
      for (const key in paramsForm.value) {
        if (data.hasOwnProperty(key)) {
          paramsForm.value[key] =
            key === 'is_active' ? data[key] : data[key].toString();
        }
      }
      paramsForm.value = {
        ...paramsForm.value,
        id: data.id,
      };
    }
    showDialogForm.value = true;
  };

  const closeDialogForm = () => {
    paramsForm.value = {};
    showDialogForm.value = false;
  };

  const onSave = () => {
    const paramsEmisi = Object.keys(paramsForm.value).reduce((acc, key) => {
      const field = fieldForm.value.find((item) => item.nama === key);
      if (field) {
        if (field.tipe_data === 'DOUBLE') {
          acc[key] = parseFloat(paramsForm.value[key]);
        } else {
          acc[key] = paramsForm.value[key];
        }
      }
      return acc;
    }, {});
    const params = {
      is_active: paramsForm.value.is_active,
      nama: paramsFaktorEmisiParent.value.nama,
      id_jenis_laporan: paramsFaktorEmisiParent.value.id_jenis_laporan,
      nama_jenis_laporan: paramsFaktorEmisiParent.value.nama_jenis_laporan,
      values: paramsEmisi,
      ...(paramsForm.value.id && { id: paramsForm.value.id }),
    };
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/faktor-emisi/save`,
        method: 'POST',
        data: params,
      },
      onSuccess: () => {
        closeDialogForm();
        getData(summaryPagination.value.page, summaryPagination.value.dataSize);
      },
      onError: () => {
        closeDialogForm();
        setLoading(false);
      },
    });
  };

  const onDetail = (value) => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/faktor-emisi/detail`,
        method: 'GET',
        params: {
          id: value.id,
        },
      },
      onSuccess: (response) => {
        const data = [
          ...response.data.data.acuan_field_list.map((item) => ({
            key: item.nama_tampil,
            value: response.data.data.values[item.nama],
            satuan: item.satuan,
          })),
          {
            key: 'Status',
            value: response.data.data.is_active,
            satuan: null,
          },
        ];
        dataDetail.value = data;
        showDialogDetail.value = true;
        setLoading(false);
      },
      onError: (err) => {
        dataDetail.value = {};
        setLoading(false);
      },
    });
  };

  const openDialogConfirmation = (type = null, data = null) => {
    summaryConfirmation.value = {
      title:
        type === 'add'
          ? 'Tambah Data?'
          : type === 'edit'
            ? 'Simpan Data Faktor Emisi?'
            : type === 'status'
              ? 'Ubah Status?'
              : 'Hapus Data?',
      message:
        type === 'add'
          ? 'Apakah Anda yakin menambah faktor emisi ini?'
          : type === 'edit'
            ? 'Apakah Anda yakin mengubah dan menyimpan data faktor emisi ini? '
            : type === 'status'
              ? 'Apakah Anda yakin akan mengubah status faktor emisi ini?'
              : 'Apakah anda yakin akan menghapus data faktor emisi ini?',
      textCancel: 'Batalkan',
      textSubmit:
        type === 'add'
          ? 'Tambah Faktor Emisi'
          : type === 'edit'
            ? 'Simpan Data'
            : type === 'status'
              ? 'Ubah Status'
              : 'Hapus Data',
      submitColor: type === 'delete' ? redColorLib.main : blueColorLib.main,
      ...(data && { data: data }),
    };
    showDialogConfirmation.value = true;
  };

  const closeDialogConfirmation = () => {
    summaryConfirmation.value = {};
    showDialogConfirmation.value = false;
  };

  const handleSubmitConfirmation = () => {
    if (summaryConfirmation.value.title === 'Hapus Data?') {
      deleteData();
    }
  };

  const deleteData = () => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/faktor-emisi/delete`,
        method: 'POST',
        data: {
          id: summaryConfirmation.value.data.id,
        },
      },
      onSuccess: () => {
        closeDialogConfirmation();
        summaryAlert.value = {
          title: 'Faktor Emisi Berhasil Dihapus!',
          message: 'Faktor emisi yang anda buat telah berhasil dihapus.',
          buttonText: 'Arahkan ke Halaman Faktor Emisi',
          isSuccess: true,
        };
        showDialogAlert.value = true;
        setLoading(false);
      },
      onError: () => {
        closeDialogConfirmation();
        summaryAlert.value = {
          title: 'Faktor Emisi Gagal Dihapus!',
          message: 'Faktor emisi yang anda buat gagal dihapus.',
          buttonText: 'Arahkan ke Halaman Faktor Emisi',
          isSuccess: false,
        };
        showDialogAlert.value = true;
        setLoading(false);
      },
    });
  };

  const closeDialogAlert = () => {
    showDialogAlert.value = false;
    getData(summaryPagination.value.page, summaryPagination.value.dataSize);
  };

  return {
    getFormFields,
    titlePage,
    columns,
    data,
    getData,
    summaryPagination,
    summaryEmptyData,
    showDialogForm,
    openDialogForm,
    closeDialogForm,
    titleDialogForm,
    fieldForm,
    paramsForm,
    onSave,
    onDetail,
    showDialogDetail,
    dataDetail,
    showDialogConfirmation,
    openDialogConfirmation,
    closeDialogConfirmation,
    summaryConfirmation,
    handleSubmitConfirmation,
    showDialogAlert,
    summaryAlert,
    closeDialogAlert,
  };
};
