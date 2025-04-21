import 'swiper/css';

import { Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';

import { useNavigate } from '../MainRoute';

export default function LoansTabScreen() {
  const navigator = useNavigate();
  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" classname="fadeIn-page">
        <Column fullY>
          <Row itemsCenter my="xl" justifyCenter>
            <Image src="./images/img/lending-banner.png" height={114} width={130}></Image>
          </Row>
          <Row itemsCenter>
            <Text
              preset="bold"
              size="lg"
              style={{
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}>
              Turn Your Bitcoin
              <Image
                src="/images/icons/btc.svg"
                height={20}
                width={20}
                style={{
                  display: 'inline',
                  marginLeft: '4px',
                  marginRight: '4px'
                }}></Image>
              into Opportunity
            </Text>
          </Row>

          <Text size="sm" color="white_muted">
            Use native BTC as collateral to request a non-custodial loan
          </Text>
          <Column gap="sm">
            {['No KYC', 'No bridge/wrapped BTC', 'Liquidity-pool based', 'Secured by Discreet Log Contracts'].map(
              (item, index) => (
                <Row itemsCenter key={index}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22287_11288)">
                      <path
                        d="M4.9987 8.00016L6.9987 10.0002L10.9987 6.00016M14.6654 8.00016C14.6654 11.6821 11.6806 14.6668 7.9987 14.6668C4.3168 14.6668 1.33203 11.6821 1.33203 8.00016C1.33203 4.31826 4.3168 1.3335 7.9987 1.3335C11.6806 1.3335 14.6654 4.31826 14.6654 8.00016Z"
                        stroke="#22AB38"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_22287_11288">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <Text size="xs" color="white">
                    {item}
                  </Text>
                </Row>
              )
            )}
          </Column>

          <Row fullX mt="xl">
            <Button
              onClick={() => {
                navigator('LendingTabScreen');
              }}
              full
              disabled={true}
              preset="primary"
              // text="Start Borrowing"

              text="Coming Soon"></Button>
          </Row>
          {/* <Row itemsCenter justifyCenter fullX>
          <div
            className="text-xs text-[#6C7080] cursor-pointer  hover:text-white"
            onClick={() => {
              window.open(SIDE_HUB_URL, '_blank');
            }}>
            Open Web App
          </div>
        </Row> */}
        </Column>
      </Content>

      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
