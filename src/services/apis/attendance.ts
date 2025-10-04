import { IAttendanceHistory, IBaseResponse } from '@/types';

import { getAsync } from '..';

const PREFIX = 'attendances/';

export const getAttendances = (params: IGetAttendancesRequest) => {
  return getAsync<IBaseResponse<IAttendanceHistory[]>>(`${PREFIX}`, params);
};

export interface IGetAttendancesRequest {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
  q?: string;
}