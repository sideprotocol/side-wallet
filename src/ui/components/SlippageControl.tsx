import { Modal } from 'antd';

import { Button } from '@/ui/components/Button';

import { useAppDispatch } from '../state/hooks';
import { SwapActions } from '../state/swap/reducer';

export default function SlippageControl(props) {
  const {
    slippage,
    // slippageIsAuto,
    onBack,
    onInputSlippage,
    onQuickSet,
    open,
    onClose,
    sx
  } = props;
  const dispatch = useAppDispatch();

  return (
    <Modal
      maskClosable={true}
      className="slippageControlModal walletSelectModal"
      title={null}
      closable={false}
      centered
      open={open}
      footer={null}
      width={314}
      onCancel={onClose}>
      <div
        style={{
          padding: '12px 10px 16px'
        }}>
        <div className="flex items-center justify-between text-[13px] font-medium text-white my-[20px] mx-0">
          <span className="font-normal pl-[10px]">Slippage tolerance</span>
          <div className="pr-[10px]">
            <span>{slippage}% </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '12px'
          }}>
          <div
            className="flex-1 flex items-center justify-between text-white font-bold p-[5px] rounded-[16px] text-[14px] border border-solid border-[#ffffff1a] h-[50px] bg-black">
            {['0.25', '0.5', '1', ''].map((item, index) => {
              if (!item && index === 3) {
                return (
                  <div
                    className="w-[80px] flex items-center border border-solid border-[#848E9C] rounded-[100px] px-3 font-semibold bg-black focus-within:!border-[#F7771A] transition-colors duration-300"
                    key={index}>
                    <input
                      className=" w-[40px] h-[33px] py-0.5 text-center focus:outline-none bg-transparent border-side-secondary rounded-[100px]   "
                      type="text"
                      value={slippage}
                      onChange={(e) => {
                        onInputSlippage(e.target.value);
                      }}
                    />
                    <span>%</span>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  style={{
                    height: '36px',
                    width: '65px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '100px',
                    fontWeight: 600,
                    background: item === slippage ? '#F7771A' : '#1E1E1F',
                    color: item === slippage ? '#000' : '#fff',
                    marginRight: '4px'
                  }}
                  onClick={() => {
                    onQuickSet(item);
                  }}>
                  <span>{item}%</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center w-full">
            <Button
              style={{
                color: '#000',
                width: '100%',
                height: '48px'
              }}
              preset="primary"
              onClick={() => {
                dispatch(SwapActions.update({ slippageIsAuto: true, slippage: '0.25' }));
              }}>
              Auto
            </Button>
          </div>
        </div>
        {/*<Button*/}
        {/*  text="Add Wallet"*/}
        {/*  preset="ghost"*/}
        {/*  icon={'plus'}*/}
        {/*  onClick={() => {*/}
        {/*    // navigate('WelcomeScreen', { });*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    marginTop: '18px'*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
    </Modal>
  );
}
