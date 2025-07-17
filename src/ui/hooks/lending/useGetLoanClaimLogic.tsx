import { useMemo } from 'react';

import { Loan } from '@/ui/services/lending/types';

import { useGetDepositInfo } from './useGetDepositInfo';
import { useGetLoanAuthorization } from './useGetLoanAuthorization';
import useGetLoanDeposits from './useGetLoanDeposits';

export function useGetLoanClaimLogic(loan?: Loan) {
  const { loanAuthorization } = useGetLoanAuthorization(loan);

  const { loanDeposits } = useGetLoanDeposits(loan);

  const { depositInfo, isSuccess: getDepositInfoSuccess } = useGetDepositInfo(loan);

  const { isRedeeming, redeemEnable, canRedeemUnitAmount, totalDepositUnitAmount, claimedUnitAmount } = useMemo(() => {
    let redeemEnable = false,
      totalDepositUnitAmount = '0',
      canRedeemUnitAmount = '0',
      claimedUnitAmount = '0',
      isRedeeming = false;

    if (
      (loan?.status === 'Requested' ||
        loan?.status === 'Cancelled' ||
        (loan?.status === 'Rejected' &&
          loanAuthorization &&
          loanAuthorization.status === 'AUTHORIZATION_STATUS_REJECTED')) &&
      depositInfo &&
      +depositInfo.realCollateralAmount > 0
    ) {
      if (loanDeposits && depositInfo) {
        const redeemingUnitAmount = loanDeposits.deposits.reduce((pre, cur) => {
          if (cur.status === 'DEPOSIT_STATUS_REDEEMING') {
            const amount = depositInfo.txDatas.find((item) => item.txid === cur.txid)?.change || 0;
            return `${+pre + +amount}`;
          }
          return pre;
        }, '0');
        if (+depositInfo.realCollateralAmount > +redeemingUnitAmount) {
          redeemEnable = true;
        }

        canRedeemUnitAmount = loanDeposits.deposits.reduce((pre, cur) => {
          if (cur.status === 'DEPOSIT_STATUS_VERIFIED') {
            const amount = depositInfo.txDatas.find((item) => item.txid === cur.txid)?.change || 0;
            return `${+pre + +amount}`;
          }
          return pre;
        }, '0');

        totalDepositUnitAmount = depositInfo.txDatas.reduce((pre, cur) => {
          if (cur.type === 'deposit') {
            const amount = depositInfo.txDatas.find((item) => item.txid === cur.txid)?.change || 0;
            return `${+pre + +amount}`;
          }
          return pre;
        }, '0');

        claimedUnitAmount = depositInfo.txDatas.reduce((pre, cur) => {
          if (cur.type === 'withdraw') {
            const amount = depositInfo.txDatas.find((item) => item.txid === cur.txid)?.change || 0;
            return `${+pre + +amount}`;
          }
          return pre;
        }, '0');
      }
    }

    if (
      loanDeposits &&
      loanDeposits.deposits.length &&
      loanDeposits.deposits.some((deposit) => deposit.status == 'DEPOSIT_STATUS_REDEEMING')
    ) {
      isRedeeming = true;
    }

    return {
      isRedeeming,
      redeemEnable,
      canRedeemUnitAmount,
      totalDepositUnitAmount,
      claimedUnitAmount
    };
  }, [loanAuthorization, loanDeposits, loan?.status, depositInfo]);

  return {
    redeemEnable,
    canRedeemUnitAmount,
    totalDepositUnitAmount,
    claimedUnitAmount,
    isRedeeming,
    depositInfo,
    getDepositInfoSuccess
  };
}
