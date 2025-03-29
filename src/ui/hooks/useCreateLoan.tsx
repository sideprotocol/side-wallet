import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import { CHAINS_ENUM, sideChain } from '@/shared/constant';
import ToastView from '@/ui/components/ToastView';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { Coin } from '@cosmjs/amino';
import { Box } from '@mui/material';

import services from '../services';
import { GetTxByHashResponse } from '../services/tx/types';
import { useCurrentAccount } from '../state/accounts/hooks';
import { toXOnly } from '../wallet-sdk/utils';

export default function useCreateLoan() {
  const [loading, setLoading] = useState(false);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const [visible, setVisible] = useState(false);

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const createLoan = async ({
    borrowAmount,
    maturityTime,
    poolId,
    btcUnitAmount
  }: {
    borrowAmount: Coin;
    maturityTime: string;
    poolId: string;
    btcUnitAmount: string;
  }) => {
    try {
      if (!currentAccount.address) return;
      setLoading(true);

      const activeAgencies = await services.lending.getDlcDcms({ status: 3 }, { baseURL: sideChain.restUrl });

      const dcm = activeAgencies?.dcms?.[0];

      const borrowerPubkey = Buffer.from(currentAccount.pubkey).toString('hex');
      const pbk = toXOnly(Buffer.from(borrowerPubkey, 'hex')).toString('hex');

      const { address } = await services.lending.getCollateralAddress(
        {
          borrower_pubkey: pbk,
          dcm_pubkey: dcm.pubkey,
          maturity_time: maturityTime
        },
        { baseURL: sideChain.restUrl }
      );

      // 缓存 hashLoanSecret btcAmount

      const msg = sideLendingMessageComposer.withTypeUrl.apply({
        dcmId: BigInt(dcm.id),
        borrowAmount,
        borrower: currentAccount.address,
        borrowerPubkey: toXOnly(Buffer.from(currentAccount.pubkey)).toString('hex'),
        maturityTime: BigInt(maturityTime),
        poolId: poolId
      });
      const result = await signAndBroadcastTxRaw({
        messages: [msg],
        memo: ''
      });

      let hashResponse: GetTxByHashResponse | null = null;
      while (!hashResponse) {
        try {
          hashResponse = await services.tx.getTxByHash(result.tx_response.txhash, {
            baseURL: sideChain.restUrl
          });
        } catch (err) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      if (hashResponse.tx_response.code === 0) {
        services.lending.saveLoanExpectedCollateralAmount(
          {
            vaultAddress: address,
            expectedCollateralAmount: +btcUnitAmount
          },
          { baseURL: sideChain.restUrl }
        );

        toast.custom((t) => (
          <ToastView
            toaster={t}
            type="success"
            txHashUrl={`${sideChain.explorerUrl}/tx/${hashResponse.tx_response.txhash}`}>
            <Box
              sx={{
                mb: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
              Loan Created
            </Box>
          </ToastView>
        ));

        navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE });
      } else {
        toast.custom((t) => (
          <ToastView toaster={t} type="fail">
            <Box
              sx={{
                mb: '6px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
              {hashResponse.tx_response.raw_log}
            </Box>
          </ToastView>
        ));
      }
    } catch (err) {
      const error = err as Error;

      toast.custom((t) => (
        <ToastView toaster={t} type="fail">
          <Box
            sx={{
              mb: '6px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
            {error.message}
          </Box>
        </ToastView>
      ));
    } finally {
      setLoading(false);
    }
  };

  return {
    createLoan,
    loading,
    visible,
    setVisible
  };
}
