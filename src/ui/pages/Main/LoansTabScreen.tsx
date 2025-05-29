import { useEffect, useState } from 'react';
import 'swiper/css';

import { NetworkType } from '@/shared/types';
import { Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useWallet } from '@/ui/utils';
import { Checkbox, Stack, Typography } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function LoansTabScreen() {
  const navigator = useNavigate();
  const networkType = useNetworkType();
  const wallet = useWallet();
  const [showLoanNotice, setShowLoanNotice] = useState(true);

  useEffect(() => {
    wallet.getShowLoanNotice().then((show) => {
      setShowLoanNotice(show);
    });
  }, [wallet]);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" classname="fadeIn-page">
        <Column fullY>
          <Row mt="lg">
            <Image src="./images/img/loan-banner.png" size="100%" />
          </Row>
          <Typography
            sx={{
              fontSize: '26px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              mt: '12px',
              color: colors.white
            }}
            className="animate__animated animate__fadeInUp animate__faster">
            Get a loan with your
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap="4px"
            sx={{
              mt: '4px',
              mb: '12px'
            }}
            className="animate__animated animate__fadeInUp animate__faster">
            <Text
              preset="bold"
              style={{
                fontSize: '26px',
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}>
              native Bitcoin
            </Text>
            <Image
              src="/images/icons/btc.svg"
              height={24}
              width={24}
              style={{
                display: 'inline'
              }}
            />
          </Stack>
          <Column gap="sm">
            {[
              'Non-custodial. No rehypothecation',
              'No wrapping. No bridging',
              'Secure and trust-minimized',
              'Powered by Side Lending'
            ].map((item, index) => (
              <Stack
                direction="row"
                alignItems="center"
                gap="4px"
                key={index}
                className={'animate__animated animate__fadeInUp animate__faster animate__delay-1s'}>
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
              </Stack>
            ))}
          </Column>
          <Stack
            direction="row"
            justifyContent="center"
            className="animate__animated animate__fadeInUp animate__faster animate__delay-1s"
            sx={{
              mt: '20px'
            }}>
            {networkType === NetworkType.MAINNET ? (
              <Button full preset="primary" text="COMING SOON"></Button>
            ) : (
              <Button
                onClick={() => {
                  navigator('LendingTabScreen');
                }}
                full
                preset="primary"
                text="Borrow Now"></Button>
            )}
          </Stack>
          {networkType === NetworkType.TESTNET && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="animate__animated animate__fadeInUp animate__faster animate__delay-1s">
              <Checkbox
                checked={!showLoanNotice}
                onChange={(e) => {
                  setShowLoanNotice(!e.target.checked);
                  wallet.setShowLoanNotice(!e.target.checked);
                }}
                size="small"
                sx={{
                  color: colors.white,
                  padding: '0px',
                  '&.Mui-checked': {
                    color: colors.main
                  }
                }}
              />
              <Typography
                sx={{
                  color: colors.white,
                  fontSize: '12px'
                }}>
                Don't show this again
              </Typography>
            </Stack>
          )}
        </Column>
      </Content>

      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
