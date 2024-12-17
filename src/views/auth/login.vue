<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { AmButton, AmCheckbox, AmTextField } from 'amyun-ui-vue'

defineOptions({
  name: 'LoginPage',
})

const store = useStore()
const router = useRouter()
const route = useRoute()
const token = ref('')
const role = ref([])

const handleClick = () => {
  const profile = {
    nama: 'John Doe',
    unit: {
      id: '02f1db67-aba4-4a69-97c5-06d22a08d8f4',
      nama: 'Unit Level 1',
    },
    role: role.value.join(','),
  }
  store.dispatch('auth/login', profile)
  store.dispatch('auth/setToken', token.value)
  window.location = '/inventarisasi-grk/inven-sf6'
}
</script>

<template>
  <div class="p-4">
    <AmTextField v-model="token" placeholder="Token"></AmTextField>
    <div class="flex items-center gap-x-3 mt-2">
      <AmCheckbox v-model="role" value="DIVTEK">DIVTEK</AmCheckbox>
      <AmCheckbox v-model="role" value="SUBMITTER">SUBMITTER</AmCheckbox>
      <AmCheckbox v-model="role" value="APPROVER">APPROVER</AmCheckbox>
    </div>
    <AmButton @click="handleClick" class="mt-2">Login</AmButton>
  </div>
</template>

<style scoped></style>
