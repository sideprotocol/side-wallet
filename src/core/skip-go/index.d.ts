import * as _cosmjs_cosmwasm_stargate from '@cosmjs/cosmwasm-stargate';
import * as viem from 'viem';
import { WalletClient } from 'viem';
import { OfflineDirectSigner, GeneratedType, OfflineSigner, Registry, EncodeObject } from '@cosmjs/proto-signing';
import { StdFee, GasPrice, AminoConverters, SignerData, AminoTypes, SigningStargateClient } from '@cosmjs/stargate';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { OfflineAminoSigner } from '@cosmjs/amino';
import { Adapter } from '@solana/wallet-adapter-base';
import { Msgs } from '@injectivelabs/sdk-ts/dist/cjs/core/modules/msgs';
import { Connection } from '@solana/web3.js';

declare class RequestClient {
    private baseURL;
    private apiKey?;
    constructor({ baseURL, apiKey }: {
        baseURL: string;
        apiKey?: string;
    });
    private buildHeaders;
    private buildURL;
    get<ResponseType = unknown, RequestParams = unknown>(path: string, params?: RequestParams): Promise<ResponseType>;
    post<ResponseType = unknown, Body = unknown>(path: string, data?: Body): Promise<ResponseType>;
}

type SubmitTxRequestJSON = {
    tx: string;
    chain_id: string;
};
type SubmitTxRequest = {
    tx: string;
    chainID: string;
};
type SubmitTxResponseJSON = {
    tx_hash: string;
};
type SubmitTxResponse = {
    txHash: string;
};
type StatusState = "STATE_UNKNOWN" | "STATE_SUBMITTED" | "STATE_PENDING" | "STATE_RECEIVED" | "STATE_COMPLETED" | "STATE_ABANDONED" | "STATE_COMPLETED_SUCCESS" | "STATE_COMPLETED_ERROR" | "STATE_PENDING_ERROR";
type NextBlockingTransferJSON = {
    transfer_sequence_index: number;
};
type NextBlockingTransfer = {
    transferSequenceIndex: number;
};
type StatusRequestJSON = {
    tx_hash: string;
    chain_id: string;
};
type StatusRequest = {
    txHash: string;
    chainID: string;
};
type TransferState = "TRANSFER_UNKNOWN" | "TRANSFER_PENDING" | "TRANSFER_RECEIVED" | "TRANSFER_SUCCESS" | "TRANSFER_FAILURE";
type TransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: TransferState;
    packet_txs: PacketJSON;
    src_chain_id: string;
    dst_chain_id: string;
};
type TransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: TransferState;
    packetTxs: Packet;
    /**
     * Deprecated use `packetTxs` instead
     */
    packetTXs: Packet;
    /**
     * Deprecated use `fromChainID` instead
     */
    srcChainID: string;
    /**
     * Deprecated use `toChainID` instead
     */
    dstChainID: string;
};
type TransferAssetReleaseJSON = {
    chain_id: string;
    denom: string;
    amount?: string;
    released: boolean;
};
type TransferAssetRelease = {
    chainID: string;
    denom: string;
    amount?: string;
    released: boolean;
};
type TxStatusResponseJSON = {
    status: StatusState;
    transfer_sequence: TransferEventJSON[];
    next_blocking_transfer: NextBlockingTransferJSON | null;
    transfer_asset_release: TransferAssetReleaseJSON | null;
    error: StatusError | null;
    state: StatusState;
    transfers: TransferStatusJSON[];
};
type TxStatusResponse = {
    status: StatusState;
    transferSequence: TransferEvent[];
    nextBlockingTransfer: NextBlockingTransfer | null;
    transferAssetRelease: TransferAssetRelease | null;
    error: StatusError | null;
    state: StatusState;
    transfers: TransferStatus[];
};
type TransferStatusJSON = {
    state: StatusState;
    transfer_sequence: TransferEventJSON[];
    next_blocking_transfer: NextBlockingTransferJSON | null;
    transfer_asset_release: TransferAssetReleaseJSON | null;
    error: StatusError | null;
};
type TransferStatus = {
    state: StatusState;
    transferSequence: TransferEvent[];
    nextBlockingTransfer: NextBlockingTransfer | null;
    transferAssetRelease: TransferAssetRelease | null;
    error: StatusError | null;
};
type PacketJSON = {
    send_tx: ChainTransactionJSON | null;
    receive_tx: ChainTransactionJSON | null;
    acknowledge_tx: ChainTransactionJSON | null;
    timeout_tx: ChainTransactionJSON | null;
    error: PacketError | null;
};
type Packet = {
    sendTx: ChainTransaction | null;
    receiveTx: ChainTransaction | null;
    acknowledgeTx: ChainTransaction | null;
    timeoutTx: ChainTransaction | null;
    error: PacketError | null;
};
type StatusErrorType = "STATUS_ERROR_UNKNOWN" | "STATUS_ERROR_TRANSACTION_EXECUTION" | "STATUS_ERROR_INDEXING";
type TransactionExecutionError = {
    code: number;
    message: string;
};
type StatusErrorJSON = {
    code: number;
    message: string;
    type: StatusErrorType;
    details: {
        transaction_execution_error: TransactionExecutionError;
    };
};
type StatusError = {
    code: number;
    message: string;
    type: StatusErrorType;
    details: {
        transactionExecutionError: TransactionExecutionError;
    };
};
type PacketErrorType = "PACKET_ERROR_UNKNOWN" | "PACKET_ERROR_ACKNOWLEDGEMENT" | "PACKET_ERROR_TIMEOUT";
type AcknowledgementError = {
    message: string;
    code: number;
};
type PacketErrorJSON = {
    code: number;
    message: string;
    type: PacketErrorType;
    details: {
        acknowledgement_error: AcknowledgementError;
    };
};
type PacketError = {
    code: number;
    message: string;
    type: PacketErrorType;
    details: {
        acknowledgementError: AcknowledgementError;
    };
};
type ChainTransactionJSON = {
    chain_id: string;
    tx_hash: string;
    explorer_link: string;
};
type ChainTransaction = {
    chainID: string;
    txHash: string;
    explorerLink: string;
};
type TrackTxRequestJSON = {
    tx_hash: string;
    chain_id: string;
};
type TrackTxRequest = {
    txHash: string;
    chainID: string;
};
type TrackTxResponseJSON = {
    tx_hash: string;
    explorer_link: string;
};
type TrackTxResponse = {
    txHash: string;
    explorerLink: string;
};
type AxelarTransferType = "AXELAR_TRANSFER_CONTRACT_CALL_WITH_TOKEN" | "AXELAR_TRANSFER_SEND_TOKEN";
type AxelarTransferState = "AXELAR_TRANSFER_UNKNOWN" | "AXELAR_TRANSFER_PENDING_CONFIRMATION" | "AXELAR_TRANSFER_PENDING_RECEIPT" | "AXELAR_TRANSFER_SUCCESS" | "AXELAR_TRANSFER_FAILURE";
type AxelarTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    type: AxelarTransferType;
    state: AxelarTransferState;
    txs: AxelarTransferTransactionsJSON;
    axelar_scan_link: string;
    src_chain_id: string;
    dst_chain_id: string;
};
type AxelarTransferInfo = {
    fromChainID: string;
    toChainID: string;
    type: AxelarTransferType;
    state: AxelarTransferState;
    txs: AxelarTransferTransactions;
    axelarScanLink: string;
    /**
     * Deprecated use `fromChainID` instead
     */
    srcChainID: string;
    /**
     * Deprecated use `toChainID` instead
     */
    dstChainID: string;
};
type AxelarTransferTransactionsJSON = {
    contract_call_with_token_txs: ContractCallWithTokenTransactionsJSON;
} | {
    send_token_txs: SendTokenTransactionsJSON;
};
type AxelarTransferTransactions = {
    contractCallWithTokenTxs: ContractCallWithTokenTransactions;
} | {
    sendTokenTxs: SendTokenTransactions;
};
type ContractCallWithTokenTransactionsJSON = {
    send_tx: ChainTransactionJSON | null;
    gas_paid_tx: ChainTransactionJSON | null;
    confirm_tx: ChainTransactionJSON | null;
    approve_tx: ChainTransactionJSON | null;
    execute_tx: ChainTransactionJSON | null;
    error: ContractCallWithTokenError | null;
};
type ContractCallWithTokenTransactions = {
    sendTx: ChainTransaction | null;
    gasPaidTx: ChainTransaction | null;
    confirmTx: ChainTransaction | null;
    approveTx: ChainTransaction | null;
    executeTx: ChainTransaction | null;
    error: ContractCallWithTokenError | null;
};
type ContractCallWithTokenError = {
    message: string;
    type: ContractCallWithTokenErrorType;
};
type ContractCallWithTokenErrorType = "CONTRACT_CALL_WITH_TOKEN_EXECUTION_ERROR";
type SendTokenTransactionsJSON = {
    send_tx: ChainTransactionJSON | null;
    confirm_tx: ChainTransactionJSON | null;
    execute_tx: ChainTransactionJSON | null;
    error: SendTokenError | null;
};
type SendTokenTransactions = {
    sendTx: ChainTransaction | null;
    confirmTx: ChainTransaction | null;
    executeTx: ChainTransaction | null;
    error: SendTokenError | null;
};
type SendTokenErrorType = "SEND_TOKEN_EXECUTION_ERROR";
type SendTokenError = {
    message: string;
    type: SendTokenErrorType;
};
type CCTPTransferState = "CCTP_TRANSFER_UNKNOWN" | "CCTP_TRANSFER_SENT" | "CCTP_TRANSFER_PENDING_CONFIRMATION" | "CCTP_TRANSFER_CONFIRMED" | "CCTP_TRANSFER_RECEIVED";
type CCTPTransferTransactionsJSON = {
    send_tx: ChainTransactionJSON | null;
    receive_tx: ChainTransactionJSON | null;
};
type CCTPTransferTransactions = {
    sendTx: ChainTransaction | null;
    receiveTx: ChainTransaction | null;
};
type CCTPTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: CCTPTransferState;
    txs: CCTPTransferTransactionsJSON;
    src_chain_id: string;
    dst_chain_id: string;
};
type CCTPTransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: CCTPTransferState;
    txs: CCTPTransferTransactions;
    /**
     * Deprecated use `fromChainID` instead
     */
    srcChainID: string;
    /**
     * Deprecated use `toChainID` instead
     */
    dstChainID: string;
};
type HyperlaneTransferState = "HYPERLANE_TRANSFER_UNKNOWN" | "HYPERLANE_TRANSFER_SENT" | "HYPERLANE_TRANSFER_FAILED" | "HYPERLANE_TRANSFER_RECEIVED";
type HyperlaneTransferTransactionsJSON = {
    send_tx: ChainTransactionJSON | null;
    receive_tx: ChainTransactionJSON | null;
};
type HyperlaneTransferTransactions = {
    sendTx: ChainTransaction | null;
    receiveTx: ChainTransaction | null;
};
type HyperlaneTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: HyperlaneTransferState;
    txs: HyperlaneTransferTransactionsJSON;
};
type HyperlaneTransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: HyperlaneTransferState;
    txs: HyperlaneTransferTransactions;
};
type GoFastTransferTransactionsJSON = {
    order_submitted_tx: ChainTransactionJSON | null;
    order_filled_tx: ChainTransactionJSON | null;
    order_refunded_tx: ChainTransactionJSON | null;
    order_timeout_tx: ChainTransactionJSON | null;
};
type GoFastTransferTransactions = {
    orderSubmittedTx: ChainTransaction | null;
    orderFilledTx: ChainTransaction | null;
    orderRefundedTx: ChainTransaction | null;
    orderTimeoutTx: ChainTransaction | null;
};
type GoFastTransferState = "GO_FAST_TRANSFER_UNKNOWN" | "GO_FAST_TRANSFER_SENT" | "GO_FAST_POST_ACTION_FAILED" | "GO_FAST_TRANSFER_TIMEOUT" | "GO_FAST_TRANSFER_FILLED" | "GO_FAST_TRANSFER_REFUNDED";
type GoFastTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: GoFastTransferState;
    txs: GoFastTransferTransactionsJSON;
    error_message: string | null;
};
type GoFastTransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: GoFastTransferState;
    txs: GoFastTransferTransactions;
    errorMessage: string | null;
};
type StargateTransferState = "STARGATE_TRANSFER_UNKNOWN" | "STARGATE_TRANSFER_SENT" | "STARGATE_TRANSFER_RECEIVED" | "STARGATE_TRANSFER_FAILED";
type StargateTransferTransactionsJSON = {
    send_tx: ChainTransactionJSON | null;
    receive_tx: ChainTransactionJSON | null;
    error_tx: ChainTransactionJSON | null;
};
type StargateTransferTransactions = {
    sendTx: ChainTransaction | null;
    receiveTx: ChainTransaction | null;
    errorTx: ChainTransaction | null;
};
type StargateTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: StargateTransferState;
    txs: StargateTransferTransactionsJSON;
};
type StargateTransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: StargateTransferState;
    txs: StargateTransferTransactions;
};
type OPInitTransferState = "OPINIT_TRANSFER_UNKNOWN" | "OPINIT_TRANSFER_SENT" | "OPINIT_TRANSFER_RECEIVED";
type OPInitTransferTransactionsJSON = {
    send_tx: ChainTransactionJSON | null;
    receive_tx: ChainTransactionJSON | null;
};
type OPInitTransferTransactions = {
    sendTx: ChainTransaction | null;
    receiveTx: ChainTransaction | null;
};
type OPInitTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: OPInitTransferState;
    txs: OPInitTransferTransactionsJSON;
};
type OPInitTransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: OPInitTransferState;
    txs: OPInitTransferTransactions;
};
type EurekaTransferInfoJSON = {
    from_chain_id: string;
    to_chain_id: string;
    state: TransferState;
    packet_txs: PacketJSON;
};
type EurekaTransferInfo = {
    fromChainID: string;
    toChainID: string;
    state: TransferState;
    packetTxs: Packet;
};
type TransferEventJSON = {
    ibc_transfer: TransferInfoJSON;
} | {
    axelar_transfer: AxelarTransferInfoJSON;
} | {
    cctp_transfer: CCTPTransferInfoJSON;
} | {
    hyperlane_transfer: HyperlaneTransferInfoJSON;
} | {
    op_init_transfer: OPInitTransferInfoJSON;
} | {
    go_fast_transfer: GoFastTransferInfoJSON;
} | {
    stargate_transfer: StargateTransferInfoJSON;
} | {
    eureka_transfer: EurekaTransferInfoJSON;
};
type TransferEvent = {
    ibcTransfer: TransferInfo;
} | {
    axelarTransfer: AxelarTransferInfo;
} | {
    cctpTransfer: CCTPTransferInfo;
} | {
    hyperlaneTransfer: HyperlaneTransferInfo;
} | {
    opInitTransfer: OPInitTransferInfo;
} | {
    goFastTransfer: GoFastTransferInfo;
} | {
    stargateTransfer: StargateTransferInfo;
} | {
    eurekaTransfer: EurekaTransferInfo;
};
type CallbackStatus = "success" | "error" | "pending" | "completed";
interface TransactionCallbacks {
    onTransactionSigned?: (txInfo: {
        chainID: string;
    }) => Promise<void>;
    onTransactionBroadcast?: (txInfo: {
        txHash: string;
        chainID: string;
    }) => Promise<void>;
    onTransactionTracked?: (txInfo: {
        txHash: string;
        chainID: string;
        explorerLink: string;
    }) => Promise<void>;
    onTransactionCompleted?: (chainID: string, txHash: string, status: TxStatusResponse) => Promise<void>;
    onValidateGasBalance?: (value: {
        chainID?: string;
        txIndex?: number;
        status: CallbackStatus;
    }) => Promise<void>;
    onApproveAllowance?: (value: {
        allowance?: ERC20Approval;
        status: CallbackStatus;
    }) => Promise<void>;
}

