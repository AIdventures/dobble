import Analysis from '@/sections/Analysis/analysis'
import Banner from '@/sections/Banner/banner'
import Claim from '@/sections/Claim/claim'
import Finder from '@/sections/Finder/finder'
import Footer from '@/sections/Footer/footer'
import Landing from '@/sections/Landing/landing'
import Image from 'next/image'

export default function Home() {
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
