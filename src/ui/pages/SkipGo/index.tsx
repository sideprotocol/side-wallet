import { useState } from 'react';

import Step1 from './Step/Step1';
import Step2 from './Step/Step2';
import useInitLogic from './hooks/useInitLogic';

export default function Index() {
  const [step, setStep] = useState(1);

  useInitLogic();
  if (step === 1) {
    return <Step1 setStep={setStep} />;
  }
  return <Step2 setStep={setStep} />;
}
