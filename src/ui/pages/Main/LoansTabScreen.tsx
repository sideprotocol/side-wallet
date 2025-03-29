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
      <Content gap="lg">
        <Row itemsCenter mt="md" justifyCenter>
          <Image src="./images/img/lending-banner.png" height={114} width={130}></Image>
        </Row>
        <Column gap="zero">
          <Text
            preset="bold"
            size="xxl"
            style={{
              fontWeight: 700
            }}>
            Borrowing against native
          </Text>

          <Row itemsCenter>
            <Text
              preset="bold"
              size="xxl"
              style={{
                fontWeight: 700
              }}>
              Bitcoin
            </Text>

            <Image src="/images/icons/btc.svg" height={25} width={25}></Image>
          </Row>
        </Column>

        <Text size="sm" color="white_muted">
          Use native BTC as collateral and borrow USDC from a liquidity pool
        </Text>
        <Column gap="sm">
          <Row itemsCenter>
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
            <Text size="md" color="white">
              No KYC
            </Text>
          </Row>

          <Row itemsCenter>
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
            <Text size="md" color="white">
              No bridge/wrapped BTC
            </Text>
          </Row>

          <Row itemsCenter>
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
            <Text size="md" color="white">
              No counterparty risk
            </Text>
          </Row>
        </Column>

        <Row full mt="smm">
          <Button
            onClick={() => {
              navigator('LendingTabScreen');
            }}
            full
            preset="primary"
            text="Start Borrowing"></Button>
        </Row>
        <Row itemsCenter justifyCenter full>
          <Text size="md" color="blue_dark">
            Learn More
          </Text>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
