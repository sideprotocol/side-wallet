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
        <div
          style={{
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            margin: '20px 0px 10px',
            color: 'white'
          }}>
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
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'white',
              fontWeight: 700,
              padding: '5px',
              borderRadius: '16px',
              fontSize: '14px',
              border: '1px solid #ffffff/10',
              height: '50px',
              backgroundColor: '#000'
            }}>
            {['0.25', '0.5', '1', ''].map((item, index) => {
              if (!item && index === 3) {
                return (
                  <div
                    className={'focus-within:!border-[#0DD4C3] transition-colors duration-300'}
                    key={index}
                    style={{
                      width: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #848E9C',
                      borderRadius: '100px',
                      padding: '0px 12px',
                      fontWeight: 600,
                      background: '#000'
                    }}>
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
                    background: item === slippage ? 'rgb(13, 212, 195)' : '#1E1E1F',
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
