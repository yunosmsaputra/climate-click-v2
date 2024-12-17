import { h, reactive, ref } from 'vue';
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

export const useMasterUnitActions = () => {
  const columns = ref([
    {
      key: 'code',
      title: 'Kode Unit',
      sort: true,
      clickRow: true,
    },
    {
      key: 'level',
      title: 'Organisasi Level',
      sort: true,
      clickRow: true,
    },
    {
      key: 'name',
      title: 'Nama Unit',
      sort: true,
      clickRow: true,
    },
    {
      key: 'nameUnitParent',
      title: 'Parent Unit',
      sort: true,
      clickRow: true,
      render: (val) => {
        return h(
          'div',
          {
            class: `${val.unitParent ? `text-netral-black` : 'text-netral-textField'}`,
          },
          {
            default: () =>
              val.unitParent ? val.unitParent.name : 'Tidak ada parent unit',
          },
        );
      },
    },
    {
      key: 'picDataName',
      title: 'PIC Data',
      sort: true,
      clickRow: true,
    },
    {
      key: 'picUnitName',
      title: 'PIC Unit',
      sort: true,
      clickRow: true,
    },
    {
      key: 'status',
      title: 'Status',
      sort: false,
      clickRow: false,
      width: '90px',
      render: (val) => {
        return h(AmSwitchButton, {
          modelValue: val.isActive,
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
    title: 'Data Unit Belum Tersedia',
    subTitle: 'Silahkan menambahkan data unit terlebih dahulu',
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
  const showDialogDetail = ref(false);
  const dataDetail = ref({});
  const showDialogConfirmation = ref(false);
  const summaryConfirmation = ref(ISummaryConfirmation());
  const showDialogAlert = ref(false);
  const summaryAlert = ref(ISummaryAlert());
  const refForm = ref(null);

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
        url: `${host.api}/api/v2/master/unit/page`,
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
      setLoading(true);
      callApi({
        config: {
          url: `${host.api}/api/v2/master/unit/detail`,
          method: 'GET',
          params: {
            id: data.id,
          },
        },
        onSuccess: (response) => {
          paramsForm.value = response.data.data;
          paramsForm.value.parent = {
            id: response.data.data.unitParent.id,
            name: response.data.data.unitParent.name,
            level: response.data.data.unitParent.level,
          };
          titleDialogForm.value = 'Edit Data Unit';
          textSubmitDialogForm.value = 'Simpan Data';
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      });
    } else {
      titleDialogForm.value = 'Tambah Data Unit';
      textSubmitDialogForm.value = 'Tambah Data';
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
        url: `${host.api}/api/v2/master/unit/save`,
        method: 'POST',
        data: {
          ...(paramsForm.value.id && { id: paramsForm.value.id }),
          level: paramsForm.value.parent
            ? paramsForm.value.parent.level + 1
            : 0,
          ...paramsForm.value,
          ...(paramsForm.value.parent && {
            idUnitParent: paramsForm.value.parent.id,
          }),
          ...(paramsForm.value.grid && { idGrid: paramsForm.value.grid.id }),
          ...(paramsForm.value.regional && {
            idRegional: paramsForm.value.regional.id,
          }),
          ...(paramsForm.value.jenisPembangkit && {
            idJenisPembangkit: paramsForm.value.jenisPembangkit.id,
          }),
          ...(paramsForm.value.dateOperationCommercial && {
            dateOperationCommercial: `${paramsForm.value.dateOperationCommercial.getFullYear()}-${paramsForm.value.dateOperationCommercial.getMonth() + 1}-${paramsForm.value.dateOperationCommercial.getDate()}`,
          }),
          ...(paramsForm.value.tipeBoiler && {
            idTipeBoiler: paramsForm.value.tipeBoiler.id,
          }),
          ...(paramsForm.value.isMulutTambang && {
            isMulutTambang: paramsForm.value.isMulutTambang.id,
          }),
          ...(paramsForm.value.isBendungan && {
            isBendungan: paramsForm.value.isBendungan.value,
          }),
          isSilm: paramsForm.value.isSilm ?? false,
          idProvinsi: paramsForm.value.provinsi.id,
          idKota: paramsForm.value.kota.id,
          idKecamatan: paramsForm.value.kecamatan.id,
          idKelurahan: paramsForm.value.kelurahan.id,
        },
      },
      onSuccess: () => {
        summaryAlert.value = {
          title: summaryConfirmation.value.title.includes('Tambah')
            ? 'Data Berhasil Ditambah!'
            : 'Data Berhasil Disimpan',
          message: `Data master unit yang anda ${summaryConfirmation.value.title.includes('Tambah') ? 'buat telah berhasil ditambahkan.' : 'ubah telah berhasil disimpan'}`,
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
          message: 'Data master unit yang anda buat gagal ditambahkan.',
          buttonText: 'Arahkan ke Halaman Master',
          isSuccess: false,
        };
        showDialogAlert.value = true;
        setLoading(false);
      },
    });
  };

  const onDetail = (value) => {
    setLoading(true);
    callApi({
      config: {
        url: `${host.api}/api/v2/master/unit/detail`,
        method: 'GET',
        params: {
          id: value.id,
        },
      },
      onSuccess: (response) => {
        dataDetail.value = response.data.data;
        showDialogDetail.value = true;
        setLoading(false);
      },
      onError: () => {
        dataDetail.value = {};
        showDialogDetail.value = false;
        setLoading(false);
      },
    });
  };

  const openDialogConfirmation = (type, data, status = null) => {
    summaryConfirmation.value = {
      title:
        type === 'add'
          ? 'Tambah Data Unit'
          : type === 'edit'
            ? 'Simpan Data Unit'
            : type === 'status'
              ? 'Ubah Status'
              : 'Hapus Data Unit',
      message:
        type === 'add'
          ? 'Apakah Anda yakin menambah data unit ini?'
          : type === 'edit'
            ? 'Apakah Anda yakin mengubah dan menyimpan data unit ini?'
            : type === 'status'
              ? 'Apakah Anda yakin mengubah status unit ini? <br/>Dengan mengubah status user dari aktif menjadi non-aktif atau sebaliknya dapat mempengaruhi aksesibilitas user ini.'
              : 'Apakah Anda yakin akan menghapus data unit ini?',
      textCancel: 'Batalkan',
      textSubmit:
        type === 'add'
          ? 'Tambah Unit'
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
      summaryConfirmation.value.title.includes('Tambah') ||
      summaryConfirmation.value.title.includes('Simpan')
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
    textSubmitDialogForm,
    refForm,
  };
};
