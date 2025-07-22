import { useState } from 'react';
import toast from 'react-hot-toast';

import { sideLendingMessageComposer } from '@/codegen/src';
import { NetworkType } from '@/shared/types';
import ToastView from '@/ui/components/ToastView';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { GetTxByHashResponse } from '@/ui/services/tx/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { toXOnly } from '@/ui/wallet-sdk/utils';
import { Coin } from '@cosmjs/amino';
import { fromHex } from '@cosmjs/encoding';
import { Box } from '@mui/material';

export function useCreateLoan() {
  const { sideChain, SERVICE_BASE_URL } = useEnvironment();
  const networkType = useNetworkType();

  const [loading, setLoading] = useState(false);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const [visible, setVisible] = useState(false);

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const referralCode = networkType === NetworkType.TESTNET ? 'SIDE1234' : '';

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

      const activeAgencies = await services.lending.getDlcDcms({ status: 0 }, { baseURL: sideChain.restUrl });

      const dcm = activeAgencies?.dcms?.[0];

      const msg = sideLendingMessageComposer.withTypeUrl.apply({
        dcmId: BigInt(dcm.id),
        borrowAmount,
        borrower: currentAccount.address,
        borrowerPubkey: toXOnly(Buffer.from(fromHex(currentAccount.pubkey))).toString('hex'),
        maturity: BigInt(maturityTime),
        poolId: poolId,
        referralCode,
        borrowerAuthPubkey: toXOnly(Buffer.from(fromHex(currentAccount.pubkey))).toString('hex')
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
          loanId,
          from: 'createLoan'
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
    setVisible,
    referralCode
  };
}
