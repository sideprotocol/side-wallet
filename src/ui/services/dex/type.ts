import { IAsset } from '@/shared/types';
import { Coin } from '@cosmjs/stargate';

// import { SxProps } from "@mui/material";

export type NativeAsset = {
  native_token: {
    denom: string;
  };
};

// type TokenAsset = {
//   token: {
//     contract_addr: string;
//   };
// };

export type CreatePairType = { xyk: {} } | { stable: {} } | { custom: {} };

export interface ICreatePool {
  create_pair: {
    // asset_infos: (NativeAsset | TokenAsset)[];
    asset_infos: NativeAsset[];
    pair_type: CreatePairType;
    init_params?: any;
  };
}

export interface IPairItem {
  asset_infos: NativeAsset[];
  contract_addr: string;
  liquidity_token: string;
  pair_type: { xyk: {} } | { stable: {} } | { custom: string };
}

export interface IPoolItem {
  assets: Asset[];
  total_share: string;
  contract_addr: string;
  pair: IPairItem;
  assetsMeta: Record<string, IAsset>;
}

export interface Asset {
  info: Info;
  amount: string;
}

interface Info {
  native_token: Nativetoken;
}

interface Nativetoken {
  denom: string;
}

export interface SlippageControlProps {
  slippage: string;
  slippageIsAuto: boolean;
  onBack: () => void;
  onInputSlippage: (value: string) => void;
  onQuickSet: (value: string) => void;
  open: boolean;
  onClose: () => void;
  // sx?: SxProps;
}

export interface IPoolOne {
  contractAddr: string;
  liquidityToken: string;
  tokenDenom1: string;
  tokenAmount1: string;
  tokenSymbol1: string;
  tokenLogo1: string;
  tokenDenom2: string;
  tokenAmount2: string;
  tokenSymbol2: string;
  tokenLogo2: string;
  totalShare: string;
  pairType: string;
  tokenValue1: string;
  tokenValue2: string;
  totalValue: string;
  volumeOneDay: string;
  volumeSevenDay: string;
  totalFeeOneDay: string;
  totalFeeSevenDay: string;
  apr: string;
  myLiquidityBalance: string;
  totalFeeBps: number;
  activeIncentivized: boolean;
  stakedLpTokens: string;
  apy: string;
  totalApr: string;
}

export interface IPoolOneFull extends IPoolOne {
  myLiquidity: string;
  poolName: string;
  poolType: string;
}

export interface IGetPoolDetailRequest {
  contractAddr: string;
  address?: string;
}

export interface IGetPoolDetailResponse {
  detail: {
    contractAddr: string;
    liquidityToken: string;
    tokenDenom1: string;
    tokenAmount1: string;
    tokenSymbol1: string;
    tokenExponent1: string;
    tokenLogo1: string;
    tokenDenom2: string;
    tokenAmount2: string;
    tokenSymbol2: string;
    tokenExponent2: string;
    tokenLogo2: string;
    totalShare: string;
    pairType: string;
    tokenValue1: string;
    tokenValue2: string;
    totalValue: string;
    volumeOneDay: string;
    volumeSevenDay: string;
    totalFeeOneDay: string;
    totalFeeSevenDay: string;
    apr: string;
    myLiquidityBalance: string;
    totalFeeBps: number;
  };
}

export interface IPoolDetail extends IPoolItem, IGetPoolDetailResponse {}

export interface IPoolTranscationRequest {
  contractAddr: string;
  pageNumber: number;
  pageSize: number;
}

