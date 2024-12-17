import { ref } from 'vue';

export const useFugitiveAparActions = () => {
  const activeTab = ref('Semua Laporan');
  return {
    activeTab,
  };
};