type IBCAddressJSON = {
    address: string;
    chain_id: string;
};
type IBCAddress = {
    address: string;
    chainID: string;
};
type AssetJSON = {
    denom: string;
    chain_id: string;
    origin_denom: string;
    origin_chain_id: string;
    trace: string;
    is_cw20: boolean;
    is_evm: boolean;
    is_svm: boolean;
    symbol: string | undefined;
    name: string | undefined;
    logo_uri: string | undefined;
    decimals: number | undefined;
    token_contract: string | undefined;
    description: string | undefined;
    coingecko_id: string | undefined;
    recommended_symbol: string | undefined;
};
type Asset = {
    denom: string;
    chainID: string;
    originDenom: string;
    originChainID: string;
    trace: string;
    isCW20: boolean;
    isEVM: boolean;
    isSVM: boolean;
    symbol: string | undefined;
    name: string | undefined;
    logoURI: string | undefined;
    decimals: number | undefined;
    tokenContract: string | undefined;
    description: string | undefined;
    coingeckoID: string | undefined;
    recommendedSymbol: string | undefined;
};
type TransferJSON = {
    port: string;
    channel: string;
    from_chain_id: string;
    to_chain_id: string;
    pfm_enabled: boolean;
    supports_memo: boolean;
    denom_in: string;
    denom_out: string;
    fee_amount?: string;
    usd_fee_amount?: string;
    fee_asset?: AssetJSON;
    bridge_id: BridgeType;
    smart_relay: boolean;
    to_chain_callback_contract_address?: string;
    to_chain_entry_contract_address?: string;
    /**
     * @deprecated use `from_chain_id` and `to_chain_id` instead
     */
    chain_id: string;
    /**
     * @deprecated use `denom_out` instead
     */
    dest_denom: string;
};
type Transfer = {
    port: string;
    channel: string;
    fromChainID: string;
    toChainID: string;
    pfmEnabled: boolean;
    supportsMemo: boolean;
    denomIn: string;
    denomOut: string;
    feeAmount?: string;
    usdFeeAmount?: string;
    feeAsset?: Asset;
    bridgeID: BridgeType;
    smartRelay: boolean;
    toChainCallbackContractAddress?: string;
    toChainEntryContractAddress?: string;
    /**
     * @deprecated use `fromChainID` and `toChainID` instead
     */
    chainID: string;
    /**
     * @deprecated use `denomOut` instead
     */
    destDenom: string;
};
type AxelarTransferJSON = {
    from_chain: string;
    from_chain_id: string;
    to_chain: string;
    to_chain_id: string;
    asset: string;
    should_unwrap: boolean;
    denom_in: string;
    denom_out: string;
    fee_amount: string;
    usd_fee_amount: string;
    fee_asset: AssetJSON;
    is_testnet: boolean;
    ibc_transfer_to_axelar?: TransferJSON;
    bridge_id: BridgeType;
    smart_relay: boolean;
};
type AxelarTransfer = {
    fromChain: string;
    fromChainID: string;
    toChain: string;
    toChainID: string;
    asset: string;
    shouldUnwrap: boolean;
    denomIn: string;
    denomOut: string;
    feeAmount: string;
    usdFeeAmount: string;
    feeAsset: Asset;
    isTestnet: boolean;
    ibcTransferToAxelar?: Transfer;
    bridgeID: BridgeType;
    smartRelay: boolean;
};
type GoFastFeeJSON = {
    fee_asset: AssetJSON;
    bps_fee: string;
    bps_fee_amount: string;
    bps_fee_usd: string;
    source_chain_fee_amount: string;
    source_chain_fee_usd: string;
    destination_chain_fee_amount: string;
    destination_chain_fee_usd: string;
};
type GoFastFee = {
    feeAsset: Asset;
    bpsFee: string;
    bpsFeeAmount: string;
    bpsFeeUSD: string;
    sourceChainFeeAmount: string;
    sourceChainFeeUSD: string;
    destinationChainFeeAmount: string;
    destinationChainFeeUSD: string;
};
type GoFastTransfer = {
    fromChainID: string;
    toChainID: string;
    fee: GoFastFee;
    bridgeID: BridgeType;
    denomIn: string;
    denomOut: string;
    sourceDomain: string;
    destinationDomain: string;
};
type GoFastTransferJSON = {
    from_chain_id: string;
    to_chain_id: string;
    fee: GoFastFeeJSON;
    bridge_id: BridgeType;
    denom_in: string;
    denom_out: string;
    source_domain: string;
    destination_domain: string;
};
type StargateTransferJSON = {
    from_chain_id: string;
    to_chain_id: string;
    denom_in: string;
    denom_out: string;
    pool_address: string;
    destination_endpoint_id: number;
    oft_fee_asset: AssetJSON;
    oft_fee_amount: string;
    oft_fee_amount_usd: string;
    messaging_fee_asset: AssetJSON;
    messaging_fee_amount: string;
    messaging_fee_amount_usd: string;
    bridge_id: BridgeType;
};
type StargateTransfer = {
    fromChainID: string;
    toChainID: string;
    denomIn: string;
    denomOut: string;
    poolAddress: string;
    destinationEndpointID: number;
    oftFeeAsset: Asset;
    oftFeeAmount: string;
    oftFeeAmountUSD: string;
    messagingFeeAsset: Asset;
    messagingFeeAmount: string;
    messagingFeeAmountUSD: string;
    bridgeID: BridgeType;
};
type BankSendJSON = {
    chain_id: string;
    denom: string;
};
type BankSend = {
    chainID: string;
    denom: string;
};
type MultiChainMsgJSON = {
    chain_id: string;
    path: string[];
    msg: string;
    msg_type_url: string;
};
type MultiChainMsg = {
    chainID: string;
    path: string[];
    msg: string;
    msgTypeURL: string;
};
type CosmosMsgJSON = {
    msg: string;
    msg_type_url: string;
};
type CosmosMsg = {
    msg: string;
    msgTypeURL: string;
};
type CosmosTxJSON = {
    chain_id: string;
    path: string[];
    msgs: CosmosMsgJSON[];
    signer_address: string;
};
type CosmosTx = {
    chainID: string;
    path: string[];
    msgs: CosmosMsg[];
    signerAddress: string;
};
type CCTPTransferJSON = {
    from_chain_id: string;
    to_chain_id: string;
    burn_token: string;
    bridge_id: BridgeType;
    denom_in: string;
    denom_out: string;
    smart_relay: boolean;
    smart_relay_fee_quote?: SmartRelayFeeQuoteJSON;
};
type CCTPTransfer = {
    fromChainID: string;
    toChainID: string;
    burnToken: string;
    bridgeID: BridgeType;
    denomIn: string;
    denomOut: string;
    smartRelay: boolean;
    smartRelayFeeQuote?: SmartRelayFeeQuote;
};
type HyperlaneTransferJSON = {
    from_chain_id: string;
    to_chain_id: string;
    denom_in: string;
    denom_out: string;
    hyperlane_contract_address: string;
    fee_amount: string;
    usd_fee_amount?: string;
    fee_asset: AssetJSON;
    bridge_id: BridgeType;
    smart_relay: boolean;
};
type HyperlaneTransfer = {
    fromChainID: string;
    toChainID: string;
    denomIn: string;
    denomOut: string;
    hyperlaneContractAddress: string;
    feeAmount: string;
    usdFeeAmount?: string;
    feeAsset: Asset;
    bridgeID: BridgeType;
    smartRelay: boolean;
};
type OPInitTransferJSON = {
    from_chain_id: string;
    to_chain_id: string;
    denom_in: string;
    denom_out: string;
    op_init_bridge_id: string;
    bridge_id: BridgeType;
    smart_relay: boolean;
};
type OPInitTransfer = {
    fromChainID: string;
    toChainID: string;
    denomIn: string;
    denomOut: string;
    opInitBridgeID: string;
    bridgeID: BridgeType;
    smartRelay: boolean;
};
type EurekaTransferJSON = {
    destination_port: string;
    source_client: string;
    from_chain_id: string;
    to_chain_id: string;
    pfm_enabled: boolean;
    supports_memo: boolean;
    entry_contract_address: string;
    callback_adapter_contract_address: string;
    denom_in: string;
    denom_out: string;
    bridge_id: BridgeType;
    smart_relay: boolean;
    smart_relay_fee_quote?: SmartRelayFeeQuoteJSON;
    to_chain_callback_contract_address?: string;
    to_chain_entry_contract_address?: string;
};
type EurekaTransfer = {
    destinationPort: string;
    sourceClient: string;
    fromChainID: string;
    toChainID: string;
    pfmEnabled: boolean;
    supportsMemo: boolean;
    entryContractAddress: string;
    callbackAdapterContractAddress: string;
    denomIn: string;
    denomOut: string;
    bridgeID: BridgeType;
    smartRelay: boolean;
    smartRelayFeeQuote?: SmartRelayFeeQuote;
    toChainCallbackContractAddress?: string;
    toChainEntryContractAddress?: string;
};
type SmartRelayFeeQuoteJSON = {
    fee_amount: string;
    relayer_address: string;
    expiration: Date;
    fee_payment_address: string;
    fee_denom: string;
};
type SmartRelayFeeQuote = {
    feeAmount: string;
    relayerAddress: string;
    expiration: Date;
    feePaymentAddress: string;
    feeDenom: string;
};
type SwapVenueJSON = {
    name: string;
    chain_id: string;
    logo_uri: string;
};
type SwapVenue = {
    name: string;
    chainID: string;
    logoUri: string;
};
type SwapVenueRequestJSON = {
    name: string;
    chain_id: string;
};
type SwapVenueRequest = {
    name: string;
    chainID: string;
};
type SwapOperationJSON = {
    pool: string;
    denom_in: string;
    denom_out: string;
    interface?: string;
};
type SwapOperation = {
    pool: string;
    denomIn: string;
    denomOut: string;
    interface?: string;
};
type SwapExactCoinOutJSON = {
    swap_venue: SwapVenueJSON;
    swap_operations: SwapOperationJSON[];
    swap_amount_out: string;
    price_impact_percent?: string;
};
type SwapExactCoinOut = {
    swapVenue: SwapVenue;
    swapOperations: SwapOperation[];
    swapAmountOut: string;
    priceImpactPercent?: string;
};
type SwapExactCoinInJSON = {
    swap_venue: SwapVenueJSON;
    swap_operations: SwapOperationJSON[];
    swap_amount_in?: string;
    price_impact_percent?: string;
    estimated_amount_out: string;
};
type SwapExactCoinIn = {
    swapVenue: SwapVenue;
    swapOperations: SwapOperation[];
    swapAmountIn?: string;
    priceImpactPercent?: string;
    estimatedAmountOut: string;
};
type SwapRouteJSON = {
    swap_amount_in: string;
    denom_in: string;
    swap_operations: SwapOperationJSON[];
};
type SwapRoute = {
    swapAmountIn: string;
    denomIn: string;
    swapOperations: SwapOperation[];
};
type SmartSwapExactCoinInJSON = {
    swap_venue: SwapVenueJSON;
    swap_routes: SwapRouteJSON[];
    estimated_amount_out: string;
};
type SmartSwapExactCoinIn = {
    swapVenue: SwapVenue;
    swapRoutes: SwapRoute[];
    estimatedAmountOut: string;
};
type SwapJSON = ({
    swap_in: SwapExactCoinInJSON;
} | {
    swap_out: SwapExactCoinOutJSON;
} | {
    smart_swap_in: SmartSwapExactCoinInJSON;
}) & {
    estimated_affiliate_fee?: string;
    from_chain_id: string;
    chain_id: string;
    denom_in: string;
    denom_out: string;
    swap_venues: SwapVenueJSON[];
};
type Swap = ({
    swapIn: SwapExactCoinIn;
} | {
    swapOut: SwapExactCoinOut;
} | {
    smartSwapIn: SmartSwapExactCoinIn;
}) & {
    estimatedAffiliateFee?: string;
    fromChainID: string;
    chainID: string;
    denomIn: string;
    denomOut: string;
    swapVenues: SwapVenue[];
};
type EvmSwapJSON = {
    input_token: string;
    amount_in: string;
    swap_calldata: string;
    amount_out: string;
    from_chain_id: string;
    denom_in: string;
    denom_out: string;
    swap_venues: SwapVenueJSON[];
};
type EvmSwap = {
    inputToken: string;
    amountIn: string;
    swapCalldata: string;
    amountOut: string;
    fromChainID: string;
    denomIn: string;
    denomOut: string;
    swapVenues: SwapVenue[];
};
type AffiliateJSON = {
    basis_points_fee: string;
    address: string;
};
type Affiliate = {
    basisPointsFee: string;
    address: string;
};
type ChainAffiliatesJSON = {
    affiliates: AffiliateJSON[];
};
type ChainAffiliates = {
    affiliates: Affiliate[];
};
type Reason = "UNKNOWN" | "BASE_TOKEN" | "MOST_LIQUID" | "DIRECT";
type CosmWasmContractMsgJSON = {
    contract_address: string;
    msg: string;
};
type CosmWasmContractMsg = {
    contractAddress: string;
    msg: string;
};
type AutopilotAction = "LIQUID_STAKE" | "CLAIM";
type AutopilotMsg = {
    receiver: string;
    action: AutopilotAction;
};
type PostHandlerJSON = {
    wasm_msg: CosmWasmContractMsgJSON;
} | {
    autopilot_msg: AutopilotMsg;
};
type PostHandler = {
    wasmMsg: CosmWasmContractMsg;
} | {
    autopilotMsg: AutopilotMsg;
};
type ERC20ApprovalJSON = {
    token_contract: string;
    spender: string;
    amount: string;
};
type ERC20Approval = {
    tokenContract: string;
    spender: string;
    amount: string;
};
type SvmTxJSON = {
    chain_id: string;
    tx: string;
    signer_address: string;
};
type SvmTx = {
    chainID: string;
    tx: string;
    signerAddress: string;
};
type EvmTxJSON = {
    chain_id: string;
    to: string;
    value: string;
    data: string;
    required_erc20_approvals: ERC20ApprovalJSON[];
    signer_address: string;
};
type EvmTx = {
    chainID: string;
    to: string;
    value: string;
    data: string;
    requiredERC20Approvals: ERC20Approval[];
    signerAddress: string;
};
type DenomWithChainIDJSON = {
    denom: string;
    chain_id: string;
};
type DenomWithChainID = {
    denom: string;
    chainID: string;
};
type ApiError = {
    message: string;
};
type AssetOrErrorJSON = {
    asset: AssetJSON;
} | {
    error: ApiError;
};
type AssetOrError = {
    asset: Asset;
} | {
    error: ApiError;
};
type OriginAssetsRequestJSON = {
    assets: DenomWithChainIDJSON[];
};
type OriginAssetsRequest = {
    assets: DenomWithChainID[];
};
type OriginAssetsResponseJSON = {
    origin_assets: AssetOrErrorJSON[];
};
type OriginAssetsResponse = {
    originAssets: AssetOrError[];
};
type SmartSwapOptionsJSON = {
    split_routes?: boolean;
    evm_swaps?: boolean;
};
type SmartSwapOptions = {
    splitRoutes?: boolean;
    evmSwaps?: boolean;
};

