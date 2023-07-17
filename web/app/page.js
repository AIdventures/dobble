"use client"

import { useEffect } from 'react'

import Analysis from '@/sections/Analysis/analysis'
import Banner from '@/sections/Banner/banner'
import Claim from '@/sections/Claim/claim'
import Finder from '@/sections/Finder/finder'
import Footer from '@/sections/Footer/footer'
import Landing from '@/sections/Landing/landing'

import AOS from 'aos';

export default function Home() {

  useEffect(() => {
    AOS.init({
      offset: 75,
      duration: 600,
      easing: 'ease',
      delay: 0,
      once: true
    });
  }, []);

  return (
    <>
      <Landing />
      <Claim />
      <Finder />
      <Banner />
      <Analysis />
      <Footer />
    </>
  )
}
