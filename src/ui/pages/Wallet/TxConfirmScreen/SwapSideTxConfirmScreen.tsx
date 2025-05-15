import { TxType } from '@/shared/types';
import { Header } from '@/ui/components';
import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { usePushBitcoinTxCallback } from '@/ui/state/transactions/hooks';
import { useLocationState } from '@/ui/utils';

import { SignPsbt } from '../../Approval/components';
import { useNavigate } from '../../MainRoute';
import { TxConfirmLocationState } from './index';

export default function SwapSideTxConfirmScreen() {
  const { rawTxInfo } = useLocationState<TxConfirmLocationState>();
  const navigate = useNavigate();
  const pushBitcoinTx = usePushBitcoinTxCallback();
  const { SERVICE_BASE_URL } = useEnvironment();
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
            services.btcStore.submit_btctxhash(txid, { baseURL: SERVICE_BASE_URL });

            navigate('SwapSideSuccessScreen', { txid });
          } else {
            navigate('TxFailScreen', { error });
          }
        });
      }}
    />
  );
}
