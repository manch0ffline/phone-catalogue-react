import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';

export const Header = () => {
  const desktopBanners = [1, 2, 3].map(num => `Banner-${num}.png`);
  const phoneBanners = [1, 2, 3].map(num => `slider-${num}.png`);

  const [banners, setBanners] = useState<string[]>(desktopBanners);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const updateBanners = () => {
    const newBanners = window.innerWidth <= 640 ? phoneBanners : desktopBanners;

    setBanners(newBanners);
    setActiveIndex(0);
  };

  useEffect(() => {
    updateBanners();
    window.addEventListener('resize', updateBanners);

    return () => {
      window.removeEventListener('resize', updateBanners);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__title-block">
          <h1 className="header__title">
            Welcome to Nice <br className="header__title--br" /> Gadgets store!
          </h1>
        </div>

        <div className="header__sliders">
          <div
            className="header__sliders-button header__sliders-button--left"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <div className="icon icon--array--left--light"></div>
          </div>
          <div
            className="header__sliders-button header__sliders-button--right"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className="icon icon--array--right--light"></div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
            autoplay={{ delay: 5000 }}
            loop
            slidesPerView={1}
            className="header__sliders__photo-container"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`./img/${banner}`}
                  alt={`slider-img-${banner}`}
                  className="header__sliders--photo"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="header__sliders--indicators-block">
            {banners.map((_, index) => (
              <div className="header__sliders--indicator-block" key={index}>
                <div
                  className={cn('header__sliders--indicator', {
                    'header__sliders--indicator--is-active':
                      index === activeIndex,
                  })}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
