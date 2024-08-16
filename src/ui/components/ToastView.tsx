// import SuccessSVG from '@/ui/assets/icons/success.svg?react';
// import FailSVG from '@/ui/assets/icons/fail.svg?react';
// import CLose_7SVG from "@/assets/icons/close_7.svg?react";
import React, { useEffect, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';

import { ToastOptions } from '@/ui/constants/toast';

interface IToastView {
  children: React.ReactNode;
  type?: 'success' | 'fail';
  toaster: Toast;
  txHashUrl?: string;
}

export default function ToastView({ children, type, toaster, txHashUrl }: IToastView) {
  const [progress, setProgress] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const duration = ToastOptions.duration;

  const timePerPro = (duration || 5000) / 100;

  const intervalTime = 25;

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100 && !isHovered) {
        setProgress(progress + intervalTime / timePerPro);
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [progress, isHovered]);

  useEffect(() => {
    if (Math.floor(progress) == 100) {
      toast.remove(toaster.id);
    }
  }, [progress]);

  return (
    <div
      style={{
        width: '400px',
        padding: '15px',
        borderRadius: '16px',
        background: 'white',
        fontWeight: 500,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        right: '40px',
        bottom: '50px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div>
        {/* {type === 'success' && <SuccessSVG />}
        {type === 'fail' && <FailSVG />} */}
      </div>
      <div
        style={{
          width: '100%',
          paddingRight: '50px',
          overflowWrap: 'break-word'
        }}>
        {children}

        {txHashUrl && (
          <div>
            <a
              href={txHashUrl}
              style={{
                color: '#3C8AFF',
                border: 'none',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}
              rel="noreferrer"
              target="_blank">
              View Transaction
            </a>
          </div>
        )}

        <div className="absolute bottom-2 w-3/5    h-0.5 bg-gray-200">
          <div
            className={'absolute top-0 h-full'}
            style={{ width: `${progress}%`, background: type == 'success' ? '#0DD4C3' : '#F6465D' }}></div>
        </div>
      </div>
      {/*<IconButton*/}
      {/*  sx={{*/}
      {/*    position: "absolute",*/}
      {/*    top: "8px",*/}
      {/*    right: "8px",*/}
      {/*    color: "rgba(0,0,0,0.5)",*/}
      {/*  }}*/}
      {/*  onClick={() => {*/}
      {/*    toast.remove(toaster.id);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <CLose_7SVG />*/}
      {/*</IconButton>*/}
    </div>
  );
}
