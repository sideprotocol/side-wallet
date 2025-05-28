import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import ToastView from '@/ui/components/ToastView';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { Coin } from '@cosmjs/amino';
import { fromHex } from '@cosmjs/encoding';
import { Box } from '@mui/material';

import services from '../services';
import { LiquidationEvent } from '../services/lending/types';
import { GetTxByHashResponse } from '../services/tx/types';
import { useCurrentAccount } from '../state/accounts/hooks';
import { useEnvironment } from '../state/environment/hooks';
import { useUpdateUiTxCreateScreen } from '../state/ui/hooks';
import { toXOnly } from '../wallet-sdk/utils';

export default function useCreateLoan() {
  const { sideChain, SERVICE_BASE_URL } = useEnvironment();

  const [loading, setLoading] = useState(false);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const [visible, setVisible] = useState(false);

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const setUiState = useUpdateUiTxCreateScreen();

  const createLoan = async ({
    borrowAmount,
    maturityTime,
    poolId,
    btcUnitAmount,
    liquidationEvent
  }: {
    borrowAmount: Coin;
    maturityTime: string;
    poolId: string;
    btcUnitAmount: string;
    liquidationEvent: LiquidationEvent;
  }) => {
    try {
      if (!currentAccount.address) return;
      setLoading(true);

      const activeAgencies = await services.lending.getDlcDcms({ status: 0 }, { baseURL: sideChain.restUrl });

      const dcm = activeAgencies?.dcms?.[0];

      const msg = sideLendingMessageComposer.withTypeUrl.apply({
        dcmId: BigInt(dcm.id),
        borrowAmount,
        borrower: currentAccount.address,
        borrowerPubkey: toXOnly(Buffer.from(fromHex(currentAccount.pubkey))).toString('hex'),
        maturity: BigInt(maturityTime),
        poolId: poolId,
        referrer: ''
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
        const loanId = hashResponse.tx_response.events
          .find((event) => event.type === 'apply')!
          .attributes.find((item) => item.key === 'vault')!.value;

        services.lending.saveLoanExpectedCollateralAmount(
          {
            vaultAddress: loanId,
            expectedCollateralAmount: +btcUnitAmount
          },
          { baseURL: SERVICE_BASE_URL }
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

        navigate('LoanDepositScreen', {
          borrowAmount: borrowAmount.amount,
          collateralAmount: btcUnitAmount,
          liquidationEvent,
          loanId
        });
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