type AssetsRequestJSON = {
    chain_ids?: string[];
    native_only?: boolean;
    include_no_metadata_assets?: boolean;
    include_cw20_assets?: boolean;
    include_evm_assets?: boolean;
    include_svm_assets?: boolean;
    only_testnets?: boolean;
    /**
     * @deprecated Use `chain_ids` instead
     */
    chain_id?: string;
};
type AssetsRequest = {
    chainIDs?: string[];
    nativeOnly?: boolean;
    includeNoMetadataAssets?: boolean;
    includeCW20Assets?: boolean;
    includeEvmAssets?: boolean;
    includeSvmAssets?: boolean;
    onlyTestnets?: boolean;
    /**
     * @deprecated Use `chainIDs` instead
     */
    chainID?: string;
};
type AssetsFromSourceRequestJSON = {
    source_asset_denom: string;
    source_asset_chain_id: string;
    allow_multi_tx?: boolean;
    include_cw20_assets: boolean;
};
type AssetsFromSourceRequest = {
    sourceAssetDenom: string;
    sourceAssetChainID: string;
    allowMultiTx?: boolean;
    includeCW20Assets: boolean;
};
type AssetRecommendation = {
    asset: Asset;
    reason: Reason;
};
type AssetRecommendationJSON = {
    asset: AssetJSON;
    reason: Reason;
};
type AssetRecommendationRequestJSON = {
    source_asset_denom: string;
    source_asset_chain_id: string;
    dest_chain_id: string;
    reason?: Reason;
};
type AssetRecommendationRequest = {
    sourceAssetDenom: string;
    sourceAssetChainID: string;
    destChainID: string;
    reason?: Reason;
};
type ChainsRequest = {
    includeEVM?: boolean;
    includeSVM?: boolean;
    onlyTestnets?: boolean;
    chainIDs?: string[];
};
type ChainsRequestJSON = {
    include_evm?: boolean;
    include_svm?: boolean;
    only_testnets?: boolean;
    chain_ids?: string[];
};
type RecommendAssetsRequestJSON = {
    requests: AssetRecommendationRequestJSON[];
};
type RecommendAssetsRequest = {
    requests: AssetRecommendationRequest[];
};
type RecommendAssetsResponseJSON = {
    recommendations: AssetRecommendationJSON[];
    recommendation_entries: RecommendationEntryJSON[];
};
type RecommendAssetsResponse = {
    recommendations: AssetRecommendation[];
    recommendationEntries: RecommendationEntry[];
};
type RecommendationEntryJSON = {
    recommendations: AssetRecommendationJSON[];
    error?: ApiError;
};
type RecommendationEntry = {
    recommendations: AssetRecommendation[];
    error?: ApiError;
};
type RouteRequestBaseJSON = {
    source_asset_denom: string;
    source_asset_chain_id: string;
    dest_asset_denom: string;
    dest_asset_chain_id: string;
    cumulative_affiliate_fee_bps?: string;
    swap_venue?: SwapVenueRequestJSON;
    swap_venues?: SwapVenueRequestJSON[];
    allow_unsafe?: boolean;
    experimental_features?: ExperimentalFeature[];
    bridges?: BridgeType[];
    allow_multi_tx?: boolean;
    smart_relay?: boolean;
    smart_swap_options?: SmartSwapOptionsJSON;
    allow_swaps?: boolean;
    go_fast?: boolean;
};
type RouteRequestGivenInJSON = RouteRequestBaseJSON & {
    amount_in: string;
    amount_out?: never;
};
type RouteRequestGivenOutJSON = RouteRequestBaseJSON & {
    amount_in?: never;
    amount_out: string;
};
type RouteRequestJSON = RouteRequestGivenInJSON | RouteRequestGivenOutJSON;
type MsgsDirectResponse = {
    msgs: Msg[];
    txs: Tx[];
    route: RouteResponse;
    warning?: MsgsWarning;
};
type MsgsDirectResponseJSON = {
    msgs: MsgJSON[];
    txs: TxJSON[];
    route: RouteResponseJSON;
    warning?: MsgsWarning;
};
type RouteRequestBase = RouteConfig & {
    sourceAssetDenom: string;
    sourceAssetChainID: string;
    destAssetDenom: string;
    destAssetChainID: string;
};
type RouteConfig = {
    cumulativeAffiliateFeeBPS?: string;
    swapVenue?: SwapVenueRequest;
    swapVenues?: SwapVenueRequest[];
    allowUnsafe?: boolean;
    experimentalFeatures?: ExperimentalFeature[];
    bridges?: BridgeType[];
    allowMultiTx?: boolean;
    smartRelay?: boolean;
    smartSwapOptions?: SmartSwapOptions;
    allowSwaps?: boolean;
    goFast?: boolean;
};
type RouteRequestGivenIn = RouteRequestBase & {
    amountIn: string;
    amountOut?: never;
};
type RouteRequestGivenOut = RouteRequestBase & {
    amountIn?: never;
    amountOut: string;
};
type RouteRequest = RouteRequestGivenIn | RouteRequestGivenOut;
type RouteWarningType = "LOW_INFO_WARNING" | "BAD_PRICE_WARNING";
type MsgsWarningType = "INSUFFICIENT_GAS_AT_DEST_EOA" | "INSUFFICIENT_GAS_AT_INTERMEDIATE";
type ExperimentalFeature = "cctp" | "hyperlane" | "stargate" | "eureka";
type RouteWarning = {
    type: RouteWarningType;
    message: string;
};
type MsgsWarning = {
    type: MsgsWarningType;
    message: string;
};
declare enum FeeType {
    SMART_RELAY = "SMART_RELAY",
    BRIDGE = "BRIDGE"
}
type EstimatedFee = {
    feeType: FeeType;
    bridgeID: BridgeType;
    amount: string;
    usdAmount: string;
    originAsset: Asset;
    chainID: string;
    txIndex: number;
    operationIndex?: number;
};
type EstimatedFeeJSON = {
    fee_type: FeeType;
    bridge_id: BridgeType;
    amount: string;
    usd_amount: string;
    origin_asset: AssetJSON;
    chain_id: string;
    tx_index: number;
    operation_index?: number;
};
interface BaseOperationJSON {
    tx_index: number;
    amount_in: string;
    amount_out: string;
}
type OperationJSON = (BaseOperationJSON & {
    transfer: TransferJSON;
}) | (BaseOperationJSON & {
    bank_send: BankSendJSON;
}) | (BaseOperationJSON & {
    swap: SwapJSON;
}) | (BaseOperationJSON & {
    axelar_transfer: AxelarTransferJSON;
}) | (BaseOperationJSON & {
    cctp_transfer: CCTPTransferJSON;
}) | (BaseOperationJSON & {
    hyperlane_transfer: HyperlaneTransferJSON;
}) | (BaseOperationJSON & {
    evm_swap: EvmSwapJSON;
}) | (BaseOperationJSON & {
    op_init_transfer: OPInitTransferJSON;
}) | (BaseOperationJSON & {
    go_fast_transfer: GoFastTransferJSON;
}) | (BaseOperationJSON & {
    eureka_transfer: EurekaTransferJSON;
}) | (BaseOperationJSON & {
    stargate_transfer: StargateTransferJSON;
});
interface BaseOperation {
    txIndex: number;
    amountIn: string;
    amountOut: string;
}
type Operation = (BaseOperation & {
    transfer: Transfer;
}) | (BaseOperation & {
    bankSend: BankSend;
}) | (BaseOperation & {
    swap: Swap;
}) | (BaseOperation & {
    axelarTransfer: AxelarTransfer;
}) | (BaseOperation & {
    cctpTransfer: CCTPTransfer;
}) | (BaseOperation & {
    hyperlaneTransfer: HyperlaneTransfer;
}) | (BaseOperation & {
    evmSwap: EvmSwap;
}) | (BaseOperation & {
    opInitTransfer: OPInitTransfer;
}) | (BaseOperation & {
    goFastTransfer: GoFastTransfer;
}) | (BaseOperation & {
    eurekaTransfer: EurekaTransfer;
}) | (BaseOperation & {
    stargateTransfer: StargateTransfer;
});
type RouteResponseJSON = {
    source_asset_denom: string;
    source_asset_chain_id: string;
    dest_asset_denom: string;
    dest_asset_chain_id: string;
    amount_in: string;
    amount_out: string;
    operations: OperationJSON[];
    chain_ids: string[];
    required_chain_addresses: string[];
    does_swap: boolean;
    estimated_amount_out?: string;
    swap_venues?: SwapVenueJSON[];
    txs_required: number;
    usd_amount_in?: string;
    usd_amount_out?: string;
    swap_price_impact_percent?: string;
    warning?: RouteWarning;
    estimated_fees: EstimatedFeeJSON[];
    estimated_route_duration_seconds: number;
};
type RouteResponse = {
    sourceAssetDenom: string;
    sourceAssetChainID: string;
    destAssetDenom: string;
    destAssetChainID: string;
    amountIn: string;
    amountOut: string;
    operations: Operation[];
    chainIDs: string[];
    requiredChainAddresses: string[];
    doesSwap: boolean;
    estimatedAmountOut?: string;
    swapVenues?: SwapVenue[];
    txsRequired: number;
    usdAmountIn?: string;
    usdAmountOut?: string;
    swapPriceImpactPercent?: string;
    warning?: RouteWarning;
    estimatedFees: EstimatedFee[];
    estimatedRouteDurationSeconds: number;
};
type MsgsRequestJSON = {
    source_asset_denom: string;
    source_asset_chain_id: string;
    dest_asset_denom: string;
    dest_asset_chain_id: string;
    amount_in: string;
    amount_out: string;
    address_list: string[];
    operations: OperationJSON[];
    estimated_amount_out?: string;
    slippage_tolerance_percent?: string;
    affiliates?: AffiliateJSON[];
    chain_ids_to_affiliates?: Record<string, ChainAffiliatesJSON>;
    post_route_handler?: PostHandlerJSON;
    enable_gas_warnings?: boolean;
    timeout_seconds?: string;
};
type MsgsRequest = {
    sourceAssetDenom: string;
    sourceAssetChainID: string;
    destAssetDenom: string;
    destAssetChainID: string;
    amountIn: string;
    amountOut: string;
    /**
     * addresses should be in the same order with the `chainIDs` in the `route`
     */
    addressList: string[];
    operations: Operation[];
    estimatedAmountOut?: string;
    slippageTolerancePercent?: string;
    affiliates?: Affiliate[];
    chainIDsToAffiliates?: Record<string, ChainAffiliates>;
    postRouteHandler?: PostHandler;
    enableGasWarnings?: boolean;
    timeoutSeconds?: string;
};
type MsgsDirectRequestBaseJSON = {
    source_asset_denom: string;
    source_asset_chain_id: string;
    dest_asset_denom: string;
    dest_asset_chain_id: string;
    chain_ids_to_addresses: {
        [key: string]: string;
    };
    swap_venue?: SwapVenueJSON;
    swap_venues?: SwapVenueJSON[];
    slippage_tolerance_percent?: string;
    timeout_seconds?: string;
    affiliates?: AffiliateJSON[];
    chain_ids_to_affiliates?: Record<string, ChainAffiliatesJSON>;
    post_route_handler?: PostHandlerJSON;
    allow_unsafe?: boolean;
    experimental_features?: ExperimentalFeature[];
    bridges?: BridgeType[];
    allow_multi_tx?: boolean;
    smart_relay?: boolean;
    smart_swap_options?: SmartSwapOptionsJSON;
    allow_swaps?: boolean;
    enable_gas_warnings?: boolean;
    go_fast?: boolean;
};
type MsgsDirectRequestGivenInJSON = MsgsDirectRequestBaseJSON & {
    amount_in: string;
    amount_out?: never;
};
type MsgsDirectRequestGivenOutJSON = MsgsDirectRequestBaseJSON & {
    amount_in?: never;
    amount_out: string;
};
type MsgsDirectRequestJSON = MsgsDirectRequestGivenInJSON | MsgsDirectRequestGivenOutJSON;
type MsgsDirectRequestBase = {
    sourceAssetDenom: string;
    sourceAssetChainID: string;
    destAssetDenom: string;
    destAssetChainID: string;
    chainIdsToAddresses: {
        [key: string]: string;
    };
    swapVenue?: SwapVenue;
    swapVenues?: SwapVenue[];
    slippageTolerancePercent?: string;
    timeoutSeconds?: string;
    affiliates?: Affiliate[];
    chainIDsToAffiliates?: Record<string, ChainAffiliates>;
    postRouteHandler?: PostHandler;
    allowUnsafe?: boolean;
    experimentalFeatures?: ExperimentalFeature[];
    bridges?: BridgeType[];
    allowMultiTx?: boolean;
    smartRelay?: boolean;
    smartSwapOptions?: SmartSwapOptions;
    allowSwaps?: boolean;
    enableGasWarnings?: boolean;
    goFast?: boolean;
};
type MsgsDirectRequestGivenIn = MsgsDirectRequestBase & {
    amountIn: string;
    amountOut?: never;
};
type MsgsDirectRequestGivenOut = MsgsDirectRequestBase & {
    amountIn?: never;
    amountOut: string;
};
type MsgsDirectRequest = MsgsDirectRequestGivenIn | MsgsDirectRequestGivenOut;
type MsgJSON = {
    multi_chain_msg: MultiChainMsgJSON;
} | {
    evm_tx: EvmTxJSON;
} | {
    svm_tx: SvmTxJSON;
};
type Msg = {
    multiChainMsg: MultiChainMsg;
} | {
    evmTx: EvmTx;
} | {
    svmTx: SvmTx;
};
type TxJSON = {
    cosmos_tx: CosmosTxJSON;
    operations_indices: number[];
} | {
    evm_tx: EvmTxJSON;
    operations_indices: number[];
} | {
    svm_tx: SvmTxJSON;
    operations_indices: number[];
};
type Tx = {
    cosmosTx: CosmosTx;
    operationsIndices: number[];
} | {
    evmTx: EvmTx;
    operationsIndices: number[];
} | {
    svmTx: SvmTx;
    operationsIndices: number[];
};
type MsgsResponseJSON = {
    msgs: MsgJSON[];
    estimated_fees: EstimatedFeeJSON[];
    txs: TxJSON[];
    warning?: MsgsWarning;
};
type MsgsResponse = {
    /**
     * @deprecated Use `txs` instead
     */
    msgs: Msg[];
    estimatedFees: EstimatedFee[];
    txs: Tx[];
    warning?: MsgsWarning;
};
type BridgeType = "IBC" | "AXELAR" | "CCTP" | "HYPERLANE" | "OPINIT" | "GO_FAST" | "STARGATE" | "EUREKA";
declare enum ChainType {
    Cosmos = "cosmos",
    EVM = "evm",
    SVM = "svm"
}
type TxResult = {
    txHash: string;
    chainID: string;
};
type AssetBetweenChainsJSON = {
    asset_on_source: AssetJSON;
    asset_on_dest: AssetJSON;
    txs_required: number;
    bridges: BridgeType[];
};
type AssetBetweenChains = {
    assetOnSource: Asset;
    assetOnDest: Asset;
    txsRequired: number;
    bridges: BridgeType[];
};
type AssetsBetweenChainsRequestJSON = {
    source_chain_id: string;
    dest_chain_id: string;
    include_no_metadata_assets?: boolean;
    include_cw20_assets?: boolean;
    include_evm_assets?: boolean;
    allow_multi_tx?: boolean;
};
type AssetsBetweenChainsRequest = {
    sourceChainID: string;
    destChainID: string;
    includeNoMetadataAssets?: boolean;
    includeCW20Assets?: boolean;
    includeEvmAssets?: boolean;
    allowMultiTx?: boolean;
};
type AssetsBetweenChainsResponseJSON = {
    assets_between_chains: AssetBetweenChainsJSON[];
};
type AssetsBetweenChainsResponse = {
    assetsBetweenChains: AssetBetweenChains[];
};
type BalanceRequestChainEntryJSON = {
    address: string;
    denoms?: string[];
};
type BalanceRequestChainEntry = {
    address: string;
    denoms?: string[];
};
type BalanceRequestJSON = {
    chains: {
        [chain: string]: BalanceRequestChainEntryJSON;
    };
};
type BalanceRequest = {
    chains: {
        [chain: string]: BalanceRequestChainEntry;
    };
};
type BalanceResponseDenomEntryJSON = {
    amount: string;
    decimals?: number;
    formatted_amount: string;
    price?: string;
    value_usd?: string;
    error?: ApiError;
};
type BalanceResponseDenomEntry = {
    amount: string;
    decimals?: number;
    formattedAmount: string;
    price?: string;
    valueUSD?: string;
    error?: ApiError;
};
type BalanceResponseChainEntryJSON = {
    denoms: {
        [denom: string]: BalanceResponseDenomEntryJSON;
    };
};
type BalanceResponseChainEntry = {
    denoms: {
        [denom: string]: BalanceResponseDenomEntry;
    };
};
type BalanceResponseJSON = {
    chains: {
        [chain: string]: BalanceResponseChainEntryJSON;
    };
};
type BalanceResponse = {
    chains: {
        [chain: string]: BalanceResponseChainEntry;
    };
};
type BridgesResponseJSON = {
    bridges: BridgeJSON[];
};
type BridgesResponse = {
    bridges: Bridge[];
};
type BridgeJSON = {
    id: BridgeType;
    name: string;
    logo_uri: string;
};
type Bridge = {
    id: BridgeType;
    name: string;
    logoURI: string;
};

