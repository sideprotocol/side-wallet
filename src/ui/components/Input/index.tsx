import bitcore from 'bitcore-lib';
import { isNull } from 'lodash';
import React, { CSSProperties, useEffect, useState } from 'react';

import { SAFE_DOMAIN_CONFIRMATION, SUPPORTED_DOMAINS } from '@/shared/constant';
import { getSatsName } from '@/shared/lib/satsname-utils';
import { Inscription } from '@/shared/types';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';
import { Typography } from '@mui/material';

import { AccordingInscription } from '../AccordingInscription';
import { useTools } from '../ActionComponent';
import { CopyableAddress } from '../CopyableAddress';
import { Icon } from '../Icon';
import { Row } from '../Row';
import { $textPresets, Text } from '../Text';
import './index.less';

export interface InputProps {
  preset?: Presets;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onMouseOver?: React.ClipboardEventHandler<HTMLInputElement>;
  onContainerMouseOver?: React.ClipboardEventHandler<HTMLInputElement>;
  onMouseLeave?: React.ClipboardEventHandler<HTMLInputElement>;
  onContainerMouseLeave?: React.ClipboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  defaultValue?: string;
  value?: string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  addressInputData?: { address: string; domain: string };
  onAddressInputChange?: (params: { address: string; domain: string; inscription?: Inscription }) => void;
  onAmountInputChange?: (amount: string) => void;
  disabled?: boolean;
  disableDecimal?: boolean;
  enableBrc20Decimal?: boolean;
  runesDecimal?: number;
  enableMax?: boolean;
  onMaxClick?: () => void;
  rightElement?: React.ReactNode;
}

type Presets = keyof typeof $inputPresets;
const $inputPresets = {
  password: {},
  amount: {},
  address: {},
  text: {}
};

const $baseContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.black_dark3,
  paddingLeft: 15.2,
  paddingRight: 15.2,
  paddingTop: 11,
  paddingBottom: 11,
  borderRadius: 10,
  minHeight: '48px',
  alignSelf: 'stretch'
  // border: '1px solid #FFFFFF33'
};

const $baseInputStyle: CSSProperties = Object.assign({}, $textPresets.regular, {
  display: 'flex',
  flex: 1,
  borderWidth: 0,
  outlineWidth: 0,
  background: 'transparent',
  alignSelf: 'stretch'
});

function PasswordInput(props: InputProps) {
  const {
    placeholder,
    containerStyle,
    style: $inputStyleOverride,
    // onMouseOver,
    // onMouseLeave,
    onContainerMouseOver,
    onContainerMouseLeave,
    ...rest
  } = props;
  const [type, setType] = useState<'password' | 'text'>('password');
  const [isMouse, setIsMouse] = useState<boolean>(false);
  const [isContainerMouseOver, setIsContainerMouseOver] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div
      className={` border-[1px] border-solid ${
        isFocus ? 'border-white' : 'border-transparent hover:border-[#ffffff50] '
      } `}
      style={Object.assign({}, $baseContainerStyle, containerStyle, {
        // borderColor: isContainerMouseOver ? '#ffffff50!important' : 'transparent'
      })}>
      <input
        placeholder={isNull(placeholder) ? 'Password' : placeholder}
        className="placeholder:opacity-30"
        type={type}
        style={Object.assign({}, $baseInputStyle, $inputStyleOverride)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...rest}
      />
      {type === 'password' && (
        <Icon
          size={24}
          onMouseLeave={() => setIsMouse(false)}
          onMouseOver={() => setIsMouse(true)}
          icon={isMouse ? 'eye-slash-hover' : 'eye-slash'}
          style={{ marginLeft: spacing.tiny }}
          // onClick={() => setType('text')} color="textDim" />
          onClick={() => setType('text')}
          color={isMouse ? 'white' : 'textDim'}
        />
      )}
      {type === 'text' && (
        <Icon icon="eye-white" size={24} style={{ marginLeft: spacing.tiny }} onClick={() => setType('password')} />
      )}
    </div>
  );
}

