import React, { useEffect, useState } from 'react'
import { HomeImageSlider } from '../../../assets/components/HomeImageSlider/HomeImageSlider'
import { homeSlider } from '../../../Database/db';

import "./_homePage.scss";

export const HomePage = () => {
  return (
    <div className='home-img-slider'>
      <HomeImageSlider images={homeSlider} />
      <h3>MEDAL WORTHY BRANDS TO BAG</h3>
      <h3>SHOP BY CATEGORY</h3>
    </div>
  )
}