type ModuleSupport = {
    authz: boolean;
    feegrant: boolean;
};
type GasPriceInfo = {
    low: string;
    average: string;
    high: string;
};
type FeeAsset = {
    denom: string;
    gasPrice: GasPriceInfo | null;
};
type FeeAssetJSON = {
    denom: string;
    gas_price: GasPriceInfo | null;
};
type IbcCapabilities = {
    cosmosPfm: boolean;
    cosmosIbcHooks: boolean;
    cosmosMemo: boolean;
    cosmosAutopilot: boolean;
};
type IbcCapabilitiesJSON = {
    cosmos_pfm: boolean;
    cosmos_ibc_hooks: boolean;
    cosmos_memo: boolean;
    cosmos_autopilot: boolean;
};
type Chain = {
    chainName: string;
    chainID: string;
    pfmEnabled: boolean;
    cosmosSDKVersion?: string;
    modules?: Record<string, ModuleVersionInfo>;
    cosmosModuleSupport: ModuleSupport;
    supportsMemo: boolean;
    logoURI?: string;
    bech32Prefix: string;
    feeAssets: FeeAsset[];
    chainType: ChainType;
    ibcCapabilities: IbcCapabilities;
    isTestnet: boolean;
    prettyName: string;
};
type Venue = {
    name: string;
    chainID: string;
    logoURI: string;
};
type ChainJSON = {
    chain_name: string;
    chain_id: string;
    pfm_enabled: boolean;
    cosmos_sdk_version?: string;
    modules?: Record<string, ModuleVersionInfo>;
    cosmos_module_support: ModuleSupport;
    supports_memo: boolean;
    logo_uri?: string;
    bech32_prefix: string;
    fee_assets: FeeAssetJSON[];
    chain_type: ChainType;
    ibc_capabilities: IbcCapabilitiesJSON;
    is_testnet: boolean;
    pretty_name: string;
};
type ModuleVersionInfo = {
    path: string;
    version: string;
    sum: string;
};

