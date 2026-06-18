import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ShopByCategory from './components/ShopByCategory'
import DiamondStyling from './components/DiamondStyling'
import HeroCollection from './components/HeroVideo'
import BestSellers from './components/BestSeller'
import Footer from './components/Footer'
import ForEveryYou from './components/Foreveryyou'
import BannerPage from './components/BannerPage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ShopByCategory />
      <HeroCollection />
      <BestSellers />
      <ForEveryYou />
      <BannerPage />
      <Footer />
      {/* <DiamondStyling /> */}
    </div>
  )
}

export default App