import { useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SIDE_BRIDGEEXPLORER_URL, SIDE_HUB_URL, SIDE_STATION_URL } from '@/shared/constant';
import { Content, Footer, Icon, Input, Layout } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';

// import { Image } from '@/ui/components';

export default function SettingsTabScreen() {
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
      <Content>
        <div
          className={`mt-[16px] w-full border-[1px] border-solid px-[10px] flex items-center rounded-[10px] bg-[#1E1E1F] relative gap-[8px] !min-h-[40px] ${
            isFocus ? 'border-white' : ' border-[#ffffff20] hover:border-[#ffffff50]'
          }`}>
          <Icon icon="search" color={'search_icon'} size={20}></Icon>
          <Input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value.trim());
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
              padding: '0',
              minHeight: '38px'
            }}
            placeholder="Search applications"
          />
          <div
            onClick={() => {
              setSearchTerm('');
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              display: searchTerm ? 'block' : 'none'
            }}>
            <Icon icon="clear" color={isHover ? 'white' : 'search_icon'} size={20}></Icon>
          </div>
        </div>

        <div className={`${searchTerm ? '' : '!hidden'} flex flex-col gap-[16px] mt-[16px]`}>
          <div className="flex  gap-[16px] mb-[10px] items-center">
            <div className="w-[36px] h-[36px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
              <img className={'w-[36px] h-[36px]'} src="/images/icons/search/icon-station.png" alt="station" />
            </div>
            <div className=" relative  flex flex-col justify-center gap-[2px] flex-1">
              <div className={'text-[14px] font-[600]'}>Side Station</div>
              <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>Dashboard for Side Chain</div>
              <div className="border-b-[1px] border-[#fff]/10 w-full absolute -bottom-[10px] "></div>
            </div>
          </div>

          <div className="flex  gap-[16px]">
            <div className="w-[36px] h-[36px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
              <img className={'w-[36px] h-[36px]'} src="/images/icons/search/icon-hub.png" alt="hub" />
            </div>
            <div className=" relative flex flex-col justify-center gap-[2px] flex-1">
              <div className={'text-[14px] font-[600]'}>Side Hub</div>
              <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>DeFi Hub Side Protocol</div>
              <div className="border-b-[1px] border-[#fff]/10 w-full absolute -bottom-[10px] "></div>
            </div>
          </div>
        </div>

        <div className={!searchTerm ? '' : '!hidden'}>
          {/*<img className={'w-full h-[98px] mt-[6px]'} src={'/images/img/explore-banner.png'} alt={'banner'} />*/}
          <Swiper
            modules={[Autoplay]} // 引入 Autoplay 模块
            autoplay={{
              delay: 2000, // 自动播放延迟时间，单位为毫秒
              disableOnInteraction: false // 用户交互后仍然继续自动播放
            }}
            className="mySwiper">
            <SwiperSlide>
              <img className={'w-full h-[98px] mt-[6px]'} src={'/images/img/explore-banner.png'} alt={'banner'} />
            </SwiperSlide>
            <SwiperSlide>
              <img className={'w-full h-[98px] mt-[6px]'} src={'/images/img/explor-banner-2.png'} alt={'banner2'} />
            </SwiperSlide>
          </Swiper>
          <div className="">
            <div className="my-[16px] font-[600]">Recommend</div>
            <div className="flex gap-[16px] ">
              <div
                className="flex flex-col items-center gap-[6px] group cursor-pointer"
                onClick={() => window.open(SIDE_STATION_URL)}>
                <div className="w-[56px] h-[56px] bg-[#030303] rounded-[16px] flex items-center justify-center border-[#F7771A] border-[0.5px] group-hover:border-[#F7931A] ">
                  <img className={'w-[30px] h-[30px]'} src="/images/icons/search/icon-station.png" alt="station" />
                </div>
                <div className="text-[12px] font-[300] group-hover:text-[#ffffff]/80">Side Station</div>
              </div>

              <div
                className="flex flex-col items-center gap-[6px] group cursor-pointer"
                onClick={() => window.open(SIDE_HUB_URL)}>
                <div className="w-[56px] h-[56px] bg-[#030303] rounded-[16px] flex items-center justify-center border-[#F7771A] border-[0.5px] group-hover:border-[#F7931A] ">
                  <img className={'w-[30px] h-[30px]'} src="/images/icons/search/icon-hub.png" alt="hub" />
                </div>
                <div className="text-[12px] font-[300] group-hover:text-[#ffffff]/80">Side Hub</div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" font-[600] my-[16px]">
              Explore <span className={'text-[#F2C526]'}>Bitcoin</span> on the Side
            </div>

            <div className="flex flex-col gap-[16px] ">
              <div
                className="flex  gap-[16px] group cursor-pointer"
                onClick={() => window.open(SIDE_BRIDGEEXPLORER_URL)}>
                <div className="w-[60px] h-[60px] bg-[#030303] rounded-[16px] flex items-center justify-center border-[#F7771A] border-[0.5px] group-hover:border-[#F7931A] cursor-pointer">
                  <img className={'w-[30px] h-[30px]'} src="/images/icons/search/icon-station.png" alt="station" />
                </div>
                <div className="   flex flex-col justify-center gap-[6px]">
                  <div className={'text-[16px] font-[600] group-hover:text-[#ffffff]/80'}>Side Station</div>
                  <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>Dashboard for Side Chain</div>
                </div>
              </div>

              <div
                className="flex  gap-[16px] group cursor-pointer"
                onClick={() => window.open(SIDE_BRIDGEEXPLORER_URL)}>
                <div className="w-[60px] h-[60px] bg-[#030303] rounded-[16px] flex items-center justify-center border-[#F7771A] border-[0.5px] group-hover:border-[#F7931A] cursor-pointer">
                  <img className={'w-[30px] h-[30px]'} src="/images/icons/search/icon-hub.png" alt="hub" />
                </div>
                <div className="  flex flex-col justify-center gap-[6px]">
                  <div className={'text-[16px] font-[600] group-hover:text-[#ffffff]/80'}>Side Hub</div>
                  <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>DeFi Hub Side Protocol </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="explore" />
      </Footer>
    </Layout>
  );
}
