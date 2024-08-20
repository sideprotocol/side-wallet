import { CHAINS_ENUM } from '@/shared/constant';
import { TxType } from '@/shared/types';
import { Header } from '@/ui/components';
import { postRuneTest } from '@/ui/state/send/hook';
import { usePushBitcoinTxCallback } from '@/ui/state/transactions/hooks';
import { useLocationState } from '@/ui/utils';

import { SignPsbt } from '../../Approval/components';
import { useNavigate } from '../../MainRoute';
import { TxConfirmLocationState } from './index';

export default function BitcoinTxConfirmScreen() {
  const { rawTxInfo, type } = useLocationState<TxConfirmLocationState>();
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
        if (type === TxType.SEND_RUNE_TEST || type === TxType.SEND_BTC_TEST) {
          // console.log(`here11: `, type);
          postRuneTest({
            rawTransaction: rawTxInfo.rawtx
          })
            .then((txid) => {
              navigate('TxSuccessScreen', { txid, chain: CHAINS_ENUM.SIDE_SIGNET });
            })
            .catch((error) => {
              console.log('error: ', error);
              navigate('TxFailScreen', { error });
            });
          return;
        }
        // console.log(`here22: `, type);
        pushBitcoinTx((res ?? rawTxInfo).rawtx).then(({ success, txid, error }) => {
          if (success) {
            navigate('TxSuccessScreen', { txid });
          } else {
            navigate('TxFailScreen', { error });
          }
        });
      }}
    />
  );
}
