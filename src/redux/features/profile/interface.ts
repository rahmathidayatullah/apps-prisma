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
