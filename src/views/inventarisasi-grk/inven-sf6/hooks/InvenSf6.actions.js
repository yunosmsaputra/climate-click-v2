import { ref } from 'vue';

export const useInvenSf6Actions = () => {
  const activeTab = ref('Semua Laporan');
  return {
    activeTab,
  };
};
