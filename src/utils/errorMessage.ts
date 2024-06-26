export function NotifError(dataError: any) {
  if (dataError?.response?.data?.message) {
    return `${dataError?.response?.data?.message}`;
  }
  return `${dataError?.code} Terjadi kesalahan ${dataError?.code}, silahkan coba lagi .`;
}
