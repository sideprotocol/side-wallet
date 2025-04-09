import { fromHex } from '@cosmjs/encoding';
import {
  AccountData,
  AminoSignResponse,
  DirectSignResponse,
  KeplrSignOptions,
  OfflineAminoSigner,
  OfflineDirectSigner,
  SignDoc,
  StdSignDoc
} from '@keplr-wallet/types';

import { WalletController } from '../utils';

export class CosmJSOfflineSignerOnlyAmino implements OfflineAminoSigner {
  constructor(
    protected readonly chainId: string,
    protected readonly wallet: WalletController,
    protected readonly signOptions?: KeplrSignOptions
  ) {}

  async getAccounts(): Promise<AccountData[]> {
    const account = await this.wallet.getCurrentAccount();

    return [
      {
        address: account.address,
        // Currently, only secp256k1 is supported.
        algo: 'secp256k1',
        pubkey: fromHex(account.pubkey)
      }
    ];
  }

  async signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    if (this.chainId !== signDoc.chain_id) {
      throw new Error('Unmatched chain id with the offline signer');
    }

    const account = await this.wallet.getCurrentAccount();

    if (account.address !== signerAddress) {
      throw new Error('Unknown signer address');
    }

    return await this.wallet.signAmino(this.chainId, signerAddress, signDoc, this.signOptions);
  }

  // Fallback function for the legacy cosmjs implementation before the stargate.
  async sign(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    return await this.signAmino(signerAddress, signDoc);
  }
}

export class CosmJSOfflineSigner
  extends CosmJSOfflineSignerOnlyAmino
  implements OfflineAminoSigner, OfflineDirectSigner
{
  constructor(chainId: string, wallet: WalletController, signOptions?: KeplrSignOptions) {
    super(chainId, wallet, signOptions);
  }

  async signDirect(signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    if (this.chainId !== signDoc.chainId) {
      throw new Error('Unmatched chain id with the offline signer');
    }

    const account = await this.wallet.getCurrentAccount();

    if (account.address !== signerAddress) {
      throw new Error('Unknown signer address');
    }

    return await this.wallet.signDirect(this.chainId, signerAddress, signDoc, this.signOptions);
  }
}
