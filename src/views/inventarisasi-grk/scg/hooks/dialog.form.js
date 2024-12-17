import { ref } from 'vue';

export const useScgDialogFormActions = () => {
  const showDialog = ref(false);
  const titleDialog = ref('');
  const activeLaporan = ref('sendiri');
  const paramsForm = ref({});
  const isPreview = ref(false);
  const columnPreviewBahanBakar = ref([
    {
      key: 'statusMilik',
      title: 'Status Milik',
      sort: true,
      clickRow: true,
    },
    {
      key: 'bahanBakar',
      title: 'Bahan Bakar',
      sort: true,
      clickRow: true,
    },
    {
      key: 'konsumsi',
      title: 'Konsumsi (liter)',
      sort: true,
      clickRow: true,
    },
    {
      key: 'emisico2',
      title: 'Emisi CO₂ (tCO₂)',
      sort: true,
      clickRow: true,
    },
    {
      key: 'emisin2o',
      title: 'Emisi N₂O (tN₂O)',
      sort: true,
      clickRow: true,
    },
    {
      key: 'emisich4',
      title: 'Emisi CH₄ (tN₂O)',
      sort: true,
      clickRow: true,
    },
    {
      key: 'emisico2e',
      title: 'Emisi CO₂e (tCO₂e)',
      sort: true,
      clickRow: true,
    },
  ]);
  const dataPreviewBahanBakar = ref([
    {
      statusMilik: 'Milik PLN Group',
      bahanBakar: 'Biosolar (B30)',
      konsumsi: 287000,
      emisico2: 73.28,
      emisin2o: 43.27,
      emisich4: 880,
      emisico2e: 880,
    },
  ]);

  const openDialogForm = () => {
    titleDialog.value = 'Form Laporan Stationary Combustion Genset';
    paramsForm.value = {
      dataBahanBakar: [
        {
          konsumsiBahanBakar: null,
        },
      ],
    };
    showDialog.value = true;
  };

  const addBahanBakar = () => {
    paramsForm.value.dataBahanBakar.push({
      konsumsiBahanBakar: null,
    });
  };

  const subtractBahanBakar = (index) => {
    paramsForm.value.dataBahanBakar.splice(index, 1);
    console.log(paramsForm.value);
  };

  const closeDialogForm = () => {
    showDialog.value = false;
  };

  const onSaveDraft = () => {
    console.log(paramsForm.value);
  };

  const onPreview = () => {
    isPreview.value = true;
  };

  return {
    showDialog,
    openDialogForm,
    closeDialogForm,
    titleDialog,
    activeLaporan,
    paramsForm,
    addBahanBakar,
    subtractBahanBakar,
    onSaveDraft,
    isPreview,
    onPreview,
    columnPreviewBahanBakar,
    dataPreviewBahanBakar,
  };
};
