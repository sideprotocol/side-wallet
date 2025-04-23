import {
  sideBTCBridgeRegistry,
  sideBridgeAminoConverter,
  sideDlcAminoConverter,
  sideDlcRegistry,
  sideLendingAminoConverter,
  sideLendingRegistry,
  sideLiquidationAminoConverter,
  sideLiquidationRegistry
} from '@/codegen/src';
import { createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate';
import { wasmTypes } from '@cosmjs/cosmwasm-stargate/build/modules';
import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import {
  AminoTypes,
  createDefaultAminoConverters,
  createIbcAminoConverters,
  defaultRegistryTypes
} from '@cosmjs/stargate';
import { SkipClient } from '@skip-go/client';

const aminoTypes = new AminoTypes({
  ...createDefaultAminoConverters(),
  ...createIbcAminoConverters(),
  ...createWasmAminoConverters(),
  ...sideBridgeAminoConverter,
  ...sideLiquidationAminoConverter,
  ...sideDlcAminoConverter,
  ...sideLendingAminoConverter
});

const sideProtoRegistry: Iterable<[string, GeneratedType]> = [
  ...sideBTCBridgeRegistry.registry,
  ...sideDlcRegistry.registry,
  ...sideLendingRegistry.registry,
  ...sideLiquidationRegistry.registry
];

const registry = new Registry([...defaultRegistryTypes, ...wasmTypes, ...sideProtoRegistry]);

export const skipClient = new SkipClient({
  aminoTypes: {
    ...createDefaultAminoConverters(),
    ...createIbcAminoConverters(),
    ...createWasmAminoConverters(),
    ...sideBridgeAminoConverter,
    ...sideLiquidationAminoConverter,
    ...sideDlcAminoConverter,
    ...sideLendingAminoConverter
  },
  registryTypes: [...defaultRegistryTypes, ...wasmTypes, ...sideProtoRegistry]
});
