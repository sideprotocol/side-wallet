//@ts-nocheck
import { Rpc } from '../helpers';

export const createRPCMsgClient = async ({ rpc }: { rpc: Rpc }) => ({
  side: {
    btcbridge: new (await import('./btcbridge/tx.rpc.msg')).MsgClientImpl(rpc)
  }
});
