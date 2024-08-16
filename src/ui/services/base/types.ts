export interface GetBlocksLatestResponse {
  block_id: {
    hash: string;
    part_set_header: {
      total: number;
      hash: string;
    };
  };
  block: {
    header: {
      version: {
        block: string;
        app: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
        part_set_header: {
          total: number;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    };
    data: {
      txs: [];
    };
    evidence: {
      evidence: [];
    };
    last_commit: {
      height: string;
      round: 0;
      block_id: {
        hash: '6+rKjdxJWRwrObS5YykuDtE7112k+eRcCKRtD7vOVUQ=';
        part_set_header: {
          total: 1;
          hash: 'cc/crsPKFVNjgHlqSYGJwZw6bE0l/ScP7povHcmHPko=';
        };
      };
      signatures: [
        {
          block_id_flag: 'BLOCK_ID_FLAG_COMMIT';
          validator_address: 'bU2VCwHVj0oNo/BFGDfTFUKOPsE=';
          timestamp: '2024-02-20T03:21:30.728565061Z';
          signature: 'WNHdb9ahAdqj8yN7vJXtXNmDQ3q3YBUcDDqa0CkJlOymDF63q61hPr6pLo7hscH7YthzDwbdZuwFQ7PTrZJsCw==';
        }
      ];
    };
  };
  sdk_block: {
    header: {
      version: {
        block: string;
        app: string;
      };
      chain_id: string;
      height: string;
      time: string;
      last_block_id: {
        hash: string;
        part_set_header: {
          total: 1;
          hash: string;
        };
      };
      last_commit_hash: string;
      data_hash: string;
      validators_hash: 'lHQbtL0tzCODjZjXaGC33aurFvaZo3SozIgeOENVtos=';
      next_validators_hash: 'lHQbtL0tzCODjZjXaGC33aurFvaZo3SozIgeOENVtos=';
      consensus_hash: 'G/JVbKXV1+/7VA80yw/8d6MgLjInVVevvSGYgqnkKs8=';
      app_hash: 'jomoYCwoQut7tUPzSN/RXTu85MCeINeSnSxCf49RcoA=';
      last_results_hash: '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=';
      evidence_hash: '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=';
      proposer_address: 'sidevalcons1d4xe2zcp6k855rdr7pz3sd7nz4pgu0kp3f6kge';
    };
    data: {
      txs: [];
    };
    evidence: {
      evidence: [];
    };
    last_commit: {
      height: string;
      round: 0;
      block_id: {
        hash: '6+rKjdxJWRwrObS5YykuDtE7112k+eRcCKRtD7vOVUQ=';
        part_set_header: {
          total: 1;
          hash: 'cc/crsPKFVNjgHlqSYGJwZw6bE0l/ScP7povHcmHPko=';
        };
      };
      signatures: [
        {
          block_id_flag: 'BLOCK_ID_FLAG_COMMIT';
          validator_address: 'bU2VCwHVj0oNo/BFGDfTFUKOPsE=';
          timestamp: '2024-02-20T03:21:30.728565061Z';
          signature: 'WNHdb9ahAdqj8yN7vJXtXNmDQ3q3YBUcDDqa0CkJlOymDF63q61hPr6pLo7hscH7YthzDwbdZuwFQ7PTrZJsCw==';
        }
      ];
    };
  };
}

export interface GetValidatorsetsResponse {
  block_height: string;
  validators: {
    address: string;
    pub_key: {
      '@type': string;
      key: string;
    };
    voting_power: string;
    proposer_priority: string;
  }[];
  pagination: {
    next_key: string;
    total: string;
  };
}
