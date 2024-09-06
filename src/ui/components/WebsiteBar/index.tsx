import { Card } from '../Card';
import { Row } from '../Row';
import { Text } from '../Text';

const WebsiteBar = ({ session }: { session: { origin: string; icon?: string; name?: string } }) => {
  return (
    <Card bg="transparent" px="zero" preset="style2" selfItemsCenter>
      <Row
        itemsCenter
        px="zero"
        style={{
          maxWidth: 'max-content'
        }}
      >
        {/* <Image src={session.icon} size={fontSizes.logo} /> */}
        <Text
          size="xl"
          style={{
            fontWeight: '500',
            color: '#828282'
          }}
          bg="transparent"
          text={session.origin}
        />
      </Row>
    </Card>
  );
};

export default WebsiteBar;
