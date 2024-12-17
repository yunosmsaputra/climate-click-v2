import { ref } from 'vue'
import { callApi } from '@/utils/api.js'
import { host } from '@/utils/constant.js'

export const useComboboxActions = () => {
  const comboboxProvinsiList = ref([])
  const comboboxKotaList = ref([])
  const comboboxKecamatanList = ref([])
  const comboboxKelurahanList = ref([])
  const comboboxUnitList = ref([])
  const comboboxGridList = ref([])
  const comboboxRegionalList = ref([])
  const comboboxJenisPembangkitList = ref([])
  const comboboxTipeBoilerList = ref([])
  const comboboxJenisGasList = ref([])
  const comboboxFaktorEmisiList = ref([])
  const comboboxChildUnitList = ref([])
  const comboboxVariableFaktorEmisiList = ref([])

  const getComboboxProvinsilist = () => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/address/provinsi`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
        },
      },
      onSuccess: (response) => {
        comboboxProvinsiList.value = response.data.data
      },
      onError: () => {
        comboboxProvinsiList.value = []
      },
    })
  }

  const getComboboxKotaList = (provId = null) => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/address/kota`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
          ...(provId && { provinsiId: provId }),
        },
      },
      onSuccess: (response) => {
        comboboxKotaList.value = response.data.data
      },
      onError: () => {
        comboboxKotaList.value = []
      },
    })
  }

  const getComboboxKecamatanList = (kotaId = null) => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/address/kecamatan`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
          ...(kotaId && { kotaId: kotaId }),
        },
      },
      onSuccess: (response) => {
        comboboxKecamatanList.value = response.data.data
      },
      onError: () => {
        comboboxKecamatanList.value = []
      },
    })
  }

  const getComboboxKelurahanList = (kecamatanId = null) => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/address/kelurahan`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
          ...(kecamatanId && { kecamatanId: kecamatanId }),
        },
      },
      onSuccess: (response) => {
        comboboxKelurahanList.value = response.data.data
      },
      onError: () => {
        comboboxKelurahanList.value = []
      },
    })
  }

  const getComboboxListUnit = () => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/unit/list`,
        method: 'GET',
        params: {
          sortBy: 'level',
          direction: 'asc',
        },
      },
      onSuccess: (response) => {
        comboboxUnitList.value = response.data.data
      },
      onError: () => {
        comboboxUnitList.value = []
      },
    })
  }

  const getComboboxGridList = () => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/grid`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
        },
      },
      onSuccess: (response) => {
        comboboxGridList.value = response.data.data
      },
      onError: () => {
        comboboxGridList.value = []
      },
    })
  }

  const getComboboxRegionalList = () => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/regional`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
        },
      },
      onSuccess: (response) => {
        comboboxRegionalList.value = response.data.data
      },
      onError: () => {
        comboboxRegionalList.value = []
      },
    })
  }

  const getComboboxJenisPembangkitList = () => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/jenis-pembangkit`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
        },
      },
      onSuccess: (response) => {
        comboboxJenisPembangkitList.value = response.data.data
      },
      onError: () => {
        comboboxJenisPembangkitList.value = []
      },
    })
  }

  const getComboboxTipeBoilerList = () => {
    callApi({
      config: {
        url: `${host.api}/api/combo-box/tipe-boiler`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
        },
      },
      onSuccess: (response) => {
        comboboxTipeBoilerList.value = response.data.data
      },
      onError: () => {
        comboboxTipeBoilerList.value = []
      },
    })
  }

  const getComboboxJenisGasList = () => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/faktor-emisi/list`,
        method: 'GET',
        params: {
          sortBy: 'nama',
          direction: 'asc',
          ...{ q: `jenisLaporan.namaTrx=ilike='fugitive apar'` },
        },
      },
      onSuccess: (response) => {
        comboboxJenisGasList.value = response.data.data
      },
      onError: () => {
        comboboxJenisGasList.value = []
      },
    })
  }

  const getComboboxFaktorEmisiList = (query) => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/faktor-emisi/list`,
        method: 'GET',
        params: {
          ...(query && { q: query }),
          sort: `nama,asc`,
        },
      },
      onSuccess: (response) => {
        comboboxFaktorEmisiList.value = response.data.data
      },
      onError: () => {
        comboboxFaktorEmisiList.value = []
      },
    })
  }

  const getComboboxChildUnitList = (unitParent) => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/unit/list-child`,
        method: 'GET',
        params: {
          id: unitParent,
        },
      },
      onSuccess: (response) => {
        comboboxChildUnitList.value = response.data.data
      },
      onError: () => {
        comboboxChildUnitList.value = []
      },
    })
  }

  const getComboboxVariableFaktorEmisi = (query) => {
    callApi({
      config: {
        url: `${host.api}/api/v2/master/variabel-faktor-emisi/list`,
        method: 'GET',
        params: {
          ...(query && { q: query }),
          sort: `nama,asc`,
        },
      },
      onSuccess: (response) => {
        comboboxVariableFaktorEmisiList.value = response.data.data
      },
      onError: () => {
        comboboxVariableFaktorEmisiList.value = []
      },
    })
  }

  return {
    comboboxProvinsiList,
    comboboxKotaList,
    comboboxKecamatanList,
    comboboxKelurahanList,
    comboboxUnitList,
    comboboxGridList,
    comboboxRegionalList,
    comboboxJenisPembangkitList,
    comboboxTipeBoilerList,
    comboboxJenisGasList,
    comboboxFaktorEmisiList,
    comboboxChildUnitList,
    comboboxVariableFaktorEmisiList,
    getComboboxProvinsilist,
    getComboboxKotaList,
    getComboboxKecamatanList,
    getComboboxKelurahanList,
    getComboboxListUnit,
    getComboboxGridList,
    getComboboxRegionalList,
    getComboboxJenisPembangkitList,
    getComboboxTipeBoilerList,
    getComboboxJenisGasList,
    getComboboxFaktorEmisiList,
    getComboboxChildUnitList,
    getComboboxVariableFaktorEmisi,
  }
}
