import {useEffect, useState} from 'react';
import services from '@/ui/services';

export default function useGetVaultBalance() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('0');

  useEffect(() => {
    getVaultBalanceData();
  }, []);

  const getVaultBalanceData = async () => {
    try {
      const result = await services.bridge.getBridgeParams();
      let vaultAddress = '',
        version = '0';
      result.params.vaults.forEach(item => {
        if (item.asset_type === 'ASSET_TYPE_BTC') {
          if (+item.version > +version) {
            version = item.version;
            vaultAddress = item.address;
          }
        }
      });
      const balance = await services.unisat.getAvailableBtcBalance({address: vaultAddress});
      console.log(`balance: `, balance);
      setData(balance);
    } catch (err) {
      console.log(`err: `, err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
  };
}
