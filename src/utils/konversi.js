export const konversiRibuan = (number) => {
  const formattedNumber = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number)

  return Number.isNaN(formattedNumber) ? 0 : formattedNumber
}

export const convertNumberForSave = (number) => {
  return number ? parseFloat(number.toString().split('.').join('').split(',').join('.')) : 0
}

export const convertNumberToForm = (number) => {
  return number ? number.toString().split('.').join(',') : '0'
}

export const checkFileExtensionPreview = (filename) => {
  const fileExtension = filename.split('.')[filename.split('.').length - 1]
  if (
    fileExtension === 'pdf' ||
    fileExtension === 'png' ||
    fileExtension === 'jpg' ||
    fileExtension === 'jpeg'
  ) {
    return true
  } else {
    return false
  }
}
