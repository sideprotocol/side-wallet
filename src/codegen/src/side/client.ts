//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from '@cosmjs/proto-signing';
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from '@cosmjs/stargate';
import { HttpEndpoint } from '@cosmjs/tendermint-rpc';
import * as sideBtcbridgeTxRegistry from './btcbridge/tx.registry';
import * as sideBtcbridgeTxAmino from './btcbridge/tx.amino';
export const sideAminoConverters = {
  ...sideBtcbridgeTxAmino.AminoConverter
};
export const sideProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...sideBtcbridgeTxRegistry.registry];
export const getSigningSideClientOptions = ({
  defaultTypes = defaultRegistryTypes
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...sideProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...sideAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningSideClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningSideClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: registry as any,
    aminoTypes
  });
  return client;
};