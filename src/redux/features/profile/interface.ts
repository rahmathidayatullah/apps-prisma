export interface stateGlobalProfile {
  profile: initialStateGlobalProfile;
}

export interface typeStatusList {
  idle: string;
  process: string;
  success: string;
  error: string;
}

export interface initialStateGlobalProfile {
  status: string;
  profile: {
    overtime: {
      clockIn: string | null;
      clockOut: string | null;
      id: string | null;
    };
    clockIn?: string | null;
    clockOut?: string | null;
    workStatus?: any;
    user: {
      name: string | null;
      role: {
        name: string | null;
      };
      email: string | null;
      phoneNumber: string | null;
      emergencyContact: string | null;
      address: string | null;
      // gender: string | null;
      npwp: string | null;
      no_nrp: string | null;
      nik: string | null;
      photo?: string | undefined;
    };
  };
  dataUpdateProfile?: any;
  statusUpdateProfile: string;
}
