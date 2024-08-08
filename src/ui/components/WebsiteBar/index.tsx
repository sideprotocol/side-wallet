import { Card } from '../Card';
import { Row } from '../Row';
import { Text } from '../Text';

const WebsiteBar = ({ session }: { session: { origin: string; icon: string; name: string } }) => {
  return (
    <Card bg="transparent" preset="style2" selfItemsCenter>
      <Row itemsCenter>
        {/* <Image src={session.icon} size={fontSizes.logo} /> */}
        <Text
          size="xl"
          style={{
            fontWeight: '500'
          }}
          bg="transparent"
          text={session.origin}
        />
      </Row>
    </Card>
  );
};

export default WebsiteBar;
