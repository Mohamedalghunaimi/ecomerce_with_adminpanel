import React from 'react'
import Navbar from './parts/Navbar'
import Hero from './parts/Hero'
import LatestCollection from './parts/LatestCollection'
import BestSeller from './parts/BestSeller'
import Services from './parts/Services'
import Subscribe from './parts/Subscribe'
import Summary from './parts/Summary'
import Footer from './parts/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <LatestCollection />
    <BestSeller />
    <Services />
    <Subscribe />
    <Summary />
    <Footer />
    </>
  )
}

export default Home
