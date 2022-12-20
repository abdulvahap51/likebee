import React, { useState } from 'react';
import img from "./images/basliksiz.png"
import img2 from "./images/image2.png"

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { useMediaQuery } from 'react-responsive'

const items = [
  {
    src:img,
    altText: 'Slide 1',
   
  },
  {
    src: img2,
    altText: 'Slide 2',
    
  },
  
];

function Carosel(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <>
    {/* <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel> */}
    {isDesktopOrLaptop && <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>}
    
     {isTabletOrMobile && <div>
      <div className='text-center' style={{
      
      
      }}>
      <img style={{
        height:"200px",
        width:"80%",
      }} src= {img } alt='none'></img>
      <img style={{
        height:"200px",
        width:"80%",
        marginTop:"40px"
        
      }} src={img2} alt='none'></img>
     </div></div>}
     </>
  );
}

export default Carosel;