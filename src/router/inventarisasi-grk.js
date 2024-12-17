import InventarisasiGrkScgPage from '@/views/inventarisasi-grk/scg/index.vue'
import InventarisasiGrkMckPage from '@/views/inventarisasi-grk/mck/Mck.vue'
import InventarisasiGrkInvenSf6Page from '@/views/inventarisasi-grk/inven-sf6/InvenSf6.vue'
import FugitiveAparPage from '@/views/inventarisasi-grk/fugitiveApar/fugitiveApar.vue'
import InventarisasiGrkFugitiveAcRuanganPage from '@/views/inventarisasi-grk/fugitive-ac-ruangan/FugitiveAcRuangan.vue'
import InventarisasiGrkFugitiveAcKendaraanPage from '@/views/inventarisasi-grk/fugitive-ac-kendaraan/FugitiveAcKendaraan.vue'
import InventarisasiGrkFugitiveAcKulkasPage from '@/views/inventarisasi-grk/fugitive-ac-kulkas/FugitiveAcKulkas.vue'

const inventarisasiGrkRouter = () => {
  return [
    {
      path: '/inventarisasi-grk/scg',
      name: 'InventarisasiGrkScg',
      component: InventarisasiGrkScgPage,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Stationary Combustion Genset'],
        activeBreadcrumb: 'Stationary Combustion Genset',
      },
    },
    {
      path: '/inventarisasi-grk/mck',
      name: 'InventarisasiGrkMckPage',
      component: InventarisasiGrkMckPage,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Mobile Combustion Kendaraan'],
        activeBreadcrumb: 'Mobile Combustion Kendaraan',
      },
    },
    {
      path: '/inventarisasi-grk/inven-sf6',
      name: 'InventarisasiGrkInvenSf6',
      component: InventarisasiGrkInvenSf6Page,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Inven SF6'],
        activeBreadcrumb: 'Inven SF6',
      },
    },
    {
      path: '/inventarisasi-grk/fugitive-apar',
      name: 'FugitiveAparPage',
      component: FugitiveAparPage,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Fugitive APAR'],
        activeBreadcrumb: 'Fugitive APAR',
      },
    },
    {
      path: '/inventarisasi-grk/fugitive-ac-ruangan',
      name: 'InventarisasiGrkFugitiveAcRuangan',
      component: InventarisasiGrkFugitiveAcRuanganPage,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Fugitive AC Ruangan'],
        activeBreadcrumb: 'Fugitive AC Ruangan',
      },
    },
    {
      path: '/inventarisasi-grk/fugitive-ac-kendaraan',
      name: 'InventarisasiGrkFugitiveAcKendaraan',
      component: InventarisasiGrkFugitiveAcKendaraanPage,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Fugitive AC Kendaraan'],
        activeBreadcrumb: 'Fugitive AC Kendaraan',
      },
    },
    {
      path: '/inventarisasi-grk/fugitive-ac-kulkas',
      name: 'InventarisasiGrkFugitiveAcKulkas',
      component: InventarisasiGrkFugitiveAcKulkasPage,
      meta: {
        breadcrumb: ['Inventarisasi GRK', 'Fugitive AC Kulkas'],
        activeBreadcrumb: 'Fugitive AC Kulkas',
      },
    },
  ]
}

export default inventarisasiGrkRouter()
