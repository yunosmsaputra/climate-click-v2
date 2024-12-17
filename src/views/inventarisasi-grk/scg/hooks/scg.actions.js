import { ref } from 'vue';

export const useScgActions = () => {
  const activeTab = ref('Semua Laporan');

  return {
    activeTab,
  };
};
