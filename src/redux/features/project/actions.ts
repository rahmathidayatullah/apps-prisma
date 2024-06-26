import debounce from 'debounce-promise';
import {Alert} from 'react-native';

import {
  START_FETCH_PROJECT,
  SUCCESS_FETCH_PROJECT,
  ERROR_FETCH_PROJECT,
  START_FETCH_UNIT_PROJECT,
  SUCCESS_FETCH_UNIT_PROJECT,
  ERROR_FETCH_UNIT_PROJECT,
  START_FETCH_PROJECT_DETAIL,
  SUCCESS_FETCH_PROJECT_DETAIL,
  ERROR_FETCH_PROJECT_DETAIL,
} from './constants';

import {SUCCESS_LOGOUT} from '../auth/constants';

import {
  getProject,
  getProjectDetail,
  getUnitProjectId,
} from '../../../api/project';

import {removeEmptyAttributes} from '../../../utils';

const debounceGetProject = debounce(getProject, 100);

export const fetchProject = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_FETCH_PROJECT,
    });
    console.log('start fetchProject');

    const page = getState().project.page;
    const take = getState().project.take;
    const order = getState().project.order;
    const keyword = getState().project.keyword;

    const params = {
      page,
      take,
      order,
      search: keyword,
    };

    try {
      const {
        data: {data},
      } = await debounceGetProject(params);
      console.log('success fetchProject', data);

      dispatch({
        type: SUCCESS_FETCH_PROJECT,
        data,
      });
    } catch (error: any) {
      console.log('error fetchProject', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_PROJECT,
          data: error,
        });
      }
    }
  };
};

export const fetchUnitProjectById = (idProject: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_FETCH_UNIT_PROJECT,
    });
    console.log('start fetchUnitProjectById');

    const phase = getState().project.tahap;
    const block = getState().project.blok;
    const status = getState().project.unit;

    const params = {
      phase,
      block,
      status,
    };

    const newParams = removeEmptyAttributes(params);

    try {
      const {
        data: {data},
      } = await getUnitProjectId(idProject, newParams);
      console.log('success fetchUnitProjectById', data);

      dispatch({
        type: SUCCESS_FETCH_UNIT_PROJECT,
        data,
      });
    } catch (error: any) {
      console.log('error fetchUnitProjectById', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_UNIT_PROJECT,
          data: error,
        });
      }
    }
  };
};

export const fetchProjectDetail = (id: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: START_FETCH_PROJECT_DETAIL,
    });
    console.log('start fetchProjectDetail');

    try {
      const {
        data: {data},
      } = await getProjectDetail(id);
      console.log('success fetchProjectDetail', data);

      dispatch({
        type: SUCCESS_FETCH_PROJECT_DETAIL,
        data,
      });
    } catch (error: any) {
      console.log('error fetchProjectDetail', error);
      if (error.response?.status === 401) {
        Alert.alert(error.code, error.response?.data?.message);
        dispatch({
          type: SUCCESS_LOGOUT,
        });
      } else {
        dispatch({
          type: ERROR_FETCH_PROJECT_DETAIL,
          data: error,
        });
      }
    }
  };
};
