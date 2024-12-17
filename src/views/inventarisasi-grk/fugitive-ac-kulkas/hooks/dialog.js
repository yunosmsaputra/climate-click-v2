import { nextTick, ref } from 'vue'
import { setLoading } from '@/utils/store.js'
import { callApi, callApiUpload } from '@/utils/api.js'
import { blueColorLib, host, redColorLib, userProfile } from '@/utils/constant.js'
import { ISummaryAlert, ISummaryConfirmation } from '@/utils/interface.js'
import {
  checkFileExtensionPreview,
  convertNumberForSave,
  convertNumberToForm,
} from '@/utils/konversi.js'

export const useFugitiveAcRuanganDialogActions = () => {
  const loadingDialog = ref(false)
  const loadingButton = ref(false)
  const showDialogForm = ref(false)
  const paramsForm = ref({
    periode: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    isUnitLaporanSendiri: true,
    data_list: [{}],
    id_unit: userProfile.unit.id,
  })
  const showDialogDetail = ref(false)
  const dataDetail = ref({})
  const showDialogConfirmation = ref(false)
  const summaryConfirmation = ref(ISummaryConfirmation())
  const showPratinjau = ref(false)
  const dataPratinjau = ref({})
  const showDialogAlert = ref(false)
  const summaryDialogAlert = ref(ISummaryAlert())
  const keteranganPenolakan = ref(null)
  const refForm = ref(null)
  const refFormReject = ref(null)
  const reFetchData = ref(false)

  const openDialogForm = (idEditData = null) => {
    refForm.value.initiate()
    reFetchData.value = false
    if (idEditData) {
      showDialogForm.value = true
      loadingDialog.value = true
      callApi({
        config: {
          url: `${host.grk}/api/v2/fugitive-ac-kulkas/detail`,
          method: 'GET',
          params: {
            id: idEditData,
          },
        },
        onSuccess: (response) => {
          paramsForm.value = {
            ...response.data.data,
            periode: {
              month: response.data.data.bulan,
              year: response.data.data.tahun,
            },
            isUnitLaporanSendiri: userProfile.unit.id === response.data.data.id_unit,
            ...(userProfile.unit.id !== response.data.data.id_unit && {
              unitChild: { id: response.data.data.id_unit, name: response.data.data.nama_unit },
            }),
            data_list: response.data.data.data_list.map((item) => ({
              ...item,
              penggunaan: convertNumberToForm(item.penggunaan),
              faktor_emisi: { id: item.id_faktor_emisi, nama: item.nama_faktor_emisi },
              variabel_faktor_emisi: {
                id: item.id_variabel_faktor_emisi,
                nama: item.nama_variabel_faktor_emisi,
              },
            })),
            ...(response.data.data.file_evidence_url && {
              file_evidence: [{ name: response.data.data.file_evidence_url }],
            }),
          }
          showDialogDetail.value = false
          loadingDialog.value = false
        },
        onError: () => {
          paramsForm.value = {}
          dataDetail.value = {}
          loadingDialog.value = false
        },
      })
    } else {
      paramsForm.value = {
        periode: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
        isUnitLaporanSendiri: true,
        data_list: [{}],
        id_unit: userProfile.unit.id,
        file: null,
      }
      showDialogForm.value = true
    }
  }

  const closeDialogForm = () => {
    showDialogForm.value = false
    paramsForm.value = {
      periode: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      isUnitLaporanSendiri: true,
      data_list: [{}],
      id_unit: userProfile.unit.id,
      file: null,
    }
    refForm.value.reset()
    showPratinjau.value = false
  }

  const addDataList = () => {
    paramsForm.value.data_list.push({})
  }

  const subtractDataList = (index) => {
    paramsForm.value.data_list.splice(index, 1)
  }

  const onSaveDraft = () => {
    openDialogConfirmation('draft')
  }

  const onPratinjau = () => {
    if (refForm.value.validate()) {
      loadingButton.value = true
      callApi({
        config: {
          url: `${host.api}/api/v2/master/unit/detail`,
          method: 'GET',
          params: {
            id: paramsForm.value.id_unit,
          },
        },
        onSuccess: (response) => {
          const list_unit = response.data.data.unitParentList.sort((a, b) => a.level - b.level)
          const dataList = paramsForm.value.data_list.map((item) => ({
            penggunaan: convertNumberForSave(item.penggunaan),
            id_faktor_emisi: item.faktor_emisi.id,
            id_variabel_faktor_emisi: item.variabel_faktor_emisi.id,
          }))
          callApi({
            config: {
              url: `${host.grk}/api/v2/fugitive-ac-kulkas/preview-hitung`,
              method: 'POST',
              data: {
                id_unit: userProfile.unit.id,
                bulan: paramsForm.value.periode.month,
                tahun: paramsForm.value.periode.year,
                data_list: dataList,
                ...(paramsForm.value.sumber_data && {
                  sumber_data: paramsForm.value.sumber_data,
                }),
              },
            },
            onSuccess: (resp) => {
              const file = paramsForm.value.file
              if (file) {
                const paramsTemp = paramsForm.value
                paramsForm.value = {
                  ...resp.data.data,
                  ...(paramsTemp.id && { id: paramsTemp.id }),
                  file: file,
                  preview_file: URL.createObjectURL(paramsForm.value.file[0]),
                  ...(paramsTemp.file_evidence_url && {
                    file_evidence_url: paramsTemp.file_evidence_url,
                  }),
                  created_date: paramsForm.value.created_date ?? new Date(),
                  updated_date: paramsForm.value.updated_date ?? new Date(),
                  status: paramsTemp.status ?? 'DRAFT',
                  list_unit: list_unit.map((item) => item.name),
                }
                showPratinjau.value = true
                loadingButton.value = false
              } else {
                callApi({
                  config: {
                    url: `${host.api}/api/minio/view`,
                    method: 'GET',
                    params: {
                      pathFile: paramsForm.value.file_evidence_url,
                    },
                  },
                  responseType: {
                    responseType: 'blob',
                  },
                  onSuccess: (res) => {
                    const blob = new Blob([res.data], { type: 'application/pdf' })
                    const paramsTemp = paramsForm.value
                    paramsForm.value = {
                      ...resp.data.data,
                      ...(paramsTemp.id && { id: paramsTemp.id }),
                      preview_file: URL.createObjectURL(blob),
                      fileUrl: paramsForm.value.file_evidence_url,
                      created_date: paramsForm.value.created_date ?? new Date(),
                      updated_date: new Date(),
                      status: paramsForm.value.status ?? 'DRAFT',
                      list_unit: list_unit.map((item) => item.name),
                    }
                    showPratinjau.value = true
                    loadingButton.value = false
                  },
                })
              }
            },
            onError: () => {
              showPratinjau.value = false
              loadingButton.value = false
            },
          })
        },
        onError: () => {
          showPratinjau.value = false
          loadingButton.value = false
          showDialogConfirmation.value = false
          summaryDialogAlert.value = {
            title: 'Gagal Hitung Emisi!',
            message: 'Gagal menghitung emisi, silahkan coba beberapa saat lagi.',
            isSuccess: false,
            buttonText: 'Kembali',
          }
          showDialogAlert.value = true
        },
      })
    } else {
      showDialogConfirmation.value = false
      summaryDialogAlert.value = {
        title: 'Gagal Hitung Emisi!',
        message:
          'Terdapat data yang belum lengkap, silahkan lengkapi data yang ditandai dengan warna merah',
        isSuccess: false,
        buttonText: 'Kembali',
      }
      showDialogAlert.value = true
    }
  }

  const onSave = () => {
    if (paramsForm.value.file) {
      setLoading(true)
      callApiUpload(paramsForm.value.file, {
        config: {
          url: `${host.api}/api/minio/upload`,
          method: 'POST',
        },
        onSuccess: (response) => {
          if (paramsForm.value.file_evidence) {
            deleteFile(false)
          }
          onSaveData(response.data.path)
        },
      })
    } else {
      onSaveData()
    }
  }

  const onSaveData = (filePath = null) => {
    const dataList = paramsForm.value.data_list.map((item) => ({
      penggunaan: convertNumberForSave(item.penggunaan),
      id_faktor_emisi: item.faktor_emisi.id,
      id_variabel_faktor_emisi: item.variabel_faktor_emisi.id,
    }))
    loadingButton.value = true
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/save`,
        method: 'POST',
        data: {
          id_unit: paramsForm.value.isUnitLaporanSendiri
            ? userProfile.unit.id
            : paramsForm.value.unitChild.id,
          bulan: paramsForm.value.periode.month,
          tahun: paramsForm.value.periode.year,
          data_list: dataList,
          ...(paramsForm.value.sumber_data && {
            sumber_data: paramsForm.value.sumber_data,
          }),
          ...(paramsForm.value.id && { id: paramsForm.value.id }),
          ...(filePath && { file_evidence_url: filePath }),
        },
      },
      onSuccess: () => {
        loadingButton.value = false
        closeDialogForm()
        showDialogConfirmation.value = false
        summaryDialogAlert.value = {
          title: 'Laporan Berhasil Disimpan!',
          message: 'Laporan yang adan buat telah berhasil disimpan sebagai draft',
          isSuccess: true,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
      },
      onError: (error) => {
        if (filePath) {
          paramsForm.value.file_evidence_url = filePath
          deleteFile(false)
        }
        loadingButton.value = false
        closeDialogForm()
        showDialogConfirmation.value = false
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Disimpan!',
          message:
            error.response.data.message ?? 'Periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Tutup',
        }
        showDialogAlert.value = true
      },
    })
  }

  const onDetail = (data) => {
    showDialogDetail.value = true
    loadingDialog.value = true
    reFetchData.value = false
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/detail`,
        method: 'GET',
        params: {
          id: data.id,
        },
      },
      onSuccess: (response) => {
        dataDetail.value = response.data.data
        if (
          dataDetail.value.file_evidence_url &&
          checkFileExtensionPreview(dataDetail.value.file_evidence_url)
        ) {
          getPreviewFile(dataDetail.value)
        } else {
          getUnitParent(dataDetail.value)
        }
      },
      onError: (err) => {
        dataDetail.value = {}
        loadingDialog.value = false
      },
    })
  }

  const getPreviewFile = (data) => {
    loadingDialog.value = true
    callApi({
      config: {
        url: `${host.api}/api/minio/view`,
        method: 'GET',
        params: {
          pathFile: data.file_evidence_url,
        },
      },
      responseType: {
        responseType: 'blob',
      },
      onSuccess: (response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        dataDetail.value.preview_file = URL.createObjectURL(blob)
        getUnitParent(dataDetail.value)
      },
      onError: () => {
        loadingDialog.value = false
      },
    })
  }

  const getUnitParent = (data, type = 'detail') => {
    loadingDialog.value = true
    callApi({
      config: {
        url: `${host.api}/api/v2/master/unit/detail`,
        method: 'GET',
        params: {
          id: data.id_unit,
        },
      },
      onSuccess: (response) => {
        const list_unit = response.data.data.unitParentList.sort((a, b) => a.level - b.level)
        if (type === 'detail') {
          dataDetail.value.list_unit = list_unit.map((item) => item.name)
          getRiwayatData(data)
        } else {
          dataPratinjau.value = {
            ...paramsForm.value,
            nama_unit: response.data.data.name,
            list_unit: list_unit.map((item) => item.name),
            preview_file: URL.createObjectURL(paramsForm.value.file[0]),
          }
          showPratinjau.value = true
          loadingDialog.value = false
        }
      },
      onError: () => {
        dataDetail.value = {}
        loadingDialog.value = false
      },
    })
  }

  const getRiwayatData = (data) => {
    loadingDialog.value = true
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/history`,
        method: 'GET',
        params: {
          id: data.id,
        },
      },
      onSuccess: (response) => {
        dataDetail.value.history_list = response.data.data
        loadingDialog.value = false
      },
      onError: () => {
        dataDetail.value = {}
        loadingDialog.value = false
      },
    })
  }

  const closeDialogDetail = () => {
    showDialogDetail.value = false
  }

  const openDialogConfirmation = (type = 'draft', data = null) => {
    reFetchData.value = false
    summaryConfirmation.value = {
      title:
        type === 'draft'
          ? 'Simpan Laporan Sebagai Draft'
          : type === 'send'
            ? 'Kirim Laporan ke UI/SH Pusat'
            : type === 'approve'
              ? 'Setujui Laporan'
              : type === 'reject'
                ? 'Tolak Laporan'
                : type === 'delete'
                  ? 'Hapus Laporan'
                  : 'Permintaan Revisi Laporan',
      message:
        type === 'draft'
          ? 'Laporan dengan status draft masih bisa untuk dilakukan perubahan data. Apakah Anda yakin untuk menyimpan laporan ini sebagai draft?'
          : type === 'send'
            ? 'Laporan ini akan dikirimkan ke UI/SH Pusat untuk dilakukan persetujuan laporan, dalam proses tersebut laporan tidak bisa diubah. Apakah Anda yakin untuk mengirimkan laporan ini?'
            : type === 'approve'
              ? 'Dengan menyetujui laporan ini status laporan akan menjadi final. Apakah Anda yakin untuk menyetujui laporan ini?'
              : type === 'reject'
                ? 'Apakah Anda yakin untuk menolak laporan ini?<br/>Silahkan masukkan keterangan penolakan dibawah ini'
                : type === 'delete'
                  ? 'Jika laporan dihapus maka laporan ini tidak dapat dikembalikan. Apakah Anda yakin untuk menghapus laporan ini?'
                  : 'Apakah Anda yakin untuk melakukan permintaan revisi pada laporan ini?<br/>Silahkan masukkan keterangan permintaan revisi dibawah ini',
      textCancel: 'Batalkan',
      textSubmit:
        type === 'draft'
          ? 'Simpan sebagai Draft'
          : type === 'send'
            ? 'Kirim Laporan'
            : type === 'approve'
              ? 'Setujui Laporan'
              : type === 'reject'
                ? 'Tolak Laporan'
                : type === 'delete'
                  ? 'Hapus Data'
                  : 'Revisi Laporan',
      submitColor:
        type === 'delete' || type === 'reject' || type === 'revisi'
          ? redColorLib.main
          : blueColorLib.main,
    }
    if (data) {
      paramsForm.value = data
    }
    showDialogConfirmation.value = true
    nextTick(() => {
      if (type === 'reject' || type === 'revisi') {
        refFormReject.value.initiate()
      }
    })
  }

  const backToForm = (params) => {
    showPratinjau.value = false
    paramsForm.value = {
      ...params,
      isUnitLaporanSendiri: userProfile.unit.id === params.id_unit,
      periode: { month: params.bulan, year: params.tahun },
      file_evidence_url: params.fileUrl,
      sumber_data: params.sumber_data,
    }
  }

  const uploadFile = () => {
    loadingButton.value = true
    callApiUpload(paramsForm.value.file, {
      config: {
        url: `${host.api}/api/minio/upload`,
        method: 'POST',
      },
      onSuccess: (response) => {
        if (paramsForm.value.file_evidence_url) {
          callApi({
            config: {
              url: `${host.api}/api/minio/delete`,
              method: 'POST',
              params: {
                pathFile: paramsForm.value.file_evidence_url,
              },
            },
            onSuccess: () => {
              sendLaporan(response.data.path)
            },
          })
        } else {
          sendLaporan(response.data.path)
        }
      },
      onError: () => {
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Dikirim!',
          message: 'Upload file gagal, periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Tutup',
        }
        showDialogAlert.value = true
        loadingButton.value = false
      },
    })
  }

  const sendLaporan = (fileUrl = null) => {
    loadingButton.value = true
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/kirim`,
        method: 'POST',
        data: {
          ...(paramsForm.value.id && { id: paramsForm.value.id }),
          id_unit: userProfile.unit.id,
          bulan: paramsForm.value.periode ? paramsForm.value.periode.month : paramsForm.value.bulan,
          tahun: paramsForm.value.periode ? paramsForm.value.periode.year : paramsForm.value.tahun,
          data_list: paramsForm.value.data_list,
          ...(paramsForm.value.sumber_data && {
            sumber_data: paramsForm.value.sumber_data,
          }),
          ...(paramsForm.value.id && { id: paramsForm.value.id }),
          ...(fileUrl
            ? { file_evidence_url: fileUrl }
            : { file_evidence_url: paramsForm.value.fileUrl }),
        },
      },
      onSuccess: () => {
        closeDialogConfirmation()
        closeDialogForm()
        summaryDialogAlert.value = {
          title: 'Laporan Berhasil Dikirim!',
          message: 'Laporan yang adan buat telah berhasil dikirim ke UI/SH Pusat',
          isSuccess: true,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        loadingButton.value = false
      },
      onError: (err) => {
        if (fileUrl) {
          paramsForm.value.file_evidence_url = fileUrl
          deleteFile(false)
        }
        showDialogConfirmation.value = false
        closeDialogForm()
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Dikirim!',
          message:
            err.response.data.message ?? 'Periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Tutup',
        }
        showDialogAlert.value = true
        loadingButton.value = false
      },
    })
  }

  const approveLaporan = () => {
    setLoading(true)
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/approve-ui-sh`,
        method: 'POST',
        data: {
          id: paramsForm.value.id,
        },
      },
      onSuccess: () => {
        closeDialogDetail()
        paramsForm.value = {}
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Berhasil Disetujui!',
          message: 'Status laporan yang anda setujui berhasil diubah menjadi Final',
          isSuccess: true,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
      onError: () => {
        closeDialogDetail()
        paramsForm.value = {}
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Disetujui!',
          message: 'Periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
    })
  }

  const closeDialogConfirmation = () => {
    showDialogConfirmation.value = false
    if (
      !summaryConfirmation.value.title.includes('Simpan') &&
      !summaryConfirmation.value.title.includes('Kirim')
    ) {
      paramsForm.value = {
        periode: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        isUnitLaporanSendiri: true,
        data_list: [{}],
        id_unit: userProfile.unit.id,
        file: null,
      }
    }
    keteranganPenolakan.value = ''
  }

  const handleSubmitConfirmation = () => {
    if (summaryConfirmation.value.title.includes('Draft')) {
      onSave()
    } else if (summaryConfirmation.value.title.includes('Kirim')) {
      if (paramsForm.value.file) {
        uploadFile()
      } else {
        sendLaporan()
      }
    } else if (summaryConfirmation.value.title.includes('Setujui')) {
      approveLaporan()
    } else if (summaryConfirmation.value.title.includes('Tolak')) {
      if (refFormReject.value.validate()) {
        rejectLaporan()
      }
    } else if (summaryConfirmation.value.title.includes('Hapus')) {
      if (paramsForm.value.file_evidence_url) {
        deleteFile(true)
      } else {
        deleteData()
      }
    } else if (summaryConfirmation.value.title.includes('Revisi')) {
      if (refFormReject.value.validate()) {
        revisiLaporan()
      }
    }
  }

  const deleteFile = (isDeleteData = false) => {
    setLoading(true)
    callApi({
      config: {
        url: `${host.api}/api/minio/delete`,
        method: 'POST',
        params: {
          pathFile: paramsForm.value.file_evidence_url ?? paramsForm.value.file_evidence[0].name,
        },
      },
      onSuccess: () => {
        if (isDeleteData) {
          deleteData()
        }
      },
      onError: (err) => {
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Dihapus!',
          message: 'Periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
    })
  }

  const deleteData = () => {
    setLoading(true)
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/delete`,
        method: 'POST',
        data: {
          id: paramsForm.value.id,
        },
      },
      onSuccess: () => {
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Berhasil Dihapus!',
          message: 'Laporan yang anda hapus tidak dapat dikembalikan kembali',
          isSuccess: true,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
      onError: () => {
        closeDialogDetail()
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Dihapus!',
          message: 'Periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
    })
  }

  const rejectLaporan = () => {
    loadingButton.value = true
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/tolak-ui-sh`,
        method: 'POST',
        data: {
          id: paramsForm.value.id,
          keterangan_tolak: keteranganPenolakan.value,
        },
      },
      onSuccess: () => {
        closeDialogConfirmation()
        closeDialogDetail()
        summaryDialogAlert.value = {
          title: 'Laporan Berhasil Ditolak!',
          message:
            'Laporan yang ditolak berhasil dikembalikan ke unit pelapor untuk dilakukan perbaikan laporan',
          isSuccess: true,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        loadingButton.value = false
      },
      onError: () => {
        closeDialogDetail()
        closeDialogConfirmation()
        summaryDialogAlert.value = {
          title: 'Laporan Gagal Ditolak!',
          message: 'Periksa koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        loadingButton.value = false
      },
    })
  }

  const revisiLaporan = () => {
    setLoading(true)
    callApi({
      config: {
        url: `${host.grk}/api/v2/fugitive-ac-kulkas/revisi-divtek`,
        method: 'POST',
        data: {
          id: paramsForm.value.id,
          keterangan_tolak: keteranganPenolakan.value,
        },
      },
      onSuccess: () => {
        closeDialogConfirmation()
        closeDialogDetail()
        summaryDialogAlert.value = {
          title: 'Permintaan Revisi Berhasil Dikirim!',
          message: 'Permintaan revisi laporan berhasil dikirim ke unit untuk dilakukan revisi',
          isSuccess: true,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
      onError: () => {
        closeDialogConfirmation()
        closeDialogDetail()
        summaryDialogAlert.value = {
          title: 'Permintaan Revisi Gagal Dikirim!',
          message: 'Pastikan koneksi internet Anda terhubung dan stabil',
          isSuccess: false,
          buttonText: 'Arahkan Halaman Pelaporan',
        }
        showDialogAlert.value = true
        setLoading(false)
      },
    })
  }

  const closeDialogAlert = () => {
    showDialogAlert.value = false
    reFetchData.value = true
  }

  return {
    loadingDialog,
    loadingButton,
    showDialogForm,
    openDialogForm,
    closeDialogForm,
    onSaveDraft,
    paramsForm,
    addDataList,
    subtractDataList,
    onDetail,
    dataDetail,
    showDialogDetail,
    closeDialogDetail,
    openDialogConfirmation,
    showDialogConfirmation,
    summaryConfirmation,
    onSave,
    onPratinjau,
    showPratinjau,
    dataPratinjau,
    backToForm,
    showDialogAlert,
    summaryDialogAlert,
    sendLaporan,
    closeDialogConfirmation,
    handleSubmitConfirmation,
    keteranganPenolakan,
    refForm,
    refFormReject,
    reFetchData,
    closeDialogAlert,
  }
}
