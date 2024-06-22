import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { shortAddress } from '@/ui/utils';

import { Icon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';
import './index.less';

const AccountSelect = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  return (
    <Row
      itemsCenter
      justifyBetween
      px="xl"
      py="md"
      bg="card"
      rounded
      onClick={(e) => {
        navigate('SwitchAccountScreen');
      }}>
      <Icon icon="user" />
      <Text text={shortAddress(currentAccount?.alianName, 8)} />
      <Icon icon="down" />
    </Row>
  );
};

export default AccountSelect;
