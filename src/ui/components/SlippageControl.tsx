import { swapStore } from '@/ui/stores/SwapStore';
// import { IconButton, Input } from "@mui/material";

import { Button } from '@/ui/components/Button';
// import CloseSVG from "@/assets/icons/close.svg?react";

// import { SlippageControlProps } from "@/services/dex/type";
// import Back from "@/components/Back";

// import { useContext } from "react";
// import { globalContext } from "@/context";
import { Modal } from 'antd';
// import { colors } from "@/constants/colors";

export default function SlippageControl(props) {
  const {
    slippage,
    // slippageIsAuto,
    onBack,
    onInputSlippage,
    onQuickSet,
    open,
    onClose,
    sx,
  } = props;
  // const { isLight } = useContext(globalContext);

  return (
    <Modal
      maskClosable={true}
      // onCancel={handleCancel}
      className="walletSelectModal"
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
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "18px",
            margin: "40px 0px 10px",
            color: 'white',
          }}
        >
          <span className="font-normal">Slippage tolerance</span>
          <div className="">
            <span>{slippage}% </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: 'white',
              fontWeight: 700,
              padding: "5px",
              borderRadius: "16px",
              fontSize: "14px",
              border: `1px solid white`,
              height: "50px",
            }}
          >
            {["0.25", "0.5", "1", ""].map((item, index) => {
              if (!item && index === 3) {
                return (
                  <div
                    key={index}
                    style={{
                      width: "80px",
                      display: "flex",
                      alignItems: "center",
                      border: `1px solid white`,
                      borderRadius: "12px",
                      padding: "0px 12px",
                      marginLeft: "8px",
                      fontWeight: 600,
                      background: '#000',
                    }}
                  >
                    {/*<Input*/}
                    {/*  className="h-[40px] py-0.5 text-center bg-transparent border-side-secondary rounded-[14px] border border-transparent  focus:border-[#6DE5DA]"*/}
                    {/*  type="text"*/}
                    {/*  value={slippage}*/}
                    {/*  disableUnderline*/}
                    {/*  onChange={(e) => {*/}
                    {/*    onInputSlippage(e.target.value);*/}
                    {/*  }}*/}
                    {/*  sx={{*/}
                    {/*    fontWeight: 600,*/}
                    {/*    color: isLight ? colors.black : colors.white,*/}
                    {/*  }}*/}
                    {/*/>*/}
                    <span>%</span>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  style={{
                    height: "36px",
                    width: "65px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "14px",
                    fontWeight: 600,
                    background: item === slippage ? 'rgb(13, 212, 195)' : "",
                    color: 'white',
                  }}
                  onClick={() => {
                    onQuickSet(item);
                  }}
                >
                  <span>{item}%</span>
                </div>
              );
            })}
          </div>
          <Button
            style={{
              // color: '#000'
            }}
            // themetype="primary"
            preset="primary"
            onClick={() => {
              swapStore.slippageIsAuto = true;
              swapStore.slippage = '0.25';
            }}
          >
            Auto
          </Button>
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
