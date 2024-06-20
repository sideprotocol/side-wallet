import { useEffect } from 'react';

import { Button, ButtonGroup, Column, Grid, Image, Input, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Icon } from '@/ui/components/Icon';
import { copyToClipboard, useWallet } from '@/ui/utils';

import { ContextData, TabType, UpdateContextDataParams, WORDS_12_ITEM, WORDS_24_ITEM } from './type';

export default function Step1_Create({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const wallet = useWallet();
  const tools = useTools();

  const init = async () => {
    const _mnemonics = (await wallet.getPreMnemonics()) || (await wallet.generatePreMnemonic());
    updateContextData({
      mnemonics: _mnemonics,
      step1Completed: true
    });
  };

  useEffect(() => {
    init();
  }, []);

  function copy(str: string) {
    copyToClipboard(str).then(() => {
      tools.toastSuccess('Copied');
    });
  }

  const btnClick = () => {
    updateContextData({
      tabType: TabType.STEP2
    });
  };

  const words = contextData.mnemonics.split(' ');
  const wordsItems = [WORDS_12_ITEM, WORDS_24_ITEM];
  return (
    <>
      <Column
        style={{
          flex: 1,
          overflow: 'hidden'
        }}>
        <Column
          style={{
            flex: 1,
            overflow: 'auto'
          }}>
          <Column
            style={{
              marginTop: '16px',
              border: '1px solid #404045',
              boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
              backgroundColor: '#222222',
              borderRadius: '14px',
              padding: '16px'
            }}>
            {wordsItems.length > 1 ? (
              <ButtonGroup
                rowProps={{
                  justifyCenter: true
                }}
                list={wordsItems.map((item) => ({
                  key: item.key,
                  label: item.label
                }))}
                onChange={(value) => {
                  // const wordsType = value as WordsType;
                  // updateContextData({ wordsType });
                  // setKeys(new Array(wordsItems[wordsType].count).fill(''));
                }}
                value={contextData.wordsType}
              />
            ) : null}
            <Row
              justifyCenter
              onClick={(e) => {
                copy(contextData.mnemonics);
              }}
              style={{
                marginTop: '10px'
              }}>
              <Icon icon="copy" color="textDim" size={14} />
              <Text text="Copy to clipboard" color="textDim" />
            </Row>

            <Row justifyCenter style={{ marginTop: '16px' }}>
              <Grid columns={2}>
                {words.map((v, index) => {
                  return (
                    <Row
                      key={index}
                      style={{
                        gap: '8px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid #FFFFFF33',
                        backgroundColor: '#121212'
                      }}>
                      <Text
                        text={`${index + 1}. `}
                        style={{ width: 25, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                        textEnd
                        color="textDim"
                      />
                      <Input
                        containerStyle={{
                          minHeight: '30px',
                          padding: '0 10px',
                          flex: 1,
                          border: 'none',
                          backgroundColor: 'transparent'
                        }}
                        style={{ width: '100%', color: '#fff' }}
                        value={v}
                        disabled
                        placeholder=""
                      />
                    </Row>
                  );
                })}
              </Grid>
            </Row>
          </Column>

          <Column
            style={{
              marginTop: '24px',
              backgroundColor: 'rgb(240 182 34 / 10%)',
              borderRadius: '14px',
              padding: '10px',
              gap: '4px'
            }}>
            <Row
              style={{
                alignItems: 'center'
              }}>
              <Image src="/images/icons/alert-triangle.svg" size={24} />
              <Text
                text="Keep It Private:"
                style={{
                  color: '#F0B622',
                  lineHeight: '20px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              />
            </Row>
            <Text
              text="Never share your recovery phrase with anyone. This phrase grants access to your wallet"
              style={{
                color: '#fff',
                lineHeight: '18px',
                fontSize: '12px',
                fontWeight: 400
              }}
            />
          </Column>

          <Column
            style={{
              marginTop: '10px',
              backgroundColor: 'rgb(240 182 34 / 10%)',
              borderRadius: '14px',
              padding: '10px',
              gap: '4px'
            }}>
            <Row
              style={{
                alignItems: 'center'
              }}>
              <Image src="/images/icons/alert-triangle.svg" size={24} />
              <Text
                text="No Recovery Options:"
                style={{
                  color: '#F0B622',
                  lineHeight: '20px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              />
            </Row>
            <Text
              text="If you lose your recovery phrase, you will not be able to recover your wallet."
              style={{
                color: '#fff',
                lineHeight: '18px',
                fontSize: '12px',
                fontWeight: 400
              }}
            />
          </Column>

          <Column
            style={{
              marginTop: '10px',
              backgroundColor: 'rgb(240 182 34 / 10%)',
              borderRadius: '14px',
              padding: '10px',
              gap: '4px'
            }}>
            <Row
              style={{
                alignItems: 'center'
              }}>
              <Image src="/images/icons/alert-triangle.svg" size={24} />
              <Text
                text="Store Securely:"
                style={{
                  color: '#F0B622',
                  lineHeight: '20px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              />
            </Row>
            <Text
              text="Write down your recovery phrase and store it in a safe place."
              style={{
                color: '#fff',
                lineHeight: '18px',
                fontSize: '12px',
                fontWeight: 400
              }}
            />
          </Column>
        </Column>
        <Button text="Next" preset="primary" onClick={btnClick} />
      </Column>
    </>
  );
}
