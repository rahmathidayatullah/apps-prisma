export interface itemShowMenuItem {
  cuti?: boolean;
  lembur?: boolean;
  izin?: boolean;
}

export interface stateGlobalHome {
  home: {
    isShowMenuItem: itemShowMenuItem;
  };
}

export interface initialStateGlobalHome {
  isShowMenuItem: itemShowMenuItem;
}
