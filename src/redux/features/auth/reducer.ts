import {
  START_LOGIN,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  START_LOGOUT,
  SUCCESS_LOGOUT,
  ERROR_LOGOUT,
} from './constants';

import {initialStateGlobalAuth} from './interface';

// {
//   "status": true,
//   "message": "Success",
//   "data": {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhyZEBtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzA5ODE3NDUwLCJleHAiOjE3MDk4MjEwNTB9.hwyQ-AC5Y_Rxe4AbVHKdsxnGgTzV4jdi_WTB08GkpPw",
//     "user": {
//       "id": 1,
//       "name": "Lina",
//       "email": "hrd@mail.com",
//       "password": "$2b$10$tg2Bb5I5vtZuBhrn.PR0T.tb8agU5vMyj1.NkZw4gy19HWCOJ8vPW",
//       "no_nrp": "00721",
//       "start_work_date": null,
//       "role": {
//         "id": 1,
//         "name": "HRD Intiprime",
//         "createdAt": "2024-03-07T13:14:14.979Z",
//         "updatedAt": "2024-03-07T13:14:14.979Z",
//         "deletedAt": null,
//         "company": {
//           "id": 1,
//           "name": "PT Prime Inti Development",
//           "alias": "PID",
//           "createdAt": "2024-03-07T13:13:11.574Z",
//           "updatedAt": "2024-03-07T13:13:11.574Z",
//           "deletedAt": null
//         }
//       },
//       "shift": {
//         "id": 1,
//         "name": "Shift 1",
//         "start_time": "08:00:00",
//         "end_time": "17:00:00",
//         "createdAt": "2024-03-07T13:14:46.161Z",
//         "updatedAt": "2024-03-07T13:14:46.161Z",
//         "deletedAt": null
//       }
//     }
//   }
// }

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState: initialStateGlobalAuth = {
  token: null,
  userData: {
    access_token: '',
    user: {
      name: '',
      role: {
        name: '',
      },
      shift: {
        start_time: '',
        end_time: '',
      },
    },
  },
  statusLogin: statusList.idle,
  statusLogout: statusList.idle,

  // error: '',
  // response: '',
  // response2: '',
  // response3: '',
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        statusLogin: statusList.process,
      };
    case SUCCESS_LOGIN:
      return {
        ...state,
        statusLogin: statusList.success,
        userData: action.userData,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        statusLogin: statusList.error,
        error: action.error,
        response: action.response,
        response2: action.response2,
        response3: action.response3,
      };

    case START_LOGOUT:
      return {
        ...state,
        statusLogout: statusList.process,
      };
    case SUCCESS_LOGOUT:
      return {
        ...state,
        statusLogout: statusList.success,
        statusLogin: statusList.idle,
        token: null,
        userData: {
          access_token: '',
          user: {
            name: '',
            role: {
              name: '',
            },
            shift: {
              start_time: '',
              end_time: '',
            },
          },
        },
      };
    case ERROR_LOGOUT:
      return {
        ...state,
        statusLogout: statusList.error,
      };

    default:
      return state;
  }
}
