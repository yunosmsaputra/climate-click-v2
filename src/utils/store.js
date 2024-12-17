import { reactive } from 'vue';

export const breadcrumbStore = reactive({
  breadcrumbs: [],
  activeBreadcrumb: '',
});

export const updateBreadcrumb = (newBreadcrumb, active) => {
  breadcrumbStore.breadcrumbs = newBreadcrumb;
  breadcrumbStore.activeBreadcrumb = active;
};

export const loading = reactive({
  value: false,
});

export const setLoading = (state) => {
  loading.value = state;
};