export interface IPoolTranscationResponse {
  totalPages: number;
  totalElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
export interface IPoolTranscationSwapsResponse extends IPoolTranscationResponse {
  content: Array<{
    tokenDenom1: string;
    tokenAmount1: string;
    tokenSymbol1: string;
    tokenExponent1: string;
    tokenLogo1: string;
    tokenVolume1: string;
    tokenDenom2: string;
    tokenAmount2: string;
    tokenSymbol2: string;
    tokenExponent2: string;
    tokenLogo2: string;
    tokenVolume2: string;
    totalVolume: string;
    account: string;
    time: string;
    txhash: string;
    explorerUrl: string;
    code: number;
    tokens: Array<{
      denom: string;
      amount: string;
      symbol: string;
      name: string;
      exponent: string;
      logo: string;
      precision: number;
    }>;
  }>;
}

export interface IPoolTranscationAddsResponse extends IPoolTranscationResponse {
  content: Array<{
    tokenDenom1: string;
    tokenAmount1: string;
    tokenSymbol1: string;
    tokenExponent1: string;
    tokenLogo1: string;
    tokenVolume1: string;
    tokenDenom2: string;
    tokenAmount2: string;
    tokenSymbol2: string;
    tokenExponent2: string;
    tokenLogo2: string;
    tokenVolume2: string;
    totalVolume: string;
    account: string;
    time: string;
    txhash: string;
    explorerUrl: string;
    code: number;
  }>;
}

export interface IPoolTranscationWithdrawsResponse extends IPoolTranscationResponse {
  content: Array<{
    tokenDenom1: string;
    tokenAmount1: string;
    tokenSymbol1: string;
    tokenExponent1: string;
    tokenLogo1: string;
    tokenVolume1: string;
    tokenDenom2: string;
    tokenAmount2: string;
    tokenSymbol2: string;
    tokenExponent2: string;
    tokenLogo2: string;
    tokenVolume2: string;
    totalVolume: string;
    account: string;
    time: string;
    txhash: string;
    explorerUrl: string;
    code: number;
  }>;
}

export interface IGetChartDataRequest {
  contractAddr: string;
  days: number;
}

export interface IGetChartDataResponse {
  tvlData: Array<{ date: string; value: string }>;
  volumeData: Array<{ date: string; value: string }>;
  feeData: Array<{ date: string; value: string }>;
}

export interface SelectTokenProps {
  open: boolean;
  onClose: () => void;
  onSelect: (token: Coin) => void;
  assetsList: IAsset[];
  popularList: IAsset[];
  onSearch: (value: string) => void;
  searchValue: string;
  curTokenDenom: string;
}

export interface SwapRouteResult {
  offerToken: OfferToken;
  returnToken: OfferToken;
  feeRate: string;
  feeAmount: string;
  feeShowAmount: string;
  exchangeRate: string;
  exchangeRateVolume: string;
  pools: Pool[];
  priceImpact: string;
  sort: number;
}

export interface Pool {
  pairType: string;
  contractAddr: string;
  offerToken: OfferToken;
  returnToken: OfferToken;
  feeRate: string;
  feeAmount: string;
  feeShowAmount: string;
  marketPrice: string;
}

interface OfferToken {
  denom: string;
  symbol: string;
  name: string;
  exponent: string;
  logo: string;
  amount: string;
  showAmount: string;
  price: string;
  volume: string;
}
export interface IGetOverviewDataResponse {
  totalValueLocked: string;
  totalValueLockedByBtc: string;
  totalVolumesOneDay: string;
  totalVolumesOneDayByBtc: string;
  totalFeesOneDay: string;
  totalFeesOneDayByBtc: string;
  totalVolumesSevenDay: string;
  totalVolumesSevenDayByBtc: string;
  totalFeesSevenDay: string;
  totalFeesSevenDayByBtc: string;
}

export interface LimitOrderConfig {
  fee_denom: string;
  fee_collector: string;
  warp_account_code_id: string;
  account_tracker_code_id: string;
  minimum_reward: string;
  cancellation_fee_rate: string;
  resolver_address: string;
  creation_fee_min: string;
  creation_fee_max: string;
  burn_fee_min: string;
  maintenance_fee_min: string;
  maintenance_fee_max: string;
  duration_days_min: string;
  duration_days_max: string;
  duration_days_limit: string;
  queue_size_left: string;
  queue_size_right: string;
  burn_fee_rate: string;
}

export interface LimitOrderJobType {
  jobs: LimitJob[];
  total_count: number;
}

export interface LimitJob {
  id: string;
  prev_id: null;
  owner: string;
  account: string;
  funding_account: null;
  last_update_time: string;
  name: string;
  description: string;
  labels: string[];
  status: string;
  terminate_condition: null;
  executions: Execution[];
  vars: string;
  recurring: boolean;
  duration_days: string;
  created_at_time: string;
  reward: string;
  assets_to_withdraw: Assetstowithdraw[];
}

interface Assetstowithdraw {
  native: string;
}

interface Execution {
  condition: string;
  msgs: string;
}

export interface QueueStateType {
  state: State;
}

interface State {
  current_job_id: string;
  q: string;
}

export interface IGetPoolIncentivesActiveResponse extends IPoolTranscationResponse {
  content: Array<{
    tokenDenom: string;
    tokenSymbol: string;
    tokenName: string;
    tokenExponent: string;
    tokenLogo: string;
    tokenPrecision: number;
    totalIncentives: string;
    dailyIncentives: string;
    start: string;
    end: string;
    provider: string;
    explorerUrl: string;
    txhash: string;
    code: number;
  }>;
}

export type PoolType = 'xyk' | 'stable' | 'custom-transmuter';

export interface IGetMarketListItem {
  tokenDenom: string;
  tokenSymbol: string;
  tokenName: string;
  tokenExponent: string;
  tokenPrecision: number;
  tokenLogo: string;
  dollarPrice: string;
  priceChange: string;
  volume: string;
  tradeCount: number;
  traderCount: number;
  tvl: string;
  marketCap: string;
}

export interface IGetBridgeActivitiesRequest {
  pageNumber?: number;
  pageSize?: number;
  direction?: string;
  type?: string;
  tokenDenom?: string;
  orderByTime?: string;
  userAddress?: string;
  statusText?: string;
}

export interface IGetBridgeActivity {
  id: string;
  direction: string;
  type: string;
  user: string;
  txhash: string;
  btcTxhash: string;
  time: number;
  tokenDenom: string;
  tokenAmount: string;
  tokenSymbol: string;
  tokenName: string;
  tokenExponent: string;
  tokenPrecision: number;
  tokenLogo: string;
  runeData: {
    empty: boolean;
    additionalProp1: {};
    additionalProp2: {};
    additionalProp3: {};
  };
  rune: true;
  status: 'Pending' | 'Completed' | 'Failed';
  sideTxFeeAmount: string;
  sideTxFeeDenom: string;
  btcTxFeeAmount: string;
  forIbc: boolean;
  ibcStatus: 'Pending' | 'Completed' | 'Failed';
  oppositeAddress: string;
  oppositeChainId: string;
  oppositeChainName: string;
  oppositeChannelId: string;
  oppositeTxFeeAmount: string;
  oppositeTxFeeDenom: string;
  oppositeTxHash: string;
  oppositeTxTime: string;
}

export interface IGetBridgeActivitiesResponse extends IPoolTranscationResponse {
  content: Array<IGetBridgeActivity>;
}
