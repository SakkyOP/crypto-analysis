import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const About = (props: Props) => {
    return (
        <Fragment>
            <div className='text-white flex items-center justify-center overflow-hidden relative '>
                <div className="h-[50rem] w-[50rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-30rem] left-[-30rem] max-lg:invisible z-8"></div>
                <div className="h-[40rem] w-[40rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-15rem] left-[-30rem]  max-lg:visible z-8"></div>
                <div className="h-[40rem] w-[40rem] blur-[150px] bg-[#1BADFF] rounded-full absolute top-[-15rem] right-[-30rem]  max-lg:visible z-8"></div>
                <div className="flex flex-col bg-[#0B0E10] items-center max-lg:flex-col max-sm:py-4 bg-[#0B0E8] bg-opacity-50 my-[3rem] shadow-2xl rounded-lg backdrop-blur-sm md:h-[90vh] w-[94vw] z-20">
                    <div className='flex px-20 mt-[2rem] relative h-fit w-fit'>
                        <p className="max-sm:text-[2.6rem] text-[3.6rem] font-RussoOne ">About</p>
                        <div className=" max-sm:right-[2rem] w-[6rem] h-2 bg-white absolute rotate-[120deg] right-[1rem] bottom-0"></div>
                        <div className=" max-sm:right-[2rem] w-[6rem] h-2 bg-white absolute rotate-[0deg] right-[1rem] bottom-0 "></div>
                    </div>
                    <div className='px-20 py-8'>
                        <div className='flex items-center'>
                            <div className='w-3 h-3 bg-white rounded-full mx-2'></div>
                            <p className='text-[2rem]'>What is Crypto Analyzer?</p>
                        </div>
                        <p className='text-[1.2rem] my-4 px-6'>Crypto Analyzer is a platform that enables users to verify the legitimacy of a public key by using both text and image inputs. This platform can determine whether a public key is real or fake, and if it is legitimate, it can identify the cryptocurrency to which the key belongs. This tool is useful for those who are concerned about the security of their digital assets, as it can help prevent them from falling victim to fraudulent activities.</p>
                        <div className='flex justify-center items-center mt-[6rem]'>
                            <p className='text-[2.6rem]'>“Meet the masterminds behind the magic, our team of tech wizards!”</p>
                        </div>
                        <div className='flex justify-center items-center '>
                            <div className='flex max-md:flex-col'>
                                <div className='flex items-center flex-col p-8'>
                                    <img className='rounded-full w-[12rem]' src={'codecrew/harsh.jpg'} alt='' />
                                    <p className='text-[1.6rem] max-md:text[1.2rem] mt-2 text-center flex-nowrap '>Harsh Deepanshu</p>
                                </div>
                                <div className='flex items-center flex-col p-8'>
                                    <img className='rounded-full w-[12rem]' src={'codecrew/saksham.jpg'} alt='' />
                                    <p className='text-[1.6rem] max-md:text[1.2rem] text-center mt-2 flex-nowrap'>Saksham Kathuria</p>
                                </div>
                                <div className='flex items-center flex-col p-8'>
                                    <img className='rounded-full w-[12rem]' src={'codecrew/vrinda.jpg'} alt='' />
                                    <p className='text-[1.6rem] max-md:text[1.2rem] mt-2 text-center flex-nowrap'>Vrinda Sharma</p>
                                </div>
                            </div>
                            <div className='flex max-md:flex-col'>
                                <div className='flex items-center flex-col p-8'>
                                    <img className='rounded-full w-[12rem]' src={'codecrew/sanya.jpg'} alt='' />
                                    <p className='text-[1.6rem] max-md:text[1.2rem] mt-2 text-center flex-nowrap'>Sanya Chawla</p>
                                </div>
                                <div className='flex items-center flex-col p-8'>
                                    <img className='rounded-full w-[12rem]' src={'codecrew/akshat.jpg'} alt='' />
                                    <p className='text-[1.6rem] max-md:text[1.2rem] mt-2 text-center flex-nowrap'>Akashat Sharma</p>
                                </div>
                                <div className='flex items-center flex-col p-8'>
                                    <img className='rounded-full w-[12rem]' src={'codecrew/atharva.jpg'} alt='' />
                                    <p className='text-[1.6rem] max-md:text[1.2rem] mt-2 text-center flex-nowrap '>Atharva Kumbhar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/">
                    <p className='mb-[2rem] text-xl'>Home</p>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default About