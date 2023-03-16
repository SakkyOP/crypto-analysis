import React, { Fragment } from 'react'
import Text from './Text'
type Props = {}

const LandingPage = (props: Props) => {
	return (
		<div>
			<div className='h-[50rem] w-[50rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-30rem] left-[-30rem]'></div>
			<div className='flex h-screen w-full'>
				<div className='flex bg-[#0B0E10] relative  bg-opacity-50 backdrop-blur-sm justify-center items-center w-1/2'>
					{/* LEFT SIDE TEXT*/}
					<div className='flex backdrop-blur-sm h-[34rem] w-[28rem] bg-opacity-50 shadow-2xl rounded-lg flex-col items-center'>
						{/* IMPORT TEST HERE THEN STYLE THAT TEST COMPONENT IT */}
						<Text/>
					</div>
				</div>
				<div className='w-1/2'>
					{/* RIGHT SIDE IMAGE*/}
					RIGHT SIDE
				</div>
			</div>
		</div>
	)
}

export default LandingPage