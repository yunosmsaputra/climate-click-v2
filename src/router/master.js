import MasterFaktorEmisi from '@/views/master/faktor-emisi/FaktorEmisi.vue';
import MasterUnitPage from '@/views/master/unit/Unit.vue';
import PageLaporanFaktorEmisi from '@/views/master/faktor-emisi/partials/page-laporan/PageLaporan.vue';
import BahanBakarSCKPage from '@/views/master/bahan-bakar-sck/BahanBakarSck.vue';

const MasterRouter = () => {
  return [
    {
      path: '/master/faktor-emisi',
      name: 'MasterFaktorEmisi',
      component: MasterFaktorEmisi,
      meta: {
        breadcrumb: ['Master', 'Faktor Emisi'],
        activeBreadcrumb: 'Faktor Emisi',
      },
    },
    {
      path: '/master/faktor-emisi-data',
      name: 'MasterFaktorEmisiData',
      component: PageLaporanFaktorEmisi,
      meta: {
        breadcrumb: ['Master', 'Faktor Emisi'],
        activeBreadcrumb: 'Faktor Emisi',
      },
    },
    {
      path: '/master/unit',
      name: 'MasterUnit',
      component: MasterUnitPage,
      meta: {
        breadcrumb: ['Master', 'Unit'],
        activeBreadcrumb: 'Unit',
      },
    },
    {
      path: '/master/bahan-bakar-sck',
      name: 'MasterBahanBakarSCK',
      component: BahanBakarSCKPage,
      meta: {
        breadcrumb: ['Master', 'Bahan Bakar SCK'],
        activeBreadcrumb: 'Bahan Bakar SCK',
      },
    },
  ];
};

export default MasterRouter();
