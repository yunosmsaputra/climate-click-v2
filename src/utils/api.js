import axios from 'axios'
import CryptoJS from 'crypto-js'
import { enc_key } from '@/utils/constant.js'

export const callApi = ({ config, headers, responseType, onSuccess, onError, onFinish }) => {
  axios({
    ...config,
    headers: {
      Authorization: `Bearer ${CryptoJS.AES.decrypt(localStorage.getItem('auth'), enc_key.auth).toString(CryptoJS.enc.Utf8)}`,
      ...headers,
    },
    ...responseType,
  })
    .then((res) => onSuccess && onSuccess(res))
    .catch((err) => onError && onError(err))
    .finally(() => onFinish && onFinish())
}

export const callApiUpload = (file, { config, onSuccess, onError, onFinish }) => {
  const fileName = file[0].name
    .replace(/[^a-zA-Z0-9.]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
  const renamedFile = new File([file[0]], fileName, {
    type: file[0].type,
  })
  const formData = new FormData()
  formData.append('file', renamedFile)
  axios({
    ...config,
    data: formData,
    headers: {
      Authorization: `Bearer ${CryptoJS.AES.decrypt(localStorage.getItem('auth'), enc_key.auth).toString(CryptoJS.enc.Utf8)}`,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => onSuccess && onSuccess(res))
    .catch((err) => onError && onError(err))
    .finally(() => onFinish && onFinish())
}
