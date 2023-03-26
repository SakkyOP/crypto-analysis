import React, { Fragment } from 'react'

type Props = {}

const About = (props: Props) => {
    return (
        <Fragment>
            <div className='text-white flex items-center justify-center overflow-hidden relative'>
                <div className="h-[50rem] w-[50rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-30rem] left-[-30rem] max-lg:invisible z-10"></div>
                <div className="h-[40rem] w-[40rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-15rem] left-[-30rem]  max-lg:visible z-10"></div>
                <div className="h-[40rem] w-[40rem] blur-[150px] bg-[#1BADFF] rounded-full absolute top-[-15rem] right-[-30rem]  max-lg:visible z-10"></div>
                <div className="flex justify-center max-lg:flex-col bg-[#0B0E10] bg-opacity-50 my-[3rem] shadow-2xl rounded-lg backdrop-blur-sm h-[90vh] w-[94vw] z-20">
                    <p>About</p>
                </div>
            </div>
        </Fragment>
    )
}

export default About