import CryptoJS from 'crypto-js'

export const host = {
  api: import.meta.env.VITE_API,
  grk: import.meta.env.VITE_API_GRK,
}

export const enc_key = {
  profile: 'CANDIC4rb0nProfile',
  auth: 'CANDIC4rb0nToken',
}

export const userProfile = JSON.parse(
  localStorage.getItem('profile')
    ? CryptoJS.AES.decrypt(localStorage.getItem('profile'), enc_key.profile).toString(
        CryptoJS.enc.Utf8
      )
    : '{}'
)

export const blueColorLib = {
  main: '#2671D9',
  surface: '#E9F1FB',
  hover: '#1D56A5',
  border: '#BAD1F3',
}

export const redColorLib = {
  main: '#FF5656',
  hover: '#C24C4C',
  border: '#FFD0D0',
  surface: '#FFEEEE',
}

export const greenColorLib = {
  main: '#0EA976',
  border: '#BCE7D8',
  surface: '#E7F6F1',
  hover: '#138A63',
}

export const yellowColorLib = {
  main: '#F08800',
  hover: '#cc7401',
  surface: '#FEF3E5',
  border: '#FBDEB7',
}

export const neutralColorLib = {
  white: '#FFFFFF',
  black: '#333333',
  stroke: '#E5E7E9',
  textField: '#9C9C9C',
  disbled: '#E0E0E0',
  textDisabled: '#7F7F80',
  background: '#F6F7FD',
  divider: '#F0F3F7',
  label: '#4D5E80',
  labelOption: '#7B8DAD',
}

export const monthFull = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
export const monthShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agt',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]
