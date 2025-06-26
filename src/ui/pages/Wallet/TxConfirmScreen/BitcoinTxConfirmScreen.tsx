import { TxType } from '@/shared/types';
import { Header } from '@/ui/components';
import { usePushBitcoinTxCallback } from '@/ui/state/transactions/hooks';
import { useLocationState } from '@/ui/utils';

import { SignPsbt } from '../../Approval/components';
import { useNavigate } from '../../MainRoute';
import { TxConfirmLocationState } from './index';

export default function BitcoinTxConfirmScreen() {
  const { rawTxInfo, lendingState } = useLocationState<TxConfirmLocationState>();
  const navigate = useNavigate();
  const pushBitcoinTx = usePushBitcoinTxCallback();
  return (
    <SignPsbt
      header={
        <Header
          title="Signature request"
          onBack={() => {
            window.history.go(-1);
          }}
          style={{
            fontWeight: 600,
            fontSize: 20
          }}
        />
      }
      params={{ data: { psbtHex: rawTxInfo.psbtHex, type: TxType.SEND_BITCOIN, rawTxInfo } }}
      handleCancel={() => {
        window.history.go(-1);
      }}
      handleConfirm={(res) => {
        pushBitcoinTx((res ?? rawTxInfo).rawtx).then(({ success, txid, error }) => {
          if (success) {
            if (lendingState) {
              return navigate('LoanAuthorizeScreen', {
                loanId: lendingState.loanId,
                borrowAmount: lendingState.borrowAmount,
                collateralAmount: lendingState.collateralAmount,
                feeRate: lendingState.feeRate,
                from: lendingState.from
              });
            }
            navigate('TxSuccessScreen', { txid });
          } else {
            navigate('TxFailScreen', { error });
          }
        });
      }}
    />
  );
}
