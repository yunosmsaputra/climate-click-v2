export const statusLaporan = (key, output = 'label') => {
  const statusList = [
    { key: 'DRAFT', label: 'Draft', chipColor: 'blue' },
    {
      key: 'MENUNGGU_PERSETUJUAN_UI_SH',
      label: 'Menunggu Persetujuan UI/SH',
      chipColor: 'yellow',
    },
    {
      key: 'MENUNGGU_PERSETUJUAN_DIVTEK',
      label: 'Menunggu Persetujuan DIVTEK',
      chipColor: 'yellow',
    },
    {
      key: 'MENUNGGU_PERSETUJUAN_DIVAKT',
      label: 'Menunggu Persetujuan DIVAKT',
      chipColor: 'yellow',
    },
    { key: 'DITOLAK_OLEH_UI_SH', label: 'Ditolak UI/SH', chipColor: 'red' },
    { key: 'DITOLAK_OLEH_DIVAKT', label: 'Ditolak DIVAKT', chipColor: 'red' },
    { key: 'DITOLAK_OLEH_DIVTEK', label: 'Ditolak DIVTEK', chipColor: 'red' },
    { key: 'FINAL', label: 'Final', chipColor: 'green' },
    {
      key: 'PERMINTAAN_REVISI_DIVTEK',
      label: 'Permintaan Revisi DIVTEK',
      chipColor: 'red',
    },
    {
      key: 'PERMINTAAN_REVISI_UI_SH',
      label: 'Permintaan Revisi UI/SH',
      chipColor: 'red',
    },
  ];
  const result = statusList.find((item) => item.key === key);
  return result ? (output ? result[output] : result.label) : null;
};