declare function affiliateFromJSON(affiliateJSON: AffiliateJSON): Affiliate;
declare function affiliateToJSON(affiliate: Affiliate): AffiliateJSON;
declare function assetFromJSON(assetJSON: AssetJSON): Asset;
declare function assetToJSON(asset: Asset): AssetJSON;
declare function assetRecommendationFromJSON(assetRecommendationJSON: AssetRecommendationJSON): AssetRecommendation;
declare function assetRecommendationToJSON(assetRecommendation: AssetRecommendation): AssetRecommendationJSON;
declare function assetsFromSourceRequestFromJSON(assetsFromSourceRequestJSON: AssetsFromSourceRequestJSON): AssetsFromSourceRequest;
declare function assetsFromSourceRequestToJSON(assetsFromSourceRequest: AssetsFromSourceRequest): AssetsFromSourceRequestJSON;
declare function assetsRequestFromJSON(assetsRequestJSON: AssetsRequestJSON): AssetsRequest;
declare function assetsRequestToJSON(assetsRequest: AssetsRequest): AssetsRequestJSON;
declare function chainsRequestToJSON(chainsRequest: ChainsRequest): ChainsRequestJSON;
declare function chainFromJSON(chainJSON: ChainJSON): Chain;
declare function chainToJSON(chain: Chain): ChainJSON;
declare function feeAssetFromJSON(feeAssetJSON: FeeAssetJSON): FeeAsset;
declare function feeAssetToJSON(feeAsset: FeeAsset): FeeAssetJSON;
declare function ibcCapabilitiesFromJSON(ibcCapabilitiesJSON: IbcCapabilitiesJSON): IbcCapabilities;
declare function ibcCapabilitiesToJSON(ibcCapabilities: IbcCapabilities): IbcCapabilitiesJSON;
declare function recommendAssetsRequestFromJSON(recommendAssetsRequestJSON: RecommendAssetsRequestJSON): RecommendAssetsRequest;
declare function recommendAssetsRequestToJSON(recommendAssetsRequest: RecommendAssetsRequest): RecommendAssetsRequestJSON;
declare function recommendAssetsResponseFromJSON(value: RecommendAssetsResponseJSON): RecommendAssetsResponse;
declare function recommendAssetsResponseToJSON(value: RecommendAssetsResponse): RecommendAssetsResponseJSON;
declare function recommendationEntryFromJSON(value: RecommendationEntryJSON): RecommendationEntry;
declare function recommendationEntryToJSON(value: RecommendationEntry): RecommendationEntryJSON;
declare function estimatedFeeFromJSON(estimatedFeeJSON: EstimatedFeeJSON): EstimatedFee;
declare function estimatedFeeToJSON(estimatedFee: EstimatedFee): EstimatedFeeJSON;
declare function swapVenueFromJSON(swapVenueJSON: SwapVenueJSON): SwapVenue;
declare function swapVenueToJSON(swapVenue: SwapVenue): SwapVenueJSON;
declare function swapVenueRequestFromJSON(SwapVenueRequestJSON: SwapVenueRequestJSON): SwapVenueRequest;
declare function swapVenueRequestToJSON(swapVenueRequest: SwapVenueRequest): SwapVenueRequestJSON;
declare function routeRequestFromJSON(routeRequestJSON: RouteRequestJSON): RouteRequest;
declare function routeRequestToJSON(routeRequest: RouteRequest): RouteRequestJSON;
declare function transferFromJSON(transferJSON: TransferJSON): Transfer;
declare function transferToJSON(transfer: Transfer): TransferJSON;
declare function swapOperationFromJSON(swapOperationJSON: SwapOperationJSON): SwapOperation;
declare function swapOperationToJSON(swapOperation: SwapOperation): SwapOperationJSON;
declare function swapRouteFromJSON(swapRouteJSON: SwapRouteJSON): SwapRoute;
declare function swapRouteToJSON(swapRoute: SwapRoute): SwapRouteJSON;
declare function swapExactCoinInFromJSON(swapExactCoinInJSON: SwapExactCoinInJSON): SwapExactCoinIn;
declare function swapExactCoinInToJSON(swapExactCoinIn: SwapExactCoinIn): SwapExactCoinInJSON;
declare function smartSwapExactCoinInFromJSON(smartSwapExactCoinInJSON: SmartSwapExactCoinInJSON): SmartSwapExactCoinIn;
declare function smartSwapExactCoinInToJSON(smartSwapExactCoinIn: SmartSwapExactCoinIn): SmartSwapExactCoinInJSON;
declare function swapExactCoinOutFromJSON(swapExactCoinOutJSON: SwapExactCoinOutJSON): SwapExactCoinOut;
declare function swapExactCoinOutToJSON(swapExactCoinOut: SwapExactCoinOut): SwapExactCoinOutJSON;
declare function swapFromJSON(swapJSON: SwapJSON): Swap;
declare function swapToJSON(swap: Swap): SwapJSON;
declare function evmSwapFromJSON(evmSwapJSON: EvmSwapJSON): EvmSwap;
declare function evmSwapToJSON(evmSwap: EvmSwap): EvmSwapJSON;
declare function goFastFeeToJSON(goFastFee: GoFastFee): GoFastFeeJSON;
declare function goFastFeeFromJSON(goFastFeeJSON: GoFastFeeJSON): GoFastFee;
declare function goFastTransferToJSON(goFast: GoFastTransfer): GoFastTransferJSON;
declare function goFastTransferFromJSON(goFastJSON: GoFastTransferJSON): GoFastTransfer;
declare function stargateTransferFromJSON(stargateTransferJSON: StargateTransferJSON): StargateTransfer;
declare function stargateTransferToJSON(stargateTransfer: StargateTransfer): StargateTransferJSON;
declare function eurekaTransferFromJSON(eurekaTransferJSON: EurekaTransferJSON): EurekaTransfer;
declare function eurekaTransferToJSON(eurekaTransfer: EurekaTransfer): EurekaTransferJSON;
declare function operationFromJSON(operationJSON: OperationJSON): Operation;
declare function operationToJSON(operation: Operation): OperationJSON;
declare function routeResponseFromJSON(routeResponseJSON: RouteResponseJSON): RouteResponse;
declare function routeResponseToJSON(routeResponse: RouteResponse): RouteResponseJSON;
declare function cosmWasmContractMsgFromJSON(cosmWasmContractMsgJSON: CosmWasmContractMsgJSON): CosmWasmContractMsg;
declare function cosmWasmContractMsgToJSON(cosmWasmContractMsg: CosmWasmContractMsg): CosmWasmContractMsgJSON;
declare function postHandlerFromJSON(postHandlerJSON: PostHandlerJSON): PostHandler;
declare function postHandlerToJSON(postHandler: PostHandler): PostHandlerJSON;
declare function msgsRequestFromJSON(msgsRequestJSON: MsgsRequestJSON): MsgsRequest;
declare function msgsRequestToJSON(msgsRequest: MsgsRequest): MsgsRequestJSON;
declare function multiChainMsgFromJSON(multiChainMsgJSON: MultiChainMsgJSON): MultiChainMsg;
declare function multiChainMsgToJSON(multiChainMsg: MultiChainMsg): MultiChainMsgJSON;
declare function cosmosMsgFromJSON(cosmosMsgJSON: CosmosMsgJSON): CosmosMsg;
declare function cosmosMsgToJSON(cosmosMsg: CosmosMsg): CosmosMsgJSON;
declare function submitTxRequestFromJSON(submitTxRequestJSON: SubmitTxRequestJSON): SubmitTxRequest;
declare function submitTxRequestToJSON(submitTxRequest: SubmitTxRequest): SubmitTxRequestJSON;
declare function submitTxResponseFromJSON(submitTxResponseJSON: SubmitTxResponseJSON): SubmitTxResponse;
declare function submitTxResponseToJSON(submitTxResponse: SubmitTxResponse): SubmitTxResponseJSON;
declare function trackTxRequestFromJSON(trackRequestJSON: TrackTxRequestJSON): TrackTxRequest;
declare function trackTxRequestToJSON(trackRequest: TrackTxRequest): TrackTxRequestJSON;
declare function trackTxResponseFromJSON(trackResponseJSON: TrackTxResponseJSON): TrackTxResponse;
declare function trackTxResponseToJSON(trackResponse: TrackTxResponse): TrackTxResponseJSON;
declare function txStatusRequestFromJSON(txStatusRequestJSON: StatusRequestJSON): StatusRequest;
declare function txStatusRequestToJSON(txStatusRequest: StatusRequest): StatusRequestJSON;
declare function chainTransactionFromJSON(chainTransactionJSON: ChainTransactionJSON): ChainTransaction;
declare function chainTransactionToJSON(chainTransaction: ChainTransaction): ChainTransactionJSON;
declare function packetFromJSON(packetJSON: PacketJSON): Packet;
declare function packetToJSON(packet: Packet): PacketJSON;
declare function transferInfoFromJSON(transferInfoJSON: TransferInfoJSON): TransferInfo;
declare function transferInfoToJSON(transferInfo: TransferInfo): TransferInfoJSON;
declare function nextBlockingTransferFromJSON(nextBlockingTransferJSON: NextBlockingTransferJSON): NextBlockingTransfer;
declare function nextBlockingTransferToJSON(nextBlockingTransfer: NextBlockingTransfer): NextBlockingTransferJSON;
declare function transferAssetReleaseFromJSON(transferAssetReleaseJSON: TransferAssetReleaseJSON): TransferAssetRelease;
declare function transferAssetReleaseToJSON(transferAssetRelease: TransferAssetRelease): TransferAssetReleaseJSON;
declare function txStatusResponseFromJSON(statusResponseJSON: TxStatusResponseJSON): TxStatusResponse;
declare function txStatusResponseToJSON(statusResponse: TxStatusResponse): TxStatusResponseJSON;
declare function ibcAddressFromJSON(ibcAddressJSON: IBCAddressJSON): IBCAddress;
declare function ibcAddressToJSON(ibcAddress: IBCAddress): IBCAddressJSON;
declare function axelarTransferFromJSON(axelarTransferJSON: AxelarTransferJSON): AxelarTransfer;
declare function axelarTransferToJSON(axelarTransfer: AxelarTransfer): AxelarTransferJSON;
declare function bankSendFromJSON(value: BankSendJSON): BankSend;
declare function bankSendToJSON(value: BankSend): BankSendJSON;
declare function smartRelayFeeQuoteFromJSON(value: SmartRelayFeeQuoteJSON): SmartRelayFeeQuote;
declare function smartRelayFeeQuoteToJSON(value: SmartRelayFeeQuote): SmartRelayFeeQuoteJSON;
declare function cctpTransferFromJSON(value: CCTPTransferJSON): CCTPTransfer;
declare function cctpTransferToJSON(value: CCTPTransfer): CCTPTransferJSON;
declare function hyperlaneTransferFromJSON(value: HyperlaneTransferJSON): HyperlaneTransfer;
declare function hyperlaneTransferToJSON(value: HyperlaneTransfer): HyperlaneTransferJSON;
declare function opInitTransferFromJSON(value: OPInitTransferJSON): OPInitTransfer;
declare function opInitTransferToJSON(value: OPInitTransfer): OPInitTransferJSON;
declare function erc20ApprovalFromJSON(erc20ApprovalJSON: ERC20ApprovalJSON): ERC20Approval;
declare function erc20ApprovalToJSON(erc20Approval: ERC20Approval): ERC20ApprovalJSON;
declare function svmTxFromJSON(svmTxJSON: SvmTxJSON): SvmTx;
declare function svmTxToJSON(svmTx: SvmTx): SvmTxJSON;
declare function evmTxFromJSON(evmTxJSON: EvmTxJSON): EvmTx;
declare function evmTxToJSON(evmTx: EvmTx): EvmTxJSON;
declare function cosmosTxFromJSON(cosmosTxJSON: CosmosTxJSON): CosmosTx;
declare function cosmosTxToJSON(cosmosTx: CosmosTx): CosmosTxJSON;
declare function txFromJSON(txJSON: TxJSON): Tx;
declare function txToJSON(tx: Tx): TxJSON;
declare function msgFromJSON(msgJSON: MsgJSON): Msg;
declare function msgToJSON(msg: Msg): MsgJSON;
declare function messageResponseFromJSON(response: MsgsResponseJSON): MsgsResponse;
declare function sendTokenTransactionsFromJSON(sendTokenTransactionsJSON: SendTokenTransactionsJSON): SendTokenTransactions;
declare function sendTokenTransactionsToJSON(sendTokenTransactions: SendTokenTransactions): SendTokenTransactionsJSON;
declare function contractCallWithTokenTransactionsFromJSON(value: ContractCallWithTokenTransactionsJSON): ContractCallWithTokenTransactions;
declare function contractCallWithTokenTransactionsToJSON(value: ContractCallWithTokenTransactions): ContractCallWithTokenTransactionsJSON;
declare function axelarTransferTransactionsFromJSON(value: AxelarTransferTransactionsJSON): AxelarTransferTransactions;
declare function axelarTransferTransactionsToJSON(value: AxelarTransferTransactions): AxelarTransferTransactionsJSON;
declare function axelarTransferInfoFromJSON(value: AxelarTransferInfoJSON): AxelarTransferInfo;
declare function goFastTransferInfoFromJSON(value: GoFastTransferInfoJSON): GoFastTransferInfo;
declare function goFastTransferInfoToJson(value: GoFastTransferInfo): GoFastTransferInfoJSON;
declare function axelarTransferInfoToJSON(value: AxelarTransferInfo): AxelarTransferInfoJSON;
declare function transferEventFromJSON(value: TransferEventJSON): TransferEvent;
declare function transferEventToJSON(value: TransferEvent): TransferEventJSON;
declare function transferStatusFromJSON(value: TransferStatusJSON): TransferStatus;
declare function transferStatusToJSON(value: TransferStatus): TransferStatusJSON;
declare function denomWithChainIDFromJSON(value: DenomWithChainIDJSON): DenomWithChainID;
declare function denomWithChainIDToJSON(value: DenomWithChainID): DenomWithChainIDJSON;
declare function assetOrErrorFromJSON(value: AssetOrErrorJSON): AssetOrError;
declare function assetOrErrorToJSON(value: AssetOrError): AssetOrErrorJSON;
declare function originAssetsRequestFromJSON(value: OriginAssetsRequestJSON): OriginAssetsRequest;
declare function originAssetsRequestToJSON(value: OriginAssetsRequest): OriginAssetsRequestJSON;
declare function originAssetsResponseFromJSON(value: OriginAssetsResponseJSON): OriginAssetsResponse;
declare function originAssetsResponseToJSON(value: OriginAssetsResponse): OriginAssetsResponseJSON;
declare function assetBetweenChainsFromJSON(value: AssetBetweenChainsJSON): AssetBetweenChains;
declare function assetBetweenChainsToJSON(value: AssetBetweenChains): AssetBetweenChainsJSON;
declare function assetsBetweenChainsRequestFromJSON(value: AssetsBetweenChainsRequestJSON): AssetsBetweenChainsRequest;
declare function assetsBetweenChainsRequestToJSON(value: AssetsBetweenChainsRequest): AssetsBetweenChainsRequestJSON;
declare function assetsBetweenChainsResponseFromJSON(value: AssetsBetweenChainsResponseJSON): AssetsBetweenChainsResponse;
declare function assetRecommendationRequestFromJSON(value: AssetRecommendationRequestJSON): AssetRecommendationRequest;
declare function assetRecommendationRequestToJSON(value: AssetRecommendationRequest): AssetRecommendationRequestJSON;
declare function bridgesResponseFromJSON(value: BridgesResponseJSON): BridgesResponse;
declare function bridgesResponseToJSON(value: BridgesResponse): BridgesResponseJSON;
declare function bridgeFromJSON(value: BridgeJSON): Bridge;
declare function bridgeToJSON(value: Bridge): BridgeJSON;
declare function cctpTransferTransactionsFromJSON(value: CCTPTransferTransactionsJSON): CCTPTransferTransactions;
declare function cctpTransferTransactionsToJSON(value: CCTPTransferTransactions): CCTPTransferTransactionsJSON;
declare function cctpTransferInfoFromJSON(value: CCTPTransferInfoJSON): CCTPTransferInfo;
declare function cctpTransferInfoToJSON(value: CCTPTransferInfo): CCTPTransferInfoJSON;
declare function hyperlaneTransferTransactionsFromJSON(value: HyperlaneTransferTransactionsJSON): HyperlaneTransferTransactions;
declare function hyperlaneTransferTransactionsToJSON(value: HyperlaneTransferTransactions): HyperlaneTransferTransactionsJSON;
declare function goFastTransferTransactionsToJSON(value: GoFastTransferTransactions): GoFastTransferTransactionsJSON;
declare function goFastTransferTransactionsFromJSON(value: GoFastTransferTransactionsJSON): GoFastTransferTransactions;
declare function hyperlaneTransferInfoFromJSON(value: HyperlaneTransferInfoJSON): HyperlaneTransferInfo;
declare function hyperlaneTransferInfoToJSON(value: HyperlaneTransferInfo): HyperlaneTransferInfoJSON;
declare function opInitTransferTransactionsFromJSON(value: OPInitTransferTransactionsJSON): OPInitTransferTransactions;
declare function opInitTransferTransactionsToJSON(value: OPInitTransferTransactions): OPInitTransferTransactionsJSON;
declare function stargateTransferTransactionsFromJSON(value: StargateTransferTransactionsJSON): StargateTransferTransactions;
declare function stargateTransferTransactionsToJSON(value: StargateTransferTransactions): StargateTransferTransactionsJSON;
declare function opInitTransferInfoFromJSON(value: OPInitTransferInfoJSON): OPInitTransferInfo;
declare function opInitTransferInfoToJSON(value: OPInitTransferInfo): OPInitTransferInfoJSON;
declare function stargateTransferInfoFromJSON(value: StargateTransferInfoJSON): StargateTransferInfo;
declare function stargateTransferInfoToJSON(value: StargateTransferInfo): StargateTransferInfoJSON;
declare function eurekaTransferInfoFromJSON(value: EurekaTransferInfoJSON): EurekaTransferInfo;
declare function eurekaTransferInfoToJSON(value: EurekaTransferInfo): EurekaTransferInfoJSON;
declare function msgsDirectRequestFromJSON(msgDirectRequestJSON: MsgsDirectRequestJSON): MsgsDirectRequest;
declare function msgsDirectRequestToJSON(msgDirectRequest: MsgsDirectRequest): MsgsDirectRequestJSON;
declare function smartSwapOptionsFromJSON(smartSwapOptionsJSON: SmartSwapOptionsJSON): SmartSwapOptions;
declare function smartSwapOptionsToJSON(smartSwapOptions: SmartSwapOptions): SmartSwapOptionsJSON;
declare function chainIDsToAffiliatesMapFromJSON(value: Record<string, ChainAffiliatesJSON>): Record<string, ChainAffiliates>;
declare function chainIDsToAffiliatesMapToJSON(value: Record<string, ChainAffiliates>): Record<string, ChainAffiliatesJSON>;
declare function chainAffiliatesFromJSON(value: ChainAffiliatesJSON): ChainAffiliates;
declare function chainAffiliatesToJSON(value: ChainAffiliates): ChainAffiliatesJSON;
declare function balanceRequestChainEntryFromJSON(value: BalanceRequestChainEntryJSON): BalanceRequestChainEntry;
declare function balanceRequestChainEntryToJSON(value: BalanceRequestChainEntry): BalanceRequestChainEntryJSON;
declare function balanceRequestFromJSON(value: BalanceRequestJSON): BalanceRequest;
declare function balanceRequestToJSON(value: BalanceRequest): BalanceRequestJSON;
declare function balanceResponseDenomEntryFromJSON(value: BalanceResponseDenomEntryJSON): BalanceResponseDenomEntry;
declare function balanceResponseDenomEntryToJSON(value: BalanceResponseDenomEntry): BalanceResponseDenomEntryJSON;
declare function balanceResponseChainEntryFromJSON(value: BalanceResponseChainEntryJSON): BalanceResponseChainEntry;
declare function balanceResponseChainEntryToJSON(value: BalanceResponseChainEntry): BalanceResponseChainEntryJSON;
declare function balanceResponseFromJSON(value: BalanceResponseJSON): BalanceResponse;
declare function balanceResponseToJSON(value: BalanceResponse): BalanceResponseJSON;

