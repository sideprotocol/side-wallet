export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ResultError {
  message: string;
  code?: number;
}

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers?: HttpHeaders;
  params?: any;
};

export interface BaseRequestPage {
  'pagination.key'?: string;
  'pagination.offset'?: string;
  'pagination.limit'?: string;
  'pagination.count_total'?: boolean;
  'pagination.reverse'?: boolean;
}

export interface PaginationResponse {
  next_key: null;
  total: string;
}
export interface Coin {
  amount: string;
  denom: string;
}
export interface Delegation {
  delegation: {
    delegator_address: string;
    validator_address: string;
    shares: string;
  };
  balance: Coin;
}
