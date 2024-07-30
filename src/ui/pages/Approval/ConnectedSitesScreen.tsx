import { useEffect, useState } from 'react';

import { ConnectedSite } from '@/background/service/permission';
import { Card, Column, Content, Header, Image, Layout, Row, Text } from '@/ui/components';
import { Empty } from '@/ui/components/Empty';
import { fontSizes } from '@/ui/theme/font';
import { useWallet } from '@/ui/utils';

export default function ConnectedSitesScreen() {
  const wallet = useWallet();

  const [sites, setSites] = useState<ConnectedSite[]>([]);

  const getSites = async () => {
    const sites = await wallet.getConnectedSites();
    setSites(sites);
  };

  useEffect(() => {
    getSites();
  }, []);

  const handleRemove = async (origin: string) => {
    await wallet.removeConnectedSite(origin);
    getSites();
  };
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Connected Sites"
      />
      <Content style={{
        marginTop: 16
      }}>
        {sites.length > 0 && (
          <Text
            preset="sub"
            text={'[Account Name] is connected to these sites. They can view your account address.'}></Text>
        )}

        <Column >
          {sites.length > 0 ? (
            sites.map((item, _) => {
              return (
                <Card key={item.origin}>
                  <Row full justifyBetween itemsCenter>
                    <Row itemsCenter>
                      <Image
                        src={item.icon}
                        style={{
                          borderRadius: '100%'
                        }}
                        size={fontSizes.logo}
                      />
                      <Text
                        color={'white'}
                        style={{
                          fontSize: '14px'
                        }}
                        text={item.origin}
                      />
                    </Row>
                    <Column justifyCenter>
                      <Text
                        preset="disconnect"
                        onClick={() => {
                          handleRemove(item.origin);
                        }}
                        text={'Disconnect'}></Text>
                    </Column>
                  </Row>
                </Card>
              );
            })
          ) : (
            <Empty />
          )}
        </Column>
      </Content>
    </Layout>
  );
}