/** Common Types */
interface UserAddress {
    chainID: string;
    address: string;
}
type EndpointOptions = {
    rpc?: string;
    rest?: string;
};
type Gas = {
    error: null | string;
    asset: FeeAsset | null;
    fee: StdFee | null;
};
/** Signer Getters */
interface SignerGetters {
    getEVMSigner?: (chainID: string) => Promise<WalletClient>;
    getCosmosSigner?: (chainID: string) => Promise<(OfflineAminoSigner & OfflineDirectSigner) | OfflineAminoSigner | OfflineDirectSigner>;
    getSVMSigner?: () => Promise<Adapter>;
}
/** Gas Options */
type GetFallbackGasAmount = (chainID: string, chainType: ChainType) => Promise<number | undefined>;
type GetGasPrice = (chainID: string, chainType: ChainType) => Promise<GasPrice | undefined>;
interface GasOptions {
    /**
     * If `getGasPrice` is undefined, or returns undefined, the router will attempt to set the recommended gas price
     **/
    getGasPrice?: GetGasPrice;
    /**
     * If `getFallbackGasAmount` is set, when router fails to simulate the gas amount, it will use the fallback gas amount
     */
    getFallbackGasAmount?: GetFallbackGasAmount;
    gasAmountMultiplier?: number;
}
/** Skip Client Options */
interface SkipClientOptions extends SignerGetters {
    apiURL?: string;
    apiKey?: string;
    endpointOptions?: {
        endpoints?: Record<string, EndpointOptions>;
        getRpcEndpointForChain?: (chainID: string) => Promise<string>;
        getRestEndpointForChain?: (chainID: string) => Promise<string>;
    };
    aminoTypes?: AminoConverters;
    registryTypes?: Iterable<[string, GeneratedType]>;
    chainIDsToAffiliates?: Record<string, ChainAffiliates>;
    cacheDurationMs?: number;
}
/** Execute Route Options */
type ExecuteRouteOptions = SignerGetters & GasOptions & TransactionCallbacks & Pick<MsgsRequest, "timeoutSeconds"> & {
    route: RouteResponse;
    /**
     * Addresses should be in the same order with the `chainIDs` in the `route`
     */
    userAddresses: UserAddress[];
    simulate?: boolean;
    slippageTolerancePercent?: string;
    /**
     * Arbitrary Tx to be executed before or after route msgs
     */
    beforeMsg?: CosmosMsg;
    afterMsg?: CosmosMsg;
    /**
     * Set allowance amount to max if EVM transaction requires allowance approval.
     */
    useUnlimitedApproval?: boolean;
    /**
    /**
     * If `skipApproval` is set to `true`, the router will bypass checking whether
     * the signer has granted approval for the specified token contract on an EVM chain.
     * This can be useful if approval has already been handled externally or there are race conditions.
     */
    bypassApprovalCheck?: boolean;
};
type ExecuteCosmosMessageOptions = {
    signerAddress: string;
    signer: OfflineSigner;
    message: MultiChainMsg;
    fee: StdFee;
};
type ExecuteCosmosMessage = GasOptions & {
    signerAddress: string;
    getCosmosSigner?: SignerGetters["getCosmosSigner"];
    chainID: string;
    messages: CosmosMsg[];
    gas: Gas;
    onTransactionSigned?: TransactionCallbacks["onTransactionSigned"];
    onTransactionBroadcast?: TransactionCallbacks["onTransactionBroadcast"];
};
interface SignCosmosMessageOptionsBase {
    signerAddress: string;
    chainID: string;
    cosmosMsgs: CosmosMsg[];
    fee: StdFee;
    signerData: SignerData;
}
type SignCosmosMessageDirectOptions = SignCosmosMessageOptionsBase & {
    signer: OfflineDirectSigner;
};
type SignCosmosMessageAminoOptions = SignCosmosMessageOptionsBase & {
    signer: OfflineAminoSigner;
};

