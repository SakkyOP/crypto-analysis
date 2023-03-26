import React, { Fragment } from "react";
import Scan from "./Scan";
import Text from "./Text";
type Props = {};

const LandingPage = (props: Props) => {
	return (
		<Fragment>
			<div className="h-[50rem] w-[50rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-30rem] left-[-30rem] max-lg:invisible z-10"></div>
			<div className="h-[40rem] w-[40rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-15rem] left-[-30rem]  max-lg:visible z-10"></div>
			<div className="h-[40rem] w-[40rem] blur-[150px] bg-[#1BADFF] rounded-full absolute bottom-[-15rem] right-[-30rem]  max-lg:visible z-10"></div>
			<div className="flex max-lg:flex-col h-screen w-full">
				<div className="flex flex-col bg-[#0B0E10]  bg-opacity-50 backdrop-blur-sm justify-center items-center w-1/2 max-lg:w-screen max-lg:py-10 max-lg:h-screen z-20">
					{/* LEFT SIDE BG of Text Section*/}
					<div className="flex relative md:left-[-6rem] max-md:bottom-2 bottom-[3rem] lg:text-[3rem] lg:bottom-[2rem]">
						<p className="max-sm:text-[2.6rem] text-[3.4rem] font-RussoOne relative w-full ">Crypto Analyzer</p>
						<div className="max-sm:w-[3rem] max-sm:right-[-2rem] w-[4rem] h-2 bg-white absolute rotate-[120deg] bottom-3 right-[-2.6rem]"></div>
						<div className="max-sm:w-[3rem] max-sm:right-[-2rem] w-[4rem] h-2 bg-white absolute rotate-[0deg] bottom-1 right-[-2.7rem]"></div>
					</div>
					<div className="flex backdrop-blur-sm h-[38rem] w-[36rem] max-md:h-[34rem] max-md:w-[24rem] bg-opacity-50 shadow-2xl rounded-lg flex-col items-center">
						{/* IMPORT TEST HERE THEN STYLE THAT TEST COMPONENT IT */}
						<Text />
					</div>
				</div>
				<div className="w-1/2 flex justify-center items-center max-lg:w-full max-lg:h-screen z-20">
					{/* RIGHT SIDE BG of IMG Section*/}
					<div className="flex bg-[#0B0E10]  backdrop-blur-sm h-[34rem] w-[28rem] max-md:h-[34rem] max-md:w-[24rem] bg-opacity-50 shadow-2xl rounded-lg flex-col items-center">
						{/* IMPORT TEST HERE THEN STYLE THAT Scan COMPONENT IT */}
						<Scan />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default LandingPage;
