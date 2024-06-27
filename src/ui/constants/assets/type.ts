export interface IAsset {
  base: string;
  symbol: string;
  name: string;
  exponent: string;
  coingecko_id: string;
  logo: string;
  precision: number;
}

export interface IChainAsset {
  chainID: string;
  assets: IAsset[];
}

export interface IBridgeAsset {
  [key: string]: {
    [key: string]: {
      assets: IAsset[];
    };
  };
}
