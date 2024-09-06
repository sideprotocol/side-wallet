import * as bip39 from 'bip39';
import { useEffect, useState } from 'react';

import { Button, ButtonGroup, Column, Grid, Image, Input, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { colors } from '@/ui/theme/colors';

import { ContextData, TabType, UpdateContextDataParams, WORDS_12_ITEM, WORDS_24_ITEM, WordsType } from './type';

export default function Step1_Import({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  const [curInputIndex, setCurInputIndex] = useState(0);
  const [hover, setHover] = useState(999);
  const [disabled, setDisabled] = useState(true);

  const wordsItems = [WORDS_12_ITEM, WORDS_24_ITEM];

  const [keys, setKeys] = useState<Array<string>>(new Array(wordsItems[contextData.wordsType].count).fill(''));

  const handleEventPaste = (event, index: number) => {
    const copyText = event.clipboardData?.getData('text/plain');
    const textArr = copyText.trim().split(' ');
    const newKeys = [...keys];
    if (textArr) {
      for (let i = 0; i < keys.length - index; i++) {
        if (textArr.length == i) {
          break;
        }
        newKeys[index + i] = textArr[i];
      }
      setKeys(newKeys);
    }

    event.preventDefault();
  };

  const onChange = (e: any, index: any) => {
    const newKeys = [...keys];
    newKeys.splice(index, 1, e.target.value);
    setKeys(newKeys);
  };

  useEffect(() => {
    setDisabled(true);

    const hasEmpty =
      keys.filter((key) => {
        return key == '';
      }).length > 0;
    if (hasEmpty) {
      return;
    }

    const mnemonic = keys.join(' ');
    if (!bip39.validateMnemonic(mnemonic)) {
      return;
    }

    setDisabled(false);
  }, [keys]);

  useEffect(() => {
    //todo
  }, [hover]);

  const tools = useTools();
  const onNext = async () => {
    try {
      const mnemonics = keys.join(' ');
      updateContextData({ mnemonics, tabType: TabType.STEP2 });
    } catch (e) {
      tools.toastError((e as any).message);
    }
  };
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      onNext();
    }
  };

  return (
    <Column
      style={{
        flex: 1,
        overflow: 'hidden',
        padding: '0 16px 24px'
      }}
    >
      <Column
        classname="hide-scrollbar"
        style={{
          flex: 1,
          overflow: 'auto'
        }}
      >
        <Column
          style={{
            marginTop: '16px',
            // boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
            backgroundColor: '#222222',
            borderRadius: '14px',
            padding: '16px'
          }}
        >
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
                updateContextData({ wordsType });
                setKeys(new Array(wordsItems[wordsType].count).fill(''));
              }}
              value={contextData.wordsType}
            />
          ) : null}

          <Row justifyCenter style={{ marginTop: '16px' }}>
            <Grid columns={3}>
              {keys.map((_, index) => {
                return (
                  <Row
                    key={index}
                    style={{
                      gap: '4px',
                      height: '36px',
                      borderRadius: '8px',
                      border: '1px solid #FFFFFF33',
                      backgroundColor: '#121212'
                    }}
                  >
                    <Text
                      text={`${index + 1}. `}
                      style={{ width: 25, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                      textEnd
                      color="white_muted"
                    />
                    <Input
                      containerStyle={{
                        minHeight: '34px',
                        padding: '0px',
                        flex: 1,
                        border: 'none',
                        backgroundColor: 'transparent'
                      }}
                      style={{ width: '100%', color: '#fff' }}
                      value={_}
                      onPaste={(e) => {
                        handleEventPaste(e, index);
                      }}
                      onChange={(e) => {
                        onChange(e, index);
                      }}
                      // onMouseOverCapture={(e) => {
                      //   setHover(index);
                      // }}
                      // onMouseLeave={(e) => {
                      //   setHover(999);
                      // }}
                      onFocus={(e) => {
                        setCurInputIndex(index);
                      }}
                      onBlur={(e) => {
                        setCurInputIndex(999);
                      }}
                      onKeyUp={(e) => handleOnKeyUp(e)}
                      autoFocus={index == curInputIndex}
                      // preset={'password'}
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
            marginTop: '10px',
            // boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
            backgroundColor: '#222222',
            borderRadius: '14px',
            padding: '10px 16px',
            gap: '6px'
          }}
        >
          <Row
            style={{
              alignItems: 'center'
            }}
          >
            <Image src="/images/icons/info-circle.svg" size={24} />
            <Text
              text="Note:"
              style={{
                color: colors.white,
                lineHeight: '20px',
                fontSize: '14px',
                fontWeight: 600
              }}
            />
          </Row>
          <Text
            text="Enter your recovery phrase here to restore your wallet. Click on any field and paste the entire phrase. Make sure the phrase is in the correct order, without capitalization, punctuation, or extra spaces."
            style={{
              color: '#fff',
              lineHeight: '18px',
              fontSize: '12px',
              fontWeight: 400,
              opacity: 0.5
            }}
          />
        </Column>
      </Column>
      <Button
        disabled={disabled}
        text="Continue"
        preset="primary"
        onClick={() => {
          onNext();
        }}
      />
    </Column>
  );
}
