export interface IBaseResponse<T> {
    data: T;
    message: string;
    timestamp: string;
    path: string;
    errors: any;
    meta?: {
      total: number;
      page: number;
      limit: number;
    };
  }