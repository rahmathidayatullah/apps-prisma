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
      name: string;
      role: {
        name: string;
      };
      email: string;
    };
  };
}
