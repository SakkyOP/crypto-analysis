import React, { Fragment } from 'react'
import Text from '../components/Text'
import Scan from '../components/Scan'
import LandingPage from '../components/LandingPage'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='h-screen w-screen relative bg-[#1E1E1E] text-white overflow-hidden'>
      <LandingPage/>
      <Text/>
      <Scan/>
    </div>
  )
}
export default Home