import { ref } from 'vue';
import { callApi } from '@/utils/api.js';
import { host } from '@/utils/constant.js';
import { ISummaryPagination } from '@/utils/interface.js';
import { useRouter } from 'vue-router';
import { setLoading } from '@/utils/store.js';

export const useFaktorEmisiTableActions = () => {
  const router = useRouter();
  const columns = ref([
    {
      key: 'nama_trx',
      title: 'Menu Laporan',
      sort: true,
      clickRow: true,
    },
  ]);
  const data = ref([]);
  const summaryEmptyData = ref({
    title: 'Data Faktor Emisi Belum Tersedia',
    subTitle: 'Silahkan menambahkan data faktor emisi terlebih dahulu',
  });
  const summaryPagination = ref(ISummaryPagination());
  const summarySearch = ref({
    placeholder: 'Cari Sesuatu',
    selected: '',
    listSearch: [
      {
        label: 'Menu Laporan',
        value: 'namaJenisLaporan',
      },
    ],
    popupWidth: '160px',
  });
  const selectedIndexSearch = ref(null);
  const search = ref(null);

  const getData = (page = 1, size = 10) => {
    setLoading(true);
    const params = {
      page: page - 1,
      size: size,
      sort: 'updatedDate,desc',
      ...(search.value &&
        (selectedIndexSearch.value
          ? { q: `${selectedIndexSearch.value}=ilike='${search.value}'` }
          : { q: `nama_jenis_laporan=ilike='${search.value}'` })),
    };
    callApi({
      config: {
        url: `${host.api}/api/v2/master/jenis-laporan/page`,
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
  };

  const gotoPageLaporan = (value) => {
    router.push({
      name: 'MasterFaktorEmisiData',
      query: { id: value.id },
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
    search,
    gotoPageLaporan,
  };
};