function AmountInput(props: InputProps) {
  const {
    placeholder,
    onAmountInputChange,
    disabled,
    style: $inputStyleOverride,
    disableDecimal,
    enableBrc20Decimal,
    runesDecimal,
    enableMax,
    onMaxClick,
    rightElement,
    ...rest
  } = props;
  const $style = Object.assign({}, $baseInputStyle, $inputStyleOverride, disabled ? { color: colors.textDim } : {});

  if (!onAmountInputChange) {
    return <div />;
  }
  const [inputValue, setInputValue] = useState('');
  const [validAmount, setValidAmount] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    onAmountInputChange(validAmount);
  }, [validAmount]);

  const handleInputAmount = (e) => {
    const value = e.target.value;
    if (disableDecimal) {
      if (/^[1-9]\d*$/.test(value) || value === '') {
        setValidAmount(value);
        setInputValue(value);
      }
    } else {
      if (enableBrc20Decimal) {
        if (/^\d+\.?\d{0,18}$/.test(value) || value === '') {
          setValidAmount(value);
          setInputValue(value);
        }
      } else if (runesDecimal !== undefined) {
        const regex = new RegExp(`^\\d+\\.?\\d{0,${runesDecimal}}$`);
        if (regex.test(value) || value === '') {
          setValidAmount(value);
          setInputValue(value);
        }
      } else {
        if (/^\d*\.?\d{0,8}$/.test(value) || value === '') {
          setValidAmount(value);
          setInputValue(value);
        }
      }
    }
  };
  return (
    <div
      className={` border-[1px] border-solid ${
        isFocus ? 'border-[#ffffff50]' : 'border-[#ffffff20] hover:border-[#ffffff50] '
      } `}
      style={Object.assign({}, $baseContainerStyle, { padding: '4px 10px' })}>
      <input
        placeholder={placeholder || 'Amount'}
        className="placeholder:opacity-30"
        type={'text'}
        value={inputValue}
        onChange={handleInputAmount}
        style={$style}
        disabled={disabled}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...rest}
      />
      {rightElement ? (
        rightElement
      ) : enableMax ? (
        <Typography
          onClick={() => {
            if (onMaxClick) onMaxClick();
          }}
          sx={{
            color: colors.grey12,
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: '.4s',
            ':hover': {
              color: colors.white
            }
          }}>
          Max
        </Typography>
      ) : null}
    </div>
  );
}

