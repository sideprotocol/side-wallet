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
    incentive: new (await import("./incentive/tx.rpc.msg")).MsgClientImpl(rpc),
    lending: new (await import("./lending/tx.rpc.msg")).MsgClientImpl(rpc),
    liquidation: new (await import("./liquidation/tx.rpc.msg")).MsgClientImpl(rpc),
    oracle: new (await import("./oracle/tx.rpc.msg")).MsgClientImpl(rpc),
    tss: new (await import("./tss/tx.rpc.msg")).MsgClientImpl(rpc)
  }
});