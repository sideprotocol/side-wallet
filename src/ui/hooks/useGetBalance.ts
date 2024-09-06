import BigNumber from 'bignumber.js';
import {useEffect, useState} from 'react';

import {SIDERPC_URL_MAINNET, SIDERPC_URL_TESTNET} from '@/shared/constant';
import {NetworkType} from '@/shared/types';
import {useCurrentAccount} from '@/ui/state/accounts/hooks';
import {useNetworkType} from '@/ui/state/settings/hooks';
import {CosmWasmClient} from '@cosmjs/cosmwasm-stargate';

import {formatUnitAmount, useWallet} from '../utils';
import {useGetBitcoinTokenList, useGetSideTokenList} from './useGetTokenList';

export function useGetSideTokenBalance(base: string, flag?: boolean) {
    const [balanceAmount, setBalanceAmount] = useState('0');
    const currentAccount = useCurrentAccount();
    const networkType = useNetworkType();
    const wallet = useWallet();

    useEffect(() => {
        getBalanceAmount();
    }, [base, currentAccount.address, flag]);

    const getBalanceAmount = async () => {
        if (!base) return;
        const _balanceAmount = await wallet.getAccountSideTokenBalance(currentAccount.address, base);
        setBalanceAmount(_balanceAmount);
        const cosmwasmClient = await CosmWasmClient.connect(
            // networkType === NetworkType.MAINNET ? SIDERPC_URL_MAINNET : SIDERPC_URL_TESTNET
            networkType === NetworkType.TESTNET ? SIDERPC_URL_TESTNET : SIDERPC_URL_MAINNET
        );
        console.log('SIDERPC_URL_TESTNET: ', SIDERPC_URL_TESTNET);
        const {amount} = await cosmwasmClient.getBalance(currentAccount.address, base);
        await wallet.setAccountSideTokenBalance(currentAccount.address, base, amount);
        setBalanceAmount(amount);
    };

    return {
        balanceAmount
    };
}

export function useGetAccountBalanceByUSD() {
    const currentAccount = useCurrentAccount();
    const wallet = useWallet();
    const {data: sideTokenList} = useGetSideTokenList();
    // const { data: bitcoinTokenList } = useGetBitcoinTokenList();
    const [accountBalanceByUSD, setAccountBalanceByUSD] = useState('0');

    useEffect(() => {
        getTotalBalance();
    }, [currentAccount.address, sideTokenList]);

    const getTotalBalance = async () => {
        const accountSideTokenBalanceList = await wallet.getAccountSideTokenBalanceList(currentAccount.address);
        console.log(`accountSideTokenBalanceList: `, accountSideTokenBalanceList);
        const accountBitcoinTokenBalanceList = await wallet.getAccountBitcoinTokenBalanceList(currentAccount.address);
        console.log(`accountBitcoinTokenBalanceList: `, accountBitcoinTokenBalanceList);
        const priceMap = await wallet.getAssetPriceMap();
        let sideAccountBalanceByUSD = new BigNumber('0');
        // let bitcoinAccountBalanceByUSD = new BigNumber('0');
        for (let i = 0; i < accountSideTokenBalanceList.length; i++) {
            const curSideTokenBalance = accountSideTokenBalanceList[i];
            const curSideToken = sideTokenList.find((item) => item.base === curSideTokenBalance.base);
            if (curSideToken) {
                const formatAmount = formatUnitAmount(curSideTokenBalance.amount, curSideToken.exponent);
                const curBalanceByUSD = new BigNumber(priceMap?.[curSideToken.base] || '0').multipliedBy(formatAmount);
                sideAccountBalanceByUSD = sideAccountBalanceByUSD.plus(curBalanceByUSD);
            }
        }
        // for (let i = 0; i < accountBitcoinTokenBalanceList.length; i++) {
        //   const curBitcoinTokenBalance = accountBitcoinTokenBalanceList[i];
        //   const curBitcoinToken = bitcoinTokenList.find((item) => item.symbol === curBitcoinTokenBalance.symbol);
        //   if (curBitcoinToken) {
        //     const formatAmount = formatUnitAmount(curBitcoinTokenBalance.amount, 18);
        //     const curBalanceByUSD = new BigNumber(priceMap[curBitcoinToken.base || ''] || '0').multipliedBy(formatAmount);
        //     bitcoinAccountBalanceByUSD = bitcoinAccountBalanceByUSD.plus(curBalanceByUSD);
        //   }
        // }
        // const _accountBalanceByUSD = sideAccountBalanceByUSD.plus(bitcoinAccountBalanceByUSD).toString();
        const _accountBalanceByUSD = sideAccountBalanceByUSD.toString();
        setAccountBalanceByUSD(_accountBalanceByUSD);
    };

    return {
        accountBalanceByUSD
    };
}
