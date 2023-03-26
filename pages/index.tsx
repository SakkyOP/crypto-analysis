import React, { Fragment } from 'react'
import Text from '../components/Text'
import Scan from '../components/Scan'
import LandingPage from '../components/LandingPage'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='h-fit w-screen relative text-white overflow-hidden max-lg:overflow-visible'>
      <LandingPage/>
      {/* <Text/>
      <Scan/> */}
    </div>
  )
}
export default Home