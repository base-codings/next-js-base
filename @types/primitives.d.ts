export type DataResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type DataPagnitionParams<T> = {
  length: number;
} & T;

export type DataPagnitionResponse<T> = {
  success: boolean;
  data: {
    data: T;
    nextPage: boolean;
    totalPage: number;
  };
  message: string;
};
