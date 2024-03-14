export interface stateGlobalAttendaces {
  attendaces: initialStateGlobalAttendaces;
}

export interface initialStateGlobalAttendaces {
  page: number;
  take: number;
  order: string;
  statusListAttendaces: string;
  statusAttendacesDetail: string;
  dataListAttendaces: any;
}
