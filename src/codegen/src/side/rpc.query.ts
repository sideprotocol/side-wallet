//@ts-nocheck
import { Tendermint34Client, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    side: {
      btcbridge: (await import("./btcbridge/query.rpc.Query")).createRpcQueryExtension(client),
      dlc: (await import("./dlc/query.rpc.Query")).createRpcQueryExtension(client),
      incentive: (await import("./incentive/query.rpc.Query")).createRpcQueryExtension(client),
      lending: (await import("./lending/query.rpc.Query")).createRpcQueryExtension(client),
      liquidation: (await import("./liquidation/query.rpc.Query")).createRpcQueryExtension(client),
      oracle: (await import("./oracle/query.rpc.Query")).createRpcQueryExtension(client),
      tss: (await import("./tss/query.rpc.Query")).createRpcQueryExtension(client)
    }
  };
};