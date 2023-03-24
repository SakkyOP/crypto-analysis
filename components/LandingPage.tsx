import React, { Fragment } from "react";
import Scan from "./Scan";
import Text from "./Text";
type Props = {};

const LandingPage = (props: Props) => {
	return (
		<div>
			<div className="h-[50rem] w-[50rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-30rem] left-[-30rem] max-lg:invisible z-10"></div>
			<div className="h-[40rem] w-[40rem] blur-[150px] bg-[#FF3465] rounded-full absolute bottom-[-15rem] left-[-30rem] invisible max-lg:visible z-10"></div>
			<div className="h-[40rem] w-[40rem] blur-[150px] bg-[#1BADFF] rounded-full absolute bottom-[-15rem] right-[-30rem] invisible max-lg:visible z-10"></div>
			<div className="flex max-lg:flex-col h-screen w-full">
				<div className="flex bg-[#0B0E10]  bg-opacity-50 backdrop-blur-sm justify-center items-center w-1/2 max-lg:w-screen max-lg:py-10 max-lg:h-screen z-20">
					{/* LEFT SIDE TEXT*/}
					<div className="flex backdrop-blur-sm h-[34rem] w-[28rem] max-sm:h-[34rem] max-sm:w-[24rem] bg-opacity-50 shadow-2xl rounded-lg flex-col items-center">
						{/* IMPORT TEST HERE THEN STYLE THAT TEST COMPONENT IT */}
						<Text />
					</div>
				</div>
				<div className="w-1/2 flex justify-center max-lg:py-10 items-center max-lg:w-full max-lg:h-screen z-20">
					{/* RIGHT SIDE IMAGE*/}
					<div className="flex bg-[#0B0E10]  backdrop-blur-sm h-[34rem] w-[28rem] max-sm:h-[34rem] max-sm:w-[24rem] bg-opacity-50 shadow-2xl rounded-lg flex-col items-center">
						{/* IMPORT TEST HERE THEN STYLE THAT TEST COMPONENT IT */}
						<Scan />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
