import React, { Fragment } from 'react'
import Text from '../component/Text'
import Scan from '../component/Scan'
import LandingPage from '../component/LandingPage'

type Props = {}

const Home = (props: Props) => {
  return (
    <Fragment>
      <LandingPage/>
      Home
      <Text />
      <Scan />
    </Fragment>   
  )
}

export default Home