import { Dispatch, SetStateAction } from 'react';

import { Button, Column, Icon, Input, Row, Text } from '@/ui/components';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSkipGoState } from '@/ui/state/skipGo/hook';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount } from '@/ui/utils';

import PowerBy from '../../PowerBy';
import useGetSkipRoute from '../../hooks/useGetSkipRoute';

export default function Index({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) {
  const currentAccount = useCurrentAccount();
  const { sourceAsset, sourceAssetChain, destAsset, destAssetChain } = useSkipGoState();
  const { skipRoute } = useGetSkipRoute();
  return (
    <Row full relative rounded={true}>
      <Column full relative gap="lg">
        <Row justifyBetween itemsCenter>
          <Row
            itemsCenter
            style={{
              gap: '5px',
              cursor: 'pointer'
            }}
            onClick={() => setStep(1)}>
            <Icon
              icon="left"
              style={{
                width: '10px',
                height: '10px',
                color: colors.grey12
              }}
            />
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Back
            </Text>
          </Row>
          <Row
            itemsCenter
            style={{
              gap: '5px',
              cursor: 'pointer'
            }}>
            <Text
              style={{
                fontSize: '12px',
                color: colors.grey12
              }}>
              Details
            </Text>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 10" fill="none">
              <line x1="10" y1="1.25903" x2="-4.37114e-08" y2="1.25903" stroke="currentColor"></line>
              <line x1="10" y1="5.09158" x2="-3.30781e-08" y2="5.09158" stroke="currentColor"></line>
              <line x1="10" y1="8.92412" x2="-3.30781e-08" y2="8.92412" stroke="currentColor"></line>
            </svg>
          </Row>
        </Row>
        <Column px={'lg'} py={'medium'} rounded={true} bg={'card_bgColor'}>
          <Row itemsCenter gap="smm">
            <img className={'w-[40px] h-[40px]'} src={sourceAsset?.logoURI} alt="" />
            <Column gap="sm">
              <Text size="xs">
                {formatUnitAmount(skipRoute?.amountOut || '0', sourceAsset?.decimals || 6)} {sourceAsset?.symbol}
              </Text>
              <Text size="xs">on {sourceAssetChain?.chainName}</Text>
              <Text
                size="xxs"
                style={{
                  color: colors.grey12
                }}>
                {currentAccount.address}
              </Text>
            </Column>
          </Row>
        </Column>
        <Row justifyCenter>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.48395 6.5705L7.48395 0.568512H5.46938L5.46938 6.5705C5.46938 7.30917 4.57625 7.67985 4.05381 7.15741L1.76526 4.86889L0.34029 6.29384L6.478 12.4315L12.613 6.29653L11.1881 4.87157L8.9022 7.15875C8.37976 7.68119 7.48528 7.31186 7.48528 6.57185"
              fill="#ffffff"></path>
          </svg>
        </Row>
        <Column px={'lg'} py={'medium'} rounded={true} bg={'card_bgColor'}>
          <Row itemsCenter gap="smm">
            <img className={'w-[40px] h-[40px]'} src={destAsset?.logoURI} alt="" />
            <Column gap="sm">
              <Text size="xs">
                {formatUnitAmount(skipRoute?.amountIn || '0', destAsset?.decimals || 6)} {destAsset?.symbol}
              </Text>
              <Text size="xs">on {destAssetChain?.chainName}</Text>
              <Input
                value={''}
                onChange={(event) => {
                  // setValue(event.target.value.trim());
                }}
                containerStyle={{
                  width: '100%',
                  padding: '0 10px',
                  minHeight: '32px'
                }}
                placeholder={'receipt address'}
              />
            </Column>
          </Row>
        </Column>

        <Row>
          <Button full text="Confirm" preset="primary" />
        </Row>
        <PowerBy />
      </Column>
    </Row>
  );
}
