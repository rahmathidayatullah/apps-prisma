export interface stateGlobalSubmissions {
  submissions: initialStateGlobalSubmissions;
}

export interface initialStateGlobalSubmissions {
  statusListSubmissions: string;
  statusSubmissionsDetail: string;
  listCategorySubmission: any;
  statusListCategorySubmission: string;
  dataListSubmissions: any;
  page: number;
  take: number;
  order: string;
  keyword: string,
  startDate: string,
  endDate: string,
}
