export const ISummaryPagination = () => {
  return {
    page: 1,
    totalPage: 1,
    totalData: 0,
    dataSize: 10,
  };
};

export const ISummaryDialogConfirmation = () => {
  return {
    title: '',
    message: '',
    textCancel: '',
    textSubmit: '',
  };
};

export const ISummarySearch = () => {
  return {
    placeholder: 'Cari Sesuatu',
    selected: '',
    listSearch: [],
    popupWidth: '160px',
  };
};

export const ISummaryConfirmation = () => {
  return {
    title: '',
    message: '',
    textCancel: '',
    textSubmit: '',
    submitColor: '#2671D9',
    data: {},
  };
};

export const ISummaryAlert = () => {
  return {
    title: '',
    message: '',
    buttonText: '',
    isSuccess: true,
  };
};
