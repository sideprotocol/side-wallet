import Lottie from 'react-lottie';

import successAnimation from '@/ui/assets/lottie/correct.json';

export function SuccessAnimation() {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: successAnimation
      }}
      width={100}
    />
  );
}
