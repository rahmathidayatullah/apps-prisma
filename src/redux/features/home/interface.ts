export interface itemShowMenuItem {
  cuti?: boolean;
  lembur?: boolean;
  izin?: boolean;
  pengajuan?: boolean;
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

  // pengajuan

  valueDefaultEndDateSubmission: any | Date;
  valueEndDateSubmission: string;

  valueDefaultEndTimeSubmission: any | Date;
  valueEndTimeSubmission: string;

  showPickerEndDateSubmission: boolean;
  showPickerEndTimeSubmission: boolean;

  valueDefaultStartDateSubmission: any | Date;
  valueStartDateSubmission: string;

  valueDefaultStartTimeSubmission: any | Date;
  valueStartTimeSubmission: string;

  showPickerStartDateSubmission: boolean;
  showPickerStartTimeSubmission: boolean;

  descriptionSubmission: string;
  selectCategorySubmission: string;
  attachmentFileSubmission: string | string[];

  file1Submission: any;
  file2Submission: any;
  statusSubmitSubmission: string;

  // lembur/overtime
  valueDefaultEndDateOvertime: any | Date;
  valueEndDateOvertime: string;

  valueDefaultEndTimeOvertime: any | Date;
  valueEndTimeOvertime: string;

  showPickerEndDateOvertime: boolean;
  showPickerEndTimeOvertime: boolean;

  valueDefaultStartDateOvertime: any | Date;
  valueStartDateOvertime: string;

  valueDefaultStartTimeOvertime: any | Date;
  valueStartTimeOvertime: string;

  showPickerStartDateOvertime: boolean;
  showPickerStartTimeOvertime: boolean;

  descriptionOvertime: string;
  selectCategoryOvertime: string;
  attachmentFileOvertime: any;
  file1Overtime: null;

  statusSubmitOvertime: string;

  // clock in
  statusClockIn: string;
}