declare const SKIP_API_URL = "https://api.skip.build";
declare const GAS_STATION_CHAIN_IDS: string[];
declare class SkipClient {
    protected requestClient: RequestClient;
    protected aminoTypes: AminoTypes;
    protected registry: Registry;
    protected endpointOptions: {
        endpoints?: Record<string, EndpointOptions>;
        getRpcEndpointForChain?: (chainID: string) => Promise<string>;
        getRestEndpointForChain?: (chainID: string) => Promise<string>;
    };
    getCosmosSigner?: SignerGetters["getCosmosSigner"];
    getEVMSigner?: SignerGetters["getEVMSigner"];
    getSVMSigner?: SignerGetters["getSVMSigner"];
    chainIDsToAffiliates?: SkipClientOptions["chainIDsToAffiliates"];
    cumulativeAffiliateFeeBPS?: string;
    private clientOptions;
    private skipChains?;
    private skipAssets?;
    private skipBalances?;
    private signingStargateClientByChainId;
    private gasFee;
    constructor(options?: SkipClientOptions);
    updateOptions(options?: SkipClientOptions): void;
    assets(options?: AssetsRequest): Promise<Record<string, Asset[]>>;
    chains(options?: ChainsRequest): Promise<Chain[]>;
    assetsFromSource(options: AssetsFromSourceRequest): Promise<Record<string, Asset[]>>;
    assetsBetweenChains(options: AssetsBetweenChainsRequest): Promise<AssetBetweenChains[]>;
    bridges(): Promise<Bridge[]>;
    balances(request: BalanceRequest): Promise<BalanceResponse>;
    executeRoute(options: ExecuteRouteOptions): Promise<void>;
    executeTxs(options: ExecuteRouteOptions & {
        txs: Tx[];
    }): Promise<void>;
    private executeCosmosTx;
    private executeSvmTx;
    executeEvmMsg(message: {
        evmTx: EvmTx;
    }, options: ExecuteRouteOptions): Promise<viem.TransactionReceipt>;
    executeCosmosMessage(options: ExecuteCosmosMessage & {
        stargateClient: SigningStargateClient;
        signer: OfflineSigner;
    }): Promise<_cosmjs_cosmwasm_stargate.DeliverTxResponse>;
    executeEVMTransaction({ message, signer, options, }: {
        message: EvmTx;
        signer: WalletClient;
        options: ExecuteRouteOptions;
    }): Promise<viem.TransactionReceipt>;
    executeSVMTransaction({ signer, message, options: options, }: {
        signer: Adapter;
        message: SvmTx;
        options: ExecuteRouteOptions;
    }): Promise<string>;
    getSigningStargateClient({ chainId, getOfflineSigner, }: {
        chainId: string;
        getOfflineSigner?: (chainID: string) => Promise<OfflineSigner>;
    }): Promise<{
        stargateClient: SigningStargateClient;
        signer: OfflineSigner;
    }>;
    private getAssets;
    private getChains;
    signCosmosMessageDirect(options: SignCosmosMessageDirectOptions): Promise<TxRaw>;
    private signCosmosMessageDirectEvmos;
    private signCosmosMessageDirectInjective;
    signCosmosMessageAmino(options: SignCosmosMessageAminoOptions): Promise<TxRaw>;
    messages(options: MsgsRequest): Promise<MsgsResponse>;
    route(options: RouteRequest): Promise<RouteResponse>;
    msgsDirect(options: MsgsDirectRequest): Promise<MsgsDirectResponse>;
    recommendAssets(request: AssetRecommendationRequest | AssetRecommendationRequest[]): Promise<RecommendationEntry[]>;
    ibcOriginAssets(assets: DenomWithChainID[]): Promise<AssetOrError[]>;
    submitTransaction({ chainID, tx, }: {
        chainID: string;
        tx: string;
    }): Promise<SubmitTxResponse>;
    trackTransaction({ chainID, txHash, options, }: {
        chainID: string;
        txHash: string;
        options?: {
            /**
             * Retry options
             * @default { maxRetries: 5, retryInterval: 1000, backoffMultiplier: 2 }
             */
            retry?: {
                /**
                 * Maximum number of retries
                 * @default 5
                 */
                maxRetries?: number;
                /**
                 * Retry interval in milliseconds
                 * @default 1000
                 */
                retryInterval?: number;
                /**
                 * Backoff multiplier for retries
                 *
                 * example: `retryInterval` is set to 1000, backoffMultiplier is set to 2
                 *
                 * 1st retry: 1000ms
                 *
                 * 2nd retry: 2000ms
                 *
                 * 3rd retry: 4000ms
                 *
                 * 4th retry: 8000ms
                 *
                 * 5th retry: 16000ms
                 *
                 * @default 2
                 */
                backoffMultiplier?: number;
            };
        };
    }): Promise<TrackTxResponse>;
    transactionStatus({ chainID, txHash, options, }: {
        chainID: string;
        txHash: string;
        options?: {
            /**
             * Retry options
             * @default { maxRetries: 5, retryInterval: 1000, backoffMultiplier: 2 }
             */
            retry?: {
                /**
                 * Maximum number of retries
                 * @default 5
                 */
                maxRetries?: number;
                /**
                 * Retry interval in milliseconds
                 * @default 1000
                 */
                retryInterval?: number;
                /**
                 * Backoff multiplier for retries
                 *
                 * example: `retryInterval` is set to 1000, backoffMultiplier is set to 2
                 *
                 * 1st retry: 1000ms
                 *
                 * 2nd retry: 2000ms
                 *
                 * 3rd retry: 4000ms
                 *
                 * 4th retry: 8000ms
                 *
                 * 5th retry: 16000ms
                 *
                 * @default 2
                 */
                backoffMultiplier?: number;
            };
        };
    }): Promise<TxStatusResponse>;
    waitForTransaction({ chainID, txHash, onTransactionTracked, }: {
        chainID: string;
        txHash: string;
        onTransactionTracked?: (txInfo: {
            txHash: string;
            chainID: string;
            explorerLink: string;
        }) => Promise<void>;
    }): Promise<TxStatusResponse>;
    venues(onlyTestnets?: boolean): Promise<SwapVenue[]>;
    getAccountNumberAndSequence(address: string, chainID: string): Promise<{
        accountNumber: number;
        sequence: number;
    }>;
    private getAccountNumberAndSequenceFromDymension;
    private getAccountNumberAndSequenceFromEvmos;
    private getAccountNumberAndSequenceInjective;
    getRpcEndpointForChain(chainID: string): Promise<string>;
    getRestEndpointForChain(chainID: string): Promise<string>;
    getRecommendedGasPrice(chainID: string): Promise<GasPrice | undefined>;
    getFeeInfoForChain(chainID: string): Promise<FeeAsset | undefined>;
    private getDefaultGasTokenForChain;
    private getStakingTokensForChain;
    validateGasBalances({ txs, onValidateGasBalance, getFallbackGasAmount, getCosmosSigner, simulate, disabledChainIds, enabledChainIds, }: {
        txs: Tx[];
        onValidateGasBalance?: ExecuteRouteOptions["onValidateGasBalance"];
        getFallbackGasAmount?: GetFallbackGasAmount;
        simulate?: ExecuteRouteOptions["simulate"];
        disabledChainIds?: string[];
        enabledChainIds?: string[];
    } & Pick<SignerGetters, "getCosmosSigner">): Promise<void>;
    /**
     *
     * Validate gas balance for cosmos messages returns a fee asset and StdFee to be used
     *
     */
    validateCosmosGasBalance({ chainID, signerAddress, messages, getFallbackGasAmount, getOfflineSigner, txIndex, simulate, }: {
        chainID: string;
        signerAddress: string;
        messages?: CosmosMsg[];
        getOfflineSigner?: (chainID: string) => Promise<OfflineSigner>;
        getFallbackGasAmount?: GetFallbackGasAmount;
        txIndex?: number;
        simulate?: ExecuteRouteOptions["simulate"];
    }): Promise<{
        error: string;
        asset?: undefined;
        fee?: undefined;
    } | {
        error: string;
        asset: FeeAsset;
        fee?: undefined;
    } | {
        error: null;
        asset: FeeAsset;
        fee: StdFee;
    }>;
    validateEvmGasBalance({ signer, tx, }: {
        signer: WalletClient;
        tx: EvmTx;
    }): Promise<void>;
    validateEvmTokenApprovalBalance({ signer, contractAddress, spender, amount, }: {
        signer: WalletClient;
        contractAddress: string;
        spender: string;
        amount: bigint;
    }): Promise<void>;
    validateSvmGasBalance({ tx }: {
        tx: SvmTx;
    }): Promise<{
        error: string;
        asset: null;
        fee: null;
    } | undefined>;
    getMainnetAndTestnetChains(): Promise<Chain[]>;
    getMainnetAndTestnetAssets(chainId?: string): Promise<{
        [x: string]: Asset[];
    }>;
    validateUserAddresses(userAddresses: UserAddress[]): Promise<boolean>;
}
/**
 * @deprecated SkipRouter is deprecated please use SkipClient instead
 */
declare class SkipRouter extends SkipClient {
}

declare const DEFAULT_GAS_MULTIPLIER = 1.5;
declare function getEncodeObjectFromCosmosMessage(message: CosmosMsg): EncodeObject;
declare function getEncodeObjectFromCosmosMessageInjective(message: CosmosMsg): Msgs;
declare function getCosmosGasAmountForMessage(client: SigningStargateClient, signerAddress: string, chainID: string, messages?: CosmosMsg[], encodedMsgs?: EncodeObject[], multiplier?: number): Promise<string>;
declare function getEVMGasAmountForMessage(signer: WalletClient, tx: EvmTx): Promise<bigint>;
declare function getEVMGasAmountForTokenApproval(signer: WalletClient, contractAddress: string, spender: string, amount: bigint): Promise<bigint>;
declare function getSVMGasAmountForMessage(connection: Connection, tx: SvmTx): Promise<number>;

