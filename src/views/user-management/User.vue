<script setup>
import { AmButton, AmIcon } from 'amyun-ui-vue';
import HeaderPage from '@/components/HeaderPage.vue';
import { blueColorLib, neutralColorLib } from '@/utils/constant.js';
import { useUserManagementAction } from '@/views/user-management/User.actions.js';
import ContentSection from '@/components/ContentSection.vue';
import { onMounted } from 'vue';
import UserDialogForm from '@/views/user-management/partials/Dialog.form.vue';
import DialogConfirmation from '@/components/DialogConfirmation.vue';
import DialogAlert from '@/components/DialogAlert.vue';
import TableWithPagination from '@/components/TableWithPagination.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import UserManagementDialogDetail from '@/views/user-management/partials/Dialog.detail.vue';
import { useComboboxActions } from '@/utils/combobox.js';

defineOptions({
  name: 'UserManagementV2Page',
});

const {
  columns,
  data,
  summaryEmptyData,
  getData,
  summaryPagination,
  onChangePage,
  onChangeDataSize,
  summarySearch,
  onSelectedIndexSearch,
  onSearch,
  showDialogForm,
  openDialogForm,
  closeDialogForm,
  titleDialogForm,
  paramsForm,
  onSave,
  onDetail,
  showDialogDetail,
  dataDetail,
  showDialogConfirmation,
  openDialogConfirmation,
  closeDialogConfirmation,
  summaryConfirmation,
  handleSubmitConfirmation,
  showDialogAlert,
  summaryAlert,
  closeDialogAlert,
  listBahanBakar,
  textSubmitDialogForm,
} = useUserManagementAction();

const { comboboxUnitList, getComboboxListUnit } = useComboboxActions();

onMounted(() => {
  getData();
  getComboboxListUnit();
});
</script>

<template>
  <HeaderPage title="User Management">
    <template #action>
      <AmButton
        @click="
          () => {
            openDialogForm();
          }
        "
      >
        <template #prepend>
          <AmIcon
            name="plus"
            :size="14"
            :color="neutralColorLib.white"
          ></AmIcon>
        </template>
        Tambah User
      </AmButton>
    </template>
  </HeaderPage>
  <ContentSection>
    <div class="px-4 py-3 rounded-lg bg-white mt-3">
      <SearchBarComponent
        :summary-search="summarySearch"
        @on-search="onSearch"
        @on-selected-index-search="onSelectedIndexSearch"
      >
        <template #additional>
          <AmButton
            type="ghost"
            :color="neutralColorLib.divider"
            class="text-netral-textDisabled"
          >
            <template #prepend>
              <AmIcon
                name="filter"
                :color="blueColorLib.main"
                :size="14"
              ></AmIcon>
            </template>
            Filter
          </AmButton>
          <AmButton
            type="ghost"
            :color="neutralColorLib.divider"
            class="text-netral-textDisabled"
          >
            <template #prepend>
              <AmIcon
                name="document"
                :color="blueColorLib.main"
                :size="14"
              ></AmIcon>
            </template>
            Export
          </AmButton>
        </template>
      </SearchBarComponent>
      <TableWithPagination
        :columns="columns"
        :data="data"
        :summary-empty-data="summaryEmptyData"
        :summary-pagination="summaryPagination"
        @on-change-page="onChangePage"
        @on-change-data-size="onChangeDataSize"
        @on-click-row="onDetail"
        class="mt-3"
      ></TableWithPagination>
    </div>
  </ContentSection>
  <UserDialogForm
    :is-show="showDialogForm"
    @on-close="closeDialogForm"
    :title="titleDialogForm"
    :params="paramsForm"
    :combobox-unit-list="comboboxUnitList"
    @on-save="
      () => {
        openDialogConfirmation(
          titleDialogForm === 'Tambah User Management' ? 'add' : 'edit',
        );
      }
    "
    :text-submit="textSubmitDialogForm"
  />
  <UserManagementDialogDetail
    :is-show="showDialogDetail"
    :data="dataDetail"
    @on-close="showDialogDetail = false"
    @on-edit="
      (data) => {
        openDialogForm(data);
      }
    "
  />
  <DialogConfirmation
    :is-show="showDialogConfirmation"
    @on-close="closeDialogConfirmation"
    :summary-confirmation="summaryConfirmation"
    @on-submit="handleSubmitConfirmation"
  />
  <DialogAlert
    :is-show="showDialogAlert"
    @on-close="closeDialogAlert"
    :summary-alert="summaryAlert"
  />
</template>

<style scoped></style>
