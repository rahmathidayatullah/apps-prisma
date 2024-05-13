export function NotifError(dataError: any) {
  if (dataError?.response?.data?.message) {
    return `${dataError?.code} ${dataError?.response?.data?.message}, silahkan coba lagi`;
  }
  return `Terjadi kesalahan ${dataError?.code}, silahkan coba lagi .`;
}
