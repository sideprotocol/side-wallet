import {Fragment} from 'react';

import {SideToken} from '@/shared/types';
import {Column, Row, Text} from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
// import {useCalcPrice} from '@/ui/hooks/useCalcPrice';
import {useGetSideBalanceList} from '@/ui/hooks/useGetBalance';
// import {useGetSideTokenList} from '@/ui/hooks/useGetTokenList';
// import {formatUnitAmount, getTruncate} from '@/ui/utils';
import {useCurrentAccount} from '@/ui/state/accounts/hooks';

function TokenItem({token, balanceVisible}: { token: SideToken; balanceVisible: boolean }) {
    return (
        <Row
            classname={'bg-item-hover-v2'}
            justifyBetween
            style={{
                cursor: 'pointer',
                backgroundColor: '#1A1A1A',
                padding: '10px 16px',
                borderRadius: 10
            }}
        >
            <Row>
                <ImageIcon
                    url={token?.asset?.logo}
                    style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%'
                    }}
                />
                <Column
                    style={{
                        gap: '0px'
                    }}
                >
                    <Text classname={'symbol'} preset="regular" text={token?.asset?.symbol}></Text>
                    <Text preset="sub" text={token?.asset?.name}></Text>
                </Column>
            </Row>

            <Column
                style={{
                    gap: '0px'
                }}
            >
                {/*<Text preset="regular" text={balanceVisible ? formatUnitAmount(balanceAmount, token.exponent) : '**'}*/}
                <Text preset="regular" text={balanceVisible ? token?.formatAmount : '**'}
                      textEnd/>
                {/*<Text preset="sub" text={`${'$' + getTruncate(totalPrice)}`} textEnd />*/}
                {/*<Text preset="sub" text={`${balanceVisible ? '$' + getTruncate(totalPrice) : '**'}`} textEnd/>*/}
                <Text preset="sub" text={`${balanceVisible ? '$' + token?.totalValue : '**'}`} textEnd/>
            </Column>
        </Row>
    );
}

export default function SideTokenList({balanceVisible}) {
    // const { data: assets } = useGetSideTokenList();
    const currentAccount = useCurrentAccount();
    const {balanceList} = useGetSideBalanceList(currentAccount?.address);
    console.log(`balanceList: `, balanceList);
    return (
        <Column>
            {balanceList.map((item) => {
                return (
                    <Fragment key={item?.asset?.symbol + item?.asset?.name}>
                        <TokenItem token={item} balanceVisible={balanceVisible}/>
                    </Fragment>
                );
            })}
        </Column>
    );
}
