//@ts-nocheck
import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  side: {
    btcbridge: new (await import("./btcbridge/tx.rpc.msg")).MsgClientImpl(rpc),
    dlc: new (await import("./dlc/tx.rpc.msg")).MsgClientImpl(rpc),
    lending: new (await import("./lending/tx.rpc.msg")).MsgClientImpl(rpc),
    liquidation: new (await import("./liquidation/tx.rpc.msg")).MsgClientImpl(rpc)
  }
});