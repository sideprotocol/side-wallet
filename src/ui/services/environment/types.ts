export interface IChain {
  chainID: string;
  name: string;
  prefix: string;
  rpcUrl: string;
  restUrl: string;
  denom: string;
  hdPath: string;
  logo: string;
  faucetUrl: string;
  explorerUrl: string;
}

export interface GetConstantsResponse {
  DEX_CONTRACT: string;
  DEX_ROUTER_CONTRACT: string;
  UNISAT_RUNE_URL: string;
  UNISAT_SERVICE_ENDPOINT: string;
  OPENAPI_URL: string;
  SIDE_BTC_EXPLORER: string;
  SIDE_STATION_URL: string;
  SIDE_BRIDGEEXPLORER_URL: string;
  SIDE_CHAIN: IChain;
  UNISAT_IO_API: string;
}
