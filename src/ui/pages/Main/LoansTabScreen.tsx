import { useState } from 'react';
import 'swiper/css';

import { Content, Footer, Layout } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';

// import { Image } from '@/ui/components';

export default function LoansTabScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  // const navigate = useNavigate();
  // const wallet = useWallet();
  // useEffect(() => {

  // }, []);
  return (
    <Layout>
      <MainHeader title={''} />
      <Content></Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
