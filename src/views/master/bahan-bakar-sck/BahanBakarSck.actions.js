import { h, ref } from 'vue';
import {
  blueColorLib,
  host,
  neutralColorLib,
  redColorLib,
} from '@/utils/constant.js';
import { AmButton, AmIcon, AmMenuPopup, AmSwitchButton } from 'amyun-ui-vue';
import {
  ISummaryAlert,
  ISummaryConfirmation,
  ISummaryPagination,
} from '@/utils/interface.js';
import { setLoading } from '@/utils/store.js';
import { callApi } from '@/utils/api.js';

export const useBahanBakarSckAction = () => {
  const columns = ref([
    {
      key: 'nama',
      title: 'Nama Bahan Bakar',
      sort: true,
      clickRow: true,
      width: '330px',
    },
    {
      key: 'level',
      title: 'Tingkat Bahan Bakar',
      sort: true,
      clickRow: true,
      width: '180px',
    },
    {
      key: 'nama_parent',
      title: 'Parent Bahan Bakar',
      sort: true,
      clickRow: true,
      width: '330px',
      render: (val) => {
        return h(
          'div',
          {
            class: val.nama_parent
              ? 'text-netral-black'
              : 'text-netral-textField',
          },
          {
            default: () => val.nama_parent ?? 'Tidak ada parent bahan bakar',
          },
        );
      },
    },
    {
      key: 'keterangan',
      title: 'Keterangan',
      sort: true,
      clickRow: true,
      render: (val) => {
        return h(
          'div',
          {
            class: val.keterangan
              ? 'text-netral-black'
              : 'text-netral-textField',
          },
          {
            default: () => val.keterangan ?? 'Tidak ada keterangan',
          },
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      sort: false,
      clickRow: false,
      width: '90px',
      render: (val) => {
        return h(AmSwitchButton, {
          modelValue: val.is_active,
          onOnChange: (active) => openDialogConfirmation('status', val, active),
        });
      },
    },
    {
      key: '',
      title: '',
      sort: false,
      clickRow: false,
      width: '52px',
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
                      onClick: () => {
                        openDialogForm(val);
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
  ]);
  const data = ref([]);
  const summaryEmptyData = ref({
    title: 'Data Bahan Bakar SCK Belum Tersedia',
    subTitle: 'Silahkan menambahkan data Bahan Bakar SCK terlebih dahulu',
  });
  const summaryPagination = ref(ISummaryPagination());
  const summarySearch = ref({
    placeholder: 'Cari Sesuatu',
    selected: '',
    listSearch: [
      {
        label: 'Nama Bahan Bakar',
        value: 'nama',
      },
      {
        label: 'Parent Bahan Bakar',
        value: 'namaParent',
      },
    ],
    popupWidth: '160px',
  });
  const selectedIndexSearch = ref(null);
  const search = ref(null);
  const showDialogForm = ref(false);
  const titleDialogForm = ref('');
  const textSubmitDialogForm = ref('');
  const paramsForm = ref({});
  const listBahanBakar = ref([]);
  const showDialogDetail = ref(false);
  const dataDetail = ref({});
  const showDialogConfirmation = ref(false);
  const summaryConfirmation = ref(ISummaryConfirmation());
  const showDialogAlert = ref(false);
  const summaryAlert = ref(ISummaryAlert());

  const getListBahanBakar = () => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/bahan-bakar-sck/list`,
        method: 'GET',
      },
      onSuccess: (response) => {
        listBahanBakar.value = response.data.data;
      },
      onError: () => {
        listBahanBakar.value = [];
      },
    });
  };

  const getData = (page = 1, size = 10) => {
    setLoading(true);
    data.value = [];
    const params = {
      page: page - 1,
      size: size,
      sort: 'updatedDate,desc',
      ...(search.value &&
        (selectedIndexSearch.value
          ? { q: `${selectedIndexSearch.value}=ilike='${search.value}'` }
          : {
              q: `nama=ilike='${search.value}',namaParent=ilike='${search.value}'`,
            })),
    };
    callApi({
      config: {
        url: `${host.api}/api/v2/master/bahan-bakar-sck/page`,
        method: 'GET',
        params: params,
      },
      onSuccess: (response) => {
        data.value = response.data.data.content;
        summaryPagination.value.page = response.data.data.number + 1;
        summaryPagination.value.totalPage = response.data.data.totalPages;
        summaryPagination.value.totalData = response.data.data.totalElements;
        summaryPagination.value.dataSize = response.data.data.size;
        setLoading(false);
      },
      onError: () => {
        data.value = [];
        summaryPagination.value = ISummaryPagination();
        setLoading(false);
      },
    });
  };

  const onChangePage = (page) => {
    getData(page, summaryPagination.value.dataSize);
  };

  const onChangeDataSize = (size) => {
    getData(1, size);
  };

  const onSelectedIndexSearch = (value) => {
    selectedIndexSearch.value = value;
  };

  const onSearch = (value) => {
    search.value = value;
    getData(summaryPagination.value.page, summaryPagination.value.dataSize);
  };

  const openDialogForm = (data = null) => {
    if (data) {
      titleDialogForm.value = 'Edit Bahan Bakar SCK';
      textSubmitDialogForm.value = 'Simpan Data';
      paramsForm.value = {
        ...data,
        ...(data.id_parent && {
          parent: {
            id: data.id_parent,
            nama: data.nama_parent,
            level: data.level - 1,
          },
        }),
      };
    } else {
      titleDialogForm.value = 'Tambah Bahan Bakar SCK';
      textSubmitDialogForm.value = 'Tambahkan Bahan Bakar';
    }
    showDialogDetail.value = false;
    showDialogForm.value = true;
  };

  const closeDialogForm = () => {
    paramsForm.value = {};
    showDialogForm.value = false;
  };

  const onSave = () => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/bahan-bakar-sck/save`,
        method: 'POST',
        data: {
          ...(paramsForm.value.id && { id: paramsForm.value.id }),
          is_active: paramsForm.value.is_active,
          nama: paramsForm.value.nama,
          ...(paramsForm.value.parent && {
            level: paramsForm.value.parent.level + 1,
          }),
          keterangan: paramsForm.value.keterangan,
          ...(paramsForm.value.parent && {
            id_parent: paramsForm.value.parent.id,
          }),
        },
      },
      onSuccess: () => {
        summaryAlert.value = {
          title:
            summaryConfirmation.value.title === 'Tambah Data Bahan Bakar'
              ? 'Data Berhasil Ditambah!'
              : 'Data Berhasil Disimpan',
          message: `Data bahan bakar sck yang anda ${summaryConfirmation.value.title === 'Tambah Data Bahan Bakar' ? 'buat telah berhasil ditambahkan.' : 'ubah telah berhasil disimpan'}`,
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: true,
        };
        closeDialogForm();
        closeDialogConfirmation();
        showDialogAlert.value = true;
        setLoading(false);
      },
      onError: () => {
        closeDialogForm();
        closeDialogConfirmation();
        summaryAlert.value = {
          title: 'Data Gagal Ditambah!',
          message: 'Data bahan bakar sck yang anda buat gagal ditambahkan.',
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: false,
        };
        showDialogAlert.value = true;
        setLoading(false);
      },
    });
  };

  const onDetail = (value) => {
    dataDetail.value = value;
    showDialogDetail.value = true;
  };

  const openDialogConfirmation = (type, data, status = null) => {
    summaryConfirmation.value = {
      title:
        type === 'add'
          ? 'Tambah Data Bahan Bakar'
          : type === 'edit'
            ? 'Simpan Data Bahan Bakar'
            : type === 'status'
              ? 'Ubah Status Bahan Bakar'
              : 'Hapus Data Bahan Bakar',
      message:
        type === 'add'
          ? 'Apakah Anda yakin menambah data bahan bakar sck ini? '
          : type === 'edit'
            ? 'Apakah Anda yakin menyubah dan menyimpan data bahan bakar sck ini?'
            : type === 'status'
              ? 'Apakah Anda yakin akan mengubah status data bahan bakar ini?'
              : 'Apakah Anda yakin akan menghapus data bahan bakar ini?',
      textCancel: 'Batalkan',
      textSubmit:
        type === 'add'
          ? 'Tambah Bahan Bakar'
          : type === 'edit'
            ? 'Simpan Data'
            : type === 'status'
              ? 'Ubah Status'
              : 'Hapus Data',
      submitColor: type === 'delete' ? redColorLib.main : blueColorLib.main,
      ...(data && {
        data: {
          ...data,
          ...(status && { isActive: status }),
        },
      }),
    };
    showDialogConfirmation.value = true;
  };

  const closeDialogConfirmation = () => {
    summaryConfirmation.value = {};
    showDialogConfirmation.value = false;
    getData(summaryPagination.value.page, summaryPagination.value.dataSize);
  };

  const handleSubmitConfirmation = () => {
    if (
      summaryConfirmation.value.title === 'Tambah Data Bahan Bakar' ||
      summaryConfirmation.value.title === 'Simpan Data Bahan Bakar'
    ) {
      onSave();
    } else if (summaryConfirmation.value.title.includes('Status')) {
      changeStatus();
    } else if (summaryConfirmation.value.title.includes('Hapus')) {
      deleteData();
    }
  };

  const closeDialogAlert = () => {
    showDialogAlert.value = false;
    summaryAlert.value = {};
    getData(summaryPagination.value.page, summaryPagination.value.dataSize);
  };

  const changeStatus = () => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/bahan-bakar-sck/save`,
        method: 'POST',
        data: {
          ...summaryConfirmation.value.data,
          is_active: summaryConfirmation.value.data.isActive,
        },
      },
      onSuccess: () => {
        summaryAlert.value = {
          title: 'Data Berhasil Disimpan',
          message: `Status data bahan bakar sck berhasil diubah`,
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: true,
        };
        closeDialogForm();
        closeDialogConfirmation();
        showDialogAlert.value = true;
        setLoading(false);
      },
      onError: () => {
        closeDialogForm();
        closeDialogConfirmation();
        summaryAlert.value = {
          title: 'Data Gagal Disimpan',
          message: `Status data bahan bakar sck gagal diubah`,
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: false,
        };
        showDialogAlert.value = true;
        setLoading(false);
      },
    });
  };

  const deleteData = () => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/bahan-bakar-sck/delete`,
        method: 'POST',
        data: {
          id: summaryConfirmation.value.data.id,
        },
      },
      onSuccess: () => {
        summaryAlert.value = {
          title: 'Data Berhasil Dihapus',
          message: `Data bahan bakar sck berhasil dihapus`,
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: true,
        };
        closeDialogForm();
        closeDialogConfirmation();
        showDialogAlert.value = true;
        setLoading(false);
      },
      onError: () => {
        summaryAlert.value = {
          title: 'Data Gagal Dihapus',
          message: `Data bahan bakar sck gagal dihapus`,
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: true,
        };
        closeDialogForm();
        closeDialogConfirmation();
        showDialogAlert.value = true;
        setLoading(false);
      },
    });
  };

  return {
    columns,
    data,
    summaryEmptyData,
    getData,
    summaryPagination,
    onChangePage,
    onChangeDataSize,
    summarySearch,
    onSelectedIndexSearch,
    onSearch,
    showDialogForm,
    openDialogForm,
    closeDialogForm,
    titleDialogForm,
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
    getListBahanBakar,
    listBahanBakar,
    textSubmitDialogForm,
  };
};
