import Step1 from './Step/Step1';
import Step2 from './Step/Step2';
import useInitLogic from './hooks/useInitLogic';

export default function Index() {
  useInitLogic();

  return <Step1 />;
  return <Step2 />;
}
