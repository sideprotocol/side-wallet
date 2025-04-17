import { useState } from 'react';

import { Icon } from '../Icon';
import { Input } from '../Input';

export function Search({ value, setValue }: { value: string; setValue: (data: string) => void }) {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`w-full border-[1px] border-solid px-[10px] flex items-center rounded-[10px] bg-[#17171C] relative gap-[8px] ${
        isFocus ? 'border-white' : ' border-[#ffffff20] hover:border-[#ffffff50]'
      }`}>
      <Icon icon="search" color={'search_icon'} size={20}></Icon>
      <Input
        value={value}
        onChange={(event) => {
          setValue(event.target.value.trim());
        }}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        containerStyle={{
          width: '100%',
          border: 'none',
          padding: '0'
        }}
        placeholder="Search crypto"
      />
      <div
        onClick={() => {
          setValue('');
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          display: value ? 'block' : 'none'
        }}>
        <Icon icon="clear" color={isHover ? 'white' : 'search_icon'} size={20}></Icon>
      </div>
    </div>
  );
}
