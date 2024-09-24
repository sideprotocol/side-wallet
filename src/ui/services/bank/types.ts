import { Coin } from '@cosmjs/amino';
import { BaseRequestPage, PaginationResponse } from '../types';

export type GetAllBalancesRequest = {
  address: string;
} & BaseRequestPage;

export interface GetAllBalancesData {
  balances: Coin[];
  pagination: PaginationResponse;
}

export type GetAllBalancesResponse = Awaited<GetAllBalancesData>;

export type GetDenomOwnersRequest = {
  denom: string;
} & BaseRequestPage;

export type GetDenomOwnersResponse = Awaited<{
  pagination: PaginationResponse;
  denom_owners: Array<{
    address: string;
    balance: Coin;
  }>;
}>;

