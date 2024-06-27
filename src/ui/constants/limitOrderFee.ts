export const LIMIT_ORDER_FEE_PRO = {};

export const LIMIT_ORDER_FEE_TEST = {};

export const LIMIT_ORDER_FEE_DEV = {
  fee_denom: "uside",
  fee_collector: "SIGNER_KEY_ACC_ADDRESS",
  warp_account_code_id: "ACCOUNT_CONTRACT_ID",
  account_tracker_code_id: "ACCOUNT_TRACKER_ID",
  minimum_reward: "750000",
  cancellation_fee_rate: "5",
  resolver_address: "RESOLVER_ADDRESS",
  creation_fee_min: "375000",
  creation_fee_max: "750000",
  burn_fee_min: "187500",
  maintenance_fee_min: "187500",
  maintenance_fee_max: "750000",
  duration_days_min: "7",
  duration_days_max: "90",
  duration_days_limit: "180",
  queue_size_left: "5000",
  queue_size_right: "50000",
  burn_fee_rate: "25",
};
