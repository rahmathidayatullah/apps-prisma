export interface stateGlobalAuth {
  auth: initialStateGlobalAuth;
}

export interface initialStateGlobalAuth {
  token: any;
  userData: userData;
  statusLogin: string;
  statusLogout: string;
  error?: string;
  response?: string;
  response2?: string;
  response3?: string;
}

export interface userData {
  access_token: string;
  user: {
    name: string;
    role: {
      name: string;
    };
    shift: {
      start_time: string;
      end_time: string;
    };
  };
}
