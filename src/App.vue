<script setup>
import Navbar from '@/components/Navbar.vue'
import {
  AmSideBar,
  AmSideBarMenuList,
  AmSideBarMenuIcon,
  AmSideBarMenuIconText,
  AmSideBarAppIcon,
} from 'amyun-ui-vue'
import { useRouter } from 'vue-router'
import AppIconMini from '@/assets/icons/app-icon-mini.vue'
import AppIconMain from '@/assets/icons/app-icon-main.vue'
import Loading from '@/components/Loading.vue'
import { loading } from '@/utils/store.js'

const router = useRouter()
</script>

<template>
  <!--  <Loading v-if="loading.value"></Loading>-->
  <AmSideBar>
    <template #normal>
      <AmSideBarAppIcon class="px-[6px] pb-6">
        <app-icon-mini></app-icon-mini>
      </AmSideBarAppIcon>
      <AmSideBarMenuList>
        <AmSideBarMenuIcon icon="master" />
        <AmSideBarMenuIcon icon="setting" />
      </AmSideBarMenuList>
    </template>
    <template #wide>
      <AmSideBarAppIcon class="px-[6px] pb-6">
        <app-icon-main></app-icon-main>
      </AmSideBarAppIcon>
      <AmSideBarMenuList>
        <AmSideBarMenuIconText icon="master" @click="router.push('/master-unit')"
          >Master</AmSideBarMenuIconText
        >
        <AmSideBarMenuIconText icon="setting" @click="router.push('/user-management')"
          >User Management</AmSideBarMenuIconText
        >
      </AmSideBarMenuList>
    </template>
  </AmSideBar>
  <div class="w-[calc(100vw-70px)] ml-[70px]">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<style scoped></style>
