import { useEffect, useState } from 'react';

import { Button, ButtonGroup, Column, CopyIcon, Grid, Image, Input, Mask, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useWallet } from '@/ui/utils';

import { ContextData, TabType, UpdateContextDataParams, WORDS_12_ITEM, WORDS_24_ITEM, WordsType } from './type';

export default function Step1_Create({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const wallet = useWallet();
  const tools = useTools();
  const [type, setType] = useState<WordsType>(WordsType.WORDS_12);
  const [isClickMask, setIsClickMask] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const init = async () => {
    const preMnemonics = await wallet.getPreMnemonics();
    if (!preMnemonics.mnemonics12 || !preMnemonics.mnemonics24) {
      const generatePreMnemonics = await wallet.generatePreMnemonic();
      updateContextData({
        mnemonicsObj: {
          mnemonics12: generatePreMnemonics.mnemonics12,
          mnemonics24: generatePreMnemonics.mnemonics24
        },
        mnemonics: generatePreMnemonics.mnemonics12,
        step1Completed: true
      });
    } else {
      updateContextData({
        mnemonicsObj: {
          mnemonics12: preMnemonics.mnemonics12,
          mnemonics24: preMnemonics.mnemonics24
        },
        mnemonics: preMnemonics.mnemonics12,
        step1Completed: true
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const btnClick = () => {
    updateContextData({
      mnemonics: curMenemonics,
      tabType: TabType.STEP2
    });
  };

  const curMenemonics =
    type === WordsType.WORDS_12 ? contextData.mnemonicsObj.mnemonics12 : contextData.mnemonicsObj.mnemonics24;

  const words = curMenemonics.split(' ');
  const wordsItems = [WORDS_12_ITEM, WORDS_24_ITEM];
  return (
    <>
      <Column
        style={{
          flex: 1,
          overflow: 'hidden',
          padding: '0 16px 32px'
        }}>
        <Column
          classname={'hide-scrollbar'}
          style={{
            flex: 1,
            overflow: 'auto'
          }}>
          <Mask
            onClick={() => {
              // alert('Mask');
              setIsClickMask(true);
              setDisabled(false);
            }}>
            <Column
              style={{
                marginTop: '16px',
                backgroundColor: '#222222',
                borderRadius: '14px',
                padding: '16px',
                // height: isClickMask ? 'auto' : '165px',
                overflow: 'hidden'
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
                    const wordsType = value as WordsType;
                    setType(wordsType);
                  }}
                  value={type}
                />
              ) : null}

              <Row justifyCenter style={{ marginTop: '16px' }}>
                <Grid columns={3}>
                  {words.map((v, index) => {
                    return (
                      <Row
                        key={index}
                        style={{
                          gap: '4px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1px solid #FFFFFF33',
                          backgroundColor: '#121212'
                        }}>
                        <Text
                          text={`${index + 1}. `}
                          style={{ width: 25, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                          textEnd
                          color="white_muted"
                        />
                        <Input
                          containerStyle={{
                            minHeight: '34px',
                            padding: '0',
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
              <CopyIcon text={curMenemonics} style={{ marginTop: '8px' }} />
            </Column>
          </Mask>

          <Column
            style={{
              marginTop: '10px',
              backgroundColor: 'rgb(240 182 34 / 10%)',
              borderRadius: '8px',
              padding: '10px',
              gap: '4px'
            }}>
            <Row
              style={{
                alignItems: 'center',
                gap: '8px'
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
              borderRadius: '10px',
              padding: '10px',
              gap: '4px'
            }}>
            <Row
              style={{
                alignItems: 'center',
                gap: '8px'
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
              marginBottom: '32px',
              backgroundColor: 'rgb(240 182 34 / 10%)',
              borderRadius: '10px',
              padding: '10px',
              gap: '4px'
            }}>
            <Row
              style={{
                alignItems: 'center',
                gap: '8px'
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
        <Button
          style={{
            minHeight: '48px'
          }}
          disabled={disabled}
          text="Next"
          preset="primary"
          onClick={btnClick}
        />
      </Column>
    </>
  );
}
