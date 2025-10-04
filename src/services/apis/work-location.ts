import { IBaseResponse } from '@/types';
import { IWorkLocation } from '@/types/work-location';

import { getAsync } from '../http';

const PREFIX = 'work-locations';

export const getWorkLocations = (params?: any) => {
  return getAsync<IBaseResponse<IWorkLocation[]>>(`${PREFIX}`, params);
};