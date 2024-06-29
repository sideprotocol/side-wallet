import { useLocation } from 'react-router-dom';

import { Button, Column, Header, Layout } from '@/ui/components';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { parseUnitAmount } from '@/ui/utils';

import { useNavigate } from '../../MainRoute';

export default function SideTxConfirmScreen() {
  const navigate = useNavigate();
  const state = useLocation();
  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const currentAccount = useCurrentAccount();

  const handleSubmit = async () => {
    try {
      const msg = {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: currentAccount.address,
          toAddress: 'tb1qt37585f44pq3xs76xv48l6ks8f7e3ju4mn456q',
          amount: [
            {
              amount: parseUnitAmount('10', 6),
              denom: 'uside'
            }
          ]
        }
      };
      const result = await signAndBroadcastTxRaw({
        messages: [msg]
      });
      navigate('TxSuccessScreen', { txid: result.transactionHash });
    } catch (err) {
      navigate('TxFailScreen', { error: err });
    }
  };

  return (
    <Layout
      style={{
        padding: '0 16px 24px'
      }}>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Confirm Transaction"
      />
      <Column
        style={{
          flex: 1,
          paddingTop: '40px'
        }}></Column>
      <Button preset="primary" text="Confirm" onClick={() => handleSubmit} />
    </Layout>
  );
}
