import { useEffect, useState } from 'react';

import { Column, Content, Footer, Icon, Input, Layout, Row } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { colors } from '@/ui/theme/colors';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
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
      <Content >
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
              minHeight: '38px',
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
              <img className={'w-[36px] h-[5px]'} src="/images/icons/search/icon-station.png" alt="station" />
            </div>
            <div className=" relative  flex flex-col justify-center gap-[2px] flex-1">
              <div className={'text-[14px] font-[600]'}>Side Station</div>
              <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>Dashboard for Side Chain</div>
              <div className="border-b-[1px] border-[#fff]/10 w-full absolute -bottom-[10px] "></div>
            </div>
          </div>

          <div className="flex  gap-[16px]">
            <div className="w-[36px] h-[36px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
              <img className={'w-[36px] h-[9.5px]'} src="/images/icons/search/icon-hub.png" alt="hub" />
            </div>
            <div
              className=" relative flex flex-col justify-center gap-[2px] flex-1">
              <div className={'text-[14px] font-[600]'}>Side Hub</div>
              <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>DeFi Hub Side Protocol</div>
              <div className="border-b-[1px] border-[#fff]/10 w-full absolute -bottom-[10px] "></div>
            </div>
          </div>
        </div>

        <div className={!searchTerm ? '' : '!hidden'}>
          {/*<img className={'w-full h-[98px] mt-[6px]'} src={'/images/img/explore-banner.png'} alt={'banner'} />*/}
          <Swiper className="mySwiper">
            <SwiperSlide>
              <img className={'w-full h-[98px] mt-[6px]'} src={'/images/img/explore-banner.png'} alt={'banner'} />
            </SwiperSlide>
            <SwiperSlide>
              <img className={'w-full h-[98px] mt-[6px]'} src={'/images/img/explore-banner.png'} alt={'banner'} />
            </SwiperSlide>
          </Swiper>
          <div className="">
            <div className="my-[16px] font-[600]">Recommend</div>
            <div className="flex gap-[16px] ">
              <div className="flex flex-col items-center gap-[6px]">
                <div className="w-[56px] h-[56px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
                  <img className={'w-[48px] h-[5px]'} src="/images/icons/search/icon-station.png" alt="station" />
                </div>
                <div className="text-[12px]">
                  Side Station
                </div>
              </div>

              <div className="flex flex-col items-center gap-[6px]">
                <div className="w-[56px] h-[56px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
                  <img className={'w-[30px] h-[9.5px]'} src="/images/icons/search/icon-hub.png" alt="hub" />
                </div>
                <div className="text-[12px] font-[300]">
                  Side Hub
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" font-[600] my-[16px]">Explore <span className={'text-[#F2C526]'}>Bitcoin</span> on the Side</div>

            <div className="flex flex-col gap-[16px] ">
              <div className="flex  gap-[16px]">
                <div className="w-[60px] h-[60px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
                  <img className={'w-[48px] h-[5px]'} src="/images/icons/search/icon-station.png" alt="station" />
                </div>
                <div className="   flex flex-col justify-center gap-[6px]">
                  <div className={'text-[16px] font-[600]'}>Side Station</div>
                  <div className={'font-[300] text-[12px] text-[#ffffff]/30'}>Dashboard for Side Chain</div>
                </div>
              </div>

              <div className="flex  gap-[16px]">
                <div className="w-[60px] h-[60px] bg-[#6DE5DA] rounded-[16px] flex items-center justify-center ">
                  <img className={'w-[30px] h-[9.5px]'} src="/images/icons/search/icon-hub.png" alt="hub" />
                </div>
                <div className="  flex flex-col justify-center gap-[6px]">
                  <div className={'text-[16px] font-[600]'}>Side Hub</div>
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
