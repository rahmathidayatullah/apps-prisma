export interface stateGlobalOvertimes {
  overtimes: initialStateGlobalOvertimes;
}

export interface initialStateGlobalOvertimes {
  page: number;
  take: number;
  order: string;
  statusListOvertimes: string;
  dataListOvertimes: any;
}
