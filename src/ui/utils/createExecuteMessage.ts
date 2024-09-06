import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { Coin } from 'cosmwasm';

import { MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate';

type CreateExecuteMessageArgs = {
  senderAddress: string;
  message: any;
  contractAddress: string;
  funds?: Array<Coin>;
};

const createExecuteMessage = ({
  senderAddress,
  contractAddress,
  message,
  funds
}: CreateExecuteMessageArgs): MsgExecuteContractEncodeObject => {
  return {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial({
      sender: senderAddress,
      contract: contractAddress,
      msg: new TextEncoder().encode(JSON.stringify(message)), // new TextDecoder().encoding() , //toUtf8(JSON.stringify(message)),
      funds: funds || []
    })
  };
};

export default createExecuteMessage;