export const AddressInput = (props: InputProps) => {
  const { placeholder, onAddressInputChange, addressInputData, style: $inputStyleOverride, ...rest } = props;

  if (!addressInputData || !onAddressInputChange) {
    return <div />;
  }
  const [validAddress, setValidAddress] = useState(addressInputData.address);
  const [parseAddress, setParseAddress] = useState(addressInputData.domain ? addressInputData.address : '');
  const [parseError, setParseError] = useState('');
  const [formatError, setFormatError] = useState('');

  const [inputVal, setInputVal] = useState(addressInputData.domain || addressInputData.address);

  const [inscription, setInscription] = useState<Inscription>();
  const [parseName, setParseName] = useState('');
  const wallet = useWallet();
  const tools = useTools();
  useEffect(() => {
    onAddressInputChange({
      address: validAddress,
      domain: parseAddress ? inputVal : '',
      inscription
    });
  }, [validAddress]);

  const [searching, setSearching] = useState(false);

  const resetState = () => {
    if (parseError) {
      setParseError('');
    }
    if (parseAddress) {
      setParseAddress('');
    }
    if (formatError) {
      setFormatError('');
    }

    if (validAddress) {
      setValidAddress('');
    }

    if (inscription) {
      setInscription(undefined);
    }
    setParseName('');
  };

  const handleInputAddress = (e) => {
    const inputAddress = e.target.value.trim();
    setInputVal(inputAddress);

    resetState();

    const teststr = inputAddress.toLowerCase();
    const satsname = getSatsName(teststr);
    if (satsname) {
      if (SUPPORTED_DOMAINS.includes(satsname.suffix)) {
        setSearching(true);
        wallet
          .queryDomainInfo(encodeURIComponent(inputAddress))
          .then((inscription) => {
            resetState();
            if (!inscription) {
              setParseError(`${inputAddress} does not exist`);
              return;
            }
            setInscription(inscription);
            if (inscription.utxoConfirmation < SAFE_DOMAIN_CONFIRMATION) {
              setParseError(
                `This domain has been transferred or inscribed recently. Please wait for block confirmations (${inscription.utxoConfirmation}/3).`
              );
              return;
            }

            const address = inscription.address || '';
            setParseAddress(address);
            setValidAddress(address);
            setParseName(satsname.suffix);
          })
          .catch((err: Error) => {
            const errMsg = err.message + ' for ' + inputAddress;
            setFormatError(errMsg);
          })
          .finally(() => {
            setSearching(false);
          });
      } else {
        const names = SUPPORTED_DOMAINS.map((v) => `.${v}`);
        let str = '';
        for (let i = 0; i < names.length; i++) {
          if (i == 0) {
            // empty
          } else if (i < names.length - 1) {
            str += ', ';
          } else {
            str += ' and ';
          }
          str += `${names[i]}`;
        }
        setFormatError(`Currently only ${str} are supported.`);
        return;
      }
    } else {
      const isValid = bitcore.Address.isValid(inputAddress);
      if (!isValid) {
        setFormatError('Recipient address is invalid');
        return;
      }
      setValidAddress(inputAddress);
    }
  };

  return (
    <div style={{ alignSelf: 'stretch' }}>
      {/*formatError*/}
      <div
        className={`hover:border-[#ffffff50] border-[1px] border-solid border-[#ffffff20] ${
          formatError ? '!border-[#e52937]' : ''
        }`}
        style={Object.assign({}, $baseContainerStyle, { flexDirection: 'column', minHeight: '48px' })}>
        <input
          placeholder={'Address...'}
          className="placeholder:opacity-30"
          type={'text'}
          style={Object.assign({}, $baseInputStyle, $inputStyleOverride)}
          onChange={async (e) => {
            handleInputAddress(e);
          }}
          defaultValue={inputVal}
          {...rest}
        />

        {searching && (
          <Row full mt="sm">
            <Text preset="sub" text={'Loading...'} />
          </Row>
        )}
        {inscription && (
          <Row full itemsCenter mt="sm">
            <CopyableAddress address={parseAddress} />
            <AccordingInscription inscription={inscription} />
          </Row>
        )}
      </div>

      {parseName ? (
        <Row mt="sm" gap="zero" itemsCenter>
          <Text preset="sub" size="sm" text={'Name recognized and resolved. ('} />
          <Text
            preset="link"
            color="yellow"
            text={'More details'}
            onClick={() => {
              window.open('https://side.one/');
            }}
          />
          <Text preset="sub" size="sm" text={')'} />
        </Row>
      ) : null}
      {parseError && <Text text={parseError} preset="regular" color="error" />}
      <Text text={formatError} preset="regular" color="error" />
    </div>
  );
};

function TextInput(props: InputProps) {
  const {
    placeholder,
    containerStyle,
    value,
    onChange,
    style: $inputStyleOverride,
    disabled,
    autoFocus,
    ...rest
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div
      className={` border-[1px] border-solid ${
        isFocus ? 'border-[#ffffff50]' : 'border-[#ffffff20] hover:border-[#ffffff50] '
      } `}
      style={Object.assign({}, $baseContainerStyle, containerStyle)}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={'text'}
        disabled={disabled}
        autoFocus={autoFocus}
        className="placeholder:opacity-30"
        style={Object.assign({}, $baseInputStyle, $inputStyleOverride, {})}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...rest}
      />
    </div>
  );
}

export function Input(props: InputProps) {
  const { preset } = props;

  if (preset === 'password') {
    return <PasswordInput {...props} />;
  } else if (preset === 'amount') {
    return <AmountInput {...props} />;
  } else if (preset === 'address') {
    return <AddressInput {...props} />;
  } else {
    return <TextInput {...props} />;
  }
}