export { type AcknowledgementError, type Affiliate, type AffiliateJSON, type ApiError, type Asset, type AssetBetweenChains, type AssetBetweenChainsJSON, type AssetJSON, type AssetOrError, type AssetOrErrorJSON, type AssetRecommendation, type AssetRecommendationJSON, type AssetRecommendationRequest, type AssetRecommendationRequestJSON, type AssetsBetweenChainsRequest, type AssetsBetweenChainsRequestJSON, type AssetsBetweenChainsResponse, type AssetsBetweenChainsResponseJSON, type AssetsFromSourceRequest, type AssetsFromSourceRequestJSON, type AssetsRequest, type AssetsRequestJSON, type AutopilotAction, type AutopilotMsg, type AxelarTransfer, type AxelarTransferInfo, type AxelarTransferInfoJSON, type AxelarTransferJSON, type AxelarTransferState, type AxelarTransferTransactions, type AxelarTransferTransactionsJSON, type AxelarTransferType, type BalanceRequest, type BalanceRequestChainEntry, type BalanceRequestChainEntryJSON, type BalanceRequestJSON, type BalanceResponse, type BalanceResponseChainEntry, type BalanceResponseChainEntryJSON, type BalanceResponseDenomEntry, type BalanceResponseDenomEntryJSON, type BalanceResponseJSON, type BankSend, type BankSendJSON, type Bridge, type BridgeJSON, type BridgeType, type BridgesResponse, type BridgesResponseJSON, type CCTPTransfer, type CCTPTransferInfo, type CCTPTransferInfoJSON, type CCTPTransferJSON, type CCTPTransferState, type CCTPTransferTransactions, type CCTPTransferTransactionsJSON, type Chain, type ChainAffiliates, type ChainAffiliatesJSON, type ChainJSON, type ChainTransaction, type ChainTransactionJSON, ChainType, type ChainsRequest, type ChainsRequestJSON, type ContractCallWithTokenError, type ContractCallWithTokenErrorType, type ContractCallWithTokenTransactions, type ContractCallWithTokenTransactionsJSON, type CosmWasmContractMsg, type CosmWasmContractMsgJSON, type CosmosMsg, type CosmosMsgJSON, type CosmosTx, type CosmosTxJSON, DEFAULT_GAS_MULTIPLIER, type DenomWithChainID, type DenomWithChainIDJSON, type ERC20Approval, type ERC20ApprovalJSON, type EndpointOptions, type EstimatedFee, type EstimatedFeeJSON, type EurekaTransfer, type EurekaTransferInfo, type EurekaTransferInfoJSON, type EurekaTransferJSON, type EvmSwap, type EvmSwapJSON, type EvmTx, type EvmTxJSON, type ExecuteCosmosMessage, type ExecuteCosmosMessageOptions, type ExecuteRouteOptions, type ExperimentalFeature, type FeeAsset, type FeeAssetJSON, FeeType, GAS_STATION_CHAIN_IDS, type Gas, type GasPriceInfo, type GetFallbackGasAmount, type GetGasPrice, type GoFastFee, type GoFastFeeJSON, type GoFastTransfer, type GoFastTransferInfo, type GoFastTransferInfoJSON, type GoFastTransferJSON, type GoFastTransferState, type GoFastTransferTransactions, type GoFastTransferTransactionsJSON, type HyperlaneTransfer, type HyperlaneTransferInfo, type HyperlaneTransferInfoJSON, type HyperlaneTransferJSON, type HyperlaneTransferState, type HyperlaneTransferTransactions, type HyperlaneTransferTransactionsJSON, type IBCAddress, type IBCAddressJSON, type IbcCapabilities, type IbcCapabilitiesJSON, type ModuleSupport, type ModuleVersionInfo, type Msg, type MsgJSON, type MsgsDirectRequest, type MsgsDirectRequestBase, type MsgsDirectRequestBaseJSON, type MsgsDirectRequestGivenIn, type MsgsDirectRequestGivenInJSON, type MsgsDirectRequestGivenOut, type MsgsDirectRequestGivenOutJSON, type MsgsDirectRequestJSON, type MsgsDirectResponse, type MsgsDirectResponseJSON, type MsgsRequest, type MsgsRequestJSON, type MsgsResponse, type MsgsResponseJSON, type MsgsWarning, type MsgsWarningType, type MultiChainMsg, type MultiChainMsgJSON, type NextBlockingTransfer, type NextBlockingTransferJSON, type OPInitTransfer, type OPInitTransferInfo, type OPInitTransferInfoJSON, type OPInitTransferJSON, type OPInitTransferState, type OPInitTransferTransactions, type OPInitTransferTransactionsJSON, type Operation, type OperationJSON, type OriginAssetsRequest, type OriginAssetsRequestJSON, type OriginAssetsResponse, type OriginAssetsResponseJSON, type Packet, type PacketError, type PacketErrorJSON, type PacketErrorType, type PacketJSON, type PostHandler, type PostHandlerJSON, type Reason, type RecommendAssetsRequest, type RecommendAssetsRequestJSON, type RecommendAssetsResponse, type RecommendAssetsResponseJSON, type RecommendationEntry, type RecommendationEntryJSON, type RouteConfig, type RouteRequest, type RouteRequestBase, type RouteRequestBaseJSON, type RouteRequestGivenIn, type RouteRequestGivenInJSON, type RouteRequestGivenOut, type RouteRequestGivenOutJSON, type RouteRequestJSON, type RouteResponse, type RouteResponseJSON, type RouteWarning, type RouteWarningType, SKIP_API_URL, type SendTokenError, type SendTokenErrorType, type SendTokenTransactions, type SendTokenTransactionsJSON, type SignCosmosMessageAminoOptions, type SignCosmosMessageDirectOptions, type SignerGetters, SkipClient, type SkipClientOptions, SkipRouter, type SmartRelayFeeQuote, type SmartRelayFeeQuoteJSON, type SmartSwapExactCoinIn, type SmartSwapExactCoinInJSON, type SmartSwapOptions, type SmartSwapOptionsJSON, type StargateTransfer, type StargateTransferInfo, type StargateTransferInfoJSON, type StargateTransferJSON, type StargateTransferState, type StargateTransferTransactions, type StargateTransferTransactionsJSON, type StatusError, type StatusErrorJSON, type StatusErrorType, type StatusRequest, type StatusRequestJSON, type StatusState, type SubmitTxRequest, type SubmitTxRequestJSON, type SubmitTxResponse, type SubmitTxResponseJSON, type SvmTx, type SvmTxJSON, type Swap, type SwapExactCoinIn, type SwapExactCoinInJSON, type SwapExactCoinOut, type SwapExactCoinOutJSON, type SwapJSON, type SwapOperation, type SwapOperationJSON, type SwapRoute, type SwapRouteJSON, type SwapVenue, type SwapVenueJSON, type SwapVenueRequest, type SwapVenueRequestJSON, type TrackTxRequest, type TrackTxRequestJSON, type TrackTxResponse, type TrackTxResponseJSON, type TransactionCallbacks, type TransactionExecutionError, type Transfer, type TransferAssetRelease, type TransferAssetReleaseJSON, type TransferEvent, type TransferEventJSON, type TransferInfo, type TransferInfoJSON, type TransferJSON, type TransferState, type TransferStatus, type TransferStatusJSON, type Tx, type TxJSON, type TxResult, type TxStatusResponse, type TxStatusResponseJSON, type UserAddress, type Venue, affiliateFromJSON, affiliateToJSON, assetBetweenChainsFromJSON, assetBetweenChainsToJSON, assetFromJSON, assetOrErrorFromJSON, assetOrErrorToJSON, assetRecommendationFromJSON, assetRecommendationRequestFromJSON, assetRecommendationRequestToJSON, assetRecommendationToJSON, assetToJSON, assetsBetweenChainsRequestFromJSON, assetsBetweenChainsRequestToJSON, assetsBetweenChainsResponseFromJSON, assetsFromSourceRequestFromJSON, assetsFromSourceRequestToJSON, assetsRequestFromJSON, assetsRequestToJSON, axelarTransferFromJSON, axelarTransferInfoFromJSON, axelarTransferInfoToJSON, axelarTransferToJSON, axelarTransferTransactionsFromJSON, axelarTransferTransactionsToJSON, balanceRequestChainEntryFromJSON, balanceRequestChainEntryToJSON, balanceRequestFromJSON, balanceRequestToJSON, balanceResponseChainEntryFromJSON, balanceResponseChainEntryToJSON, balanceResponseDenomEntryFromJSON, balanceResponseDenomEntryToJSON, balanceResponseFromJSON, balanceResponseToJSON, bankSendFromJSON, bankSendToJSON, bridgeFromJSON, bridgeToJSON, bridgesResponseFromJSON, bridgesResponseToJSON, cctpTransferFromJSON, cctpTransferInfoFromJSON, cctpTransferInfoToJSON, cctpTransferToJSON, cctpTransferTransactionsFromJSON, cctpTransferTransactionsToJSON, chainAffiliatesFromJSON, chainAffiliatesToJSON, chainFromJSON, chainIDsToAffiliatesMapFromJSON, chainIDsToAffiliatesMapToJSON, chainToJSON, chainTransactionFromJSON, chainTransactionToJSON, chainsRequestToJSON, contractCallWithTokenTransactionsFromJSON, contractCallWithTokenTransactionsToJSON, cosmWasmContractMsgFromJSON, cosmWasmContractMsgToJSON, cosmosMsgFromJSON, cosmosMsgToJSON, cosmosTxFromJSON, cosmosTxToJSON, denomWithChainIDFromJSON, denomWithChainIDToJSON, erc20ApprovalFromJSON, erc20ApprovalToJSON, estimatedFeeFromJSON, estimatedFeeToJSON, eurekaTransferFromJSON, eurekaTransferInfoFromJSON, eurekaTransferInfoToJSON, eurekaTransferToJSON, evmSwapFromJSON, evmSwapToJSON, evmTxFromJSON, evmTxToJSON, feeAssetFromJSON, feeAssetToJSON, getCosmosGasAmountForMessage, getEVMGasAmountForMessage, getEVMGasAmountForTokenApproval, getEncodeObjectFromCosmosMessage, getEncodeObjectFromCosmosMessageInjective, getSVMGasAmountForMessage, goFastFeeFromJSON, goFastFeeToJSON, goFastTransferFromJSON, goFastTransferInfoFromJSON, goFastTransferInfoToJson, goFastTransferToJSON, goFastTransferTransactionsFromJSON, goFastTransferTransactionsToJSON, hyperlaneTransferFromJSON, hyperlaneTransferInfoFromJSON, hyperlaneTransferInfoToJSON, hyperlaneTransferToJSON, hyperlaneTransferTransactionsFromJSON, hyperlaneTransferTransactionsToJSON, ibcAddressFromJSON, ibcAddressToJSON, ibcCapabilitiesFromJSON, ibcCapabilitiesToJSON, messageResponseFromJSON, msgFromJSON, msgToJSON, msgsDirectRequestFromJSON, msgsDirectRequestToJSON, msgsRequestFromJSON, msgsRequestToJSON, multiChainMsgFromJSON, multiChainMsgToJSON, nextBlockingTransferFromJSON, nextBlockingTransferToJSON, opInitTransferFromJSON, opInitTransferInfoFromJSON, opInitTransferInfoToJSON, opInitTransferToJSON, opInitTransferTransactionsFromJSON, opInitTransferTransactionsToJSON, operationFromJSON, operationToJSON, originAssetsRequestFromJSON, originAssetsRequestToJSON, originAssetsResponseFromJSON, originAssetsResponseToJSON, packetFromJSON, packetToJSON, postHandlerFromJSON, postHandlerToJSON, recommendAssetsRequestFromJSON, recommendAssetsRequestToJSON, recommendAssetsResponseFromJSON, recommendAssetsResponseToJSON, recommendationEntryFromJSON, recommendationEntryToJSON, routeRequestFromJSON, routeRequestToJSON, routeResponseFromJSON, routeResponseToJSON, sendTokenTransactionsFromJSON, sendTokenTransactionsToJSON, smartRelayFeeQuoteFromJSON, smartRelayFeeQuoteToJSON, smartSwapExactCoinInFromJSON, smartSwapExactCoinInToJSON, smartSwapOptionsFromJSON, smartSwapOptionsToJSON, stargateTransferFromJSON, stargateTransferInfoFromJSON, stargateTransferInfoToJSON, stargateTransferToJSON, stargateTransferTransactionsFromJSON, stargateTransferTransactionsToJSON, submitTxRequestFromJSON, submitTxRequestToJSON, submitTxResponseFromJSON, submitTxResponseToJSON, svmTxFromJSON, svmTxToJSON, swapExactCoinInFromJSON, swapExactCoinInToJSON, swapExactCoinOutFromJSON, swapExactCoinOutToJSON, swapFromJSON, swapOperationFromJSON, swapOperationToJSON, swapRouteFromJSON, swapRouteToJSON, swapToJSON, swapVenueFromJSON, swapVenueRequestFromJSON, swapVenueRequestToJSON, swapVenueToJSON, trackTxRequestFromJSON, trackTxRequestToJSON, trackTxResponseFromJSON, trackTxResponseToJSON, transferAssetReleaseFromJSON, transferAssetReleaseToJSON, transferEventFromJSON, transferEventToJSON, transferFromJSON, transferInfoFromJSON, transferInfoToJSON, transferStatusFromJSON, transferStatusToJSON, transferToJSON, txFromJSON, txStatusRequestFromJSON, txStatusRequestToJSON, txStatusResponseFromJSON, txStatusResponseToJSON, txToJSON };
