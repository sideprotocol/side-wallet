import { Coin } from '@cosmjs/stargate';

import { BaseRequestPage, PaginationResponse } from '../types';

export type GetTxRequest = {
  events: string[];
  order_by: string;
  page?: string;
  limit?: string;
} & BaseRequestPage;

export interface Tx {
  '@type'?: string;
  body: {
    messages: { '@type': string; amount?: string }[];
    memo: string;
    timeout_height: string;
    extension_options: any[];
    non_critical_extension_options: any[];
  };
  auth_info: {
    signer_infos: [
      {
        public_key: {
          '@type': string;
          key: string;
        };
        mode_info: {
          single?: {
            mode: string;
          };
        };
        sequence: string;
      }
    ];
    fee: {
      amount: Coin[];
      gas_limit: string;
      payer: string;
      granter: string;
    };
  };
  signatures: string[];
}

export interface Attributes {
  index?: boolean;
  key: string;
  value: string;
}

export interface TxResponse {
  height: string;
  txhash: string;
  codespace: string;
  code: number;
  data: string;
  raw_log: string;
  logs: [
    {
      msg_index: number;
      log: string;
      events: Attributes[];
    }
  ];
  info: '';
  gas_wanted: string;
  gas_used: string;
  tx: Tx;
  timestamp: string;
  events: {
    type: string;
    attributes: Attributes[];
  }[];
}

export interface ITxsResponseData {
  pagination: PaginationResponse | null;
  total: string;
  txs: Tx[];
  tx_responses: TxResponse[];
}

export type GetTxsResponse = Awaited<ITxsResponseData>;

export interface NodeInfoResponse {
  minimum_gas_price: string;
}

export interface FeeEstimateResponse {
  [block: string]: number;
}

export interface FeeListResult {
  title: string;
  desc: string;
  feeRate: number;
}
