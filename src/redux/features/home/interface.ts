export interface itemShowMenuItem {
  cuti?: boolean;
  lembur?: boolean;
  izin?: boolean;
  // clock in clock out
  clockIn?: boolean;
  clockOut?: boolean;
  // clock in clock out overtime
  clockInOvertime?: boolean;
  clockOutOvertime?: boolean;
}

export interface stateGlobalHome {
  home: initialStateGlobalHome;
}

export interface initialStateGlobalHome {
  isShowMenuItem: itemShowMenuItem;
  dateClockIn: string | null;
  dateClockOut: string | null;
  dateClockInOvertime: string | null;
  dateClockOutOvertime: string | null;

  imageSelfie: string;
  latitide: string;
  longitude: string;

  name: string;
  role: string;
  imageProfile: string;
  timeWork: string;
  statusWork: string; // "Work Shift" | "Day Off" ,

  // cuti
  valueDefaultEndDate?: any;
  valueEndDate: string;
  showPickerEndDate: boolean;
  valueDefaultStartDate?: any;
  valueStartDate: string;
  showPickerStartDate: boolean;
  // izin
  valueDefaultEndDatePermission?: any;
  valueEndDatePermission: string;
  showPickerEndDatePermission: boolean;
  valueDefaultStartDatePermission?: any;
  valueStartDatePermission: string;
  showPickerStartDatePermission: boolean;
  reason: string;
}
