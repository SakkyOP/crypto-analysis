import React, { Fragment } from "react";
import axios from "axios";
import useSWR from "swr";
import { Box, Stack } from "@mui/material";
import { validationResponse } from "../pages/api/v1/validate/[public_key]";
import { detectorResponse } from "../pages/api/v1/detector/[address]";
import { Cryptocon } from "cryptocons";
import cryptos from "./cryptos.json";

export default function Text() {
	const [discriptionStatus, setdiscriptionStatus] = React.useState<string>("");
	const [cryptoIconStatus, setcryptoIconStatus] = React.useState<any>(null);
	const [cyrptoNameStatus, setcyrptoNameStatus] = React.useState<string>("");
	const [detectionColorStatus, setdetectionColorStatus] = React.useState<string>("");
	const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
	const [public_key, setPublicKey] = React.useState<string>("");
	const [response, setResponse] = React.useState<detectorResponse | null>(
		null
	);
	// For CrpytoAPIs api
	const fetcher = async (url: string) => {
		const response: validationResponse = await axios
			.post(url, {
				blockchain: "bitcoin",
				network: "testnet",
			})
			.then((res) => {
				return res.data;
			});

		return response;
	};

	const fetchBlockchain = async (url: string) => {
		const response: detectorResponse = await axios.get(url).then((res) => {
			return res.data;
		});

		return response;
	};

	const { data, error, isLoading } = useSWR(
		shouldFetch ? `api/v1/detector/${public_key}` : null,
		fetchBlockchain
	);

	React.useEffect(() => {
		if (response && response.cryptocurrency.length > 3) {
			setdiscriptionStatus("Not Detected");
			setcryptoIconStatus("X")
			setcyrptoNameStatus("X")
			setdetectionColorStatus("text-red-600")
		} else if (response && response.cryptocurrency.length <= 3) {
			setdiscriptionStatus("Detected");
			setdetectionColorStatus("text-green-400")
			setcyrptoNameStatus(response.cryptocurrency)
			setcryptoIconStatus(<Cryptocon
			size={"3rem"}
			badgeRadius={100}
			icon={cryptos[response.cryptocurrency]}
		/>)
		}
	}, [response]);

	if (data) {
		setResponse(data);
		setShouldFetch(false);
	} 
	return (
		<Fragment>
			<Box className="flex justify-center items-center h-screen text-white">
				<Stack className="w-auto flex r items-center">
					{/* This is the response component return value is mentioned in Docs */}
					<div className="flex flex-col items-center mb-3 h-[42rem] w-[36rem] max-sm:h-[34rem] max-sm:w-[24rem]">
						<div className="mt-10 flex flex-col justify-center items-center">
							<p className="max-md:text-[1.75rem] text-[2rem] mr-2 font-Rubik">Text Analyzer</p>
							<div className="w-[14rem] md:ml-[-0.5rem] md:w-[16rem] h-2 bg-white ml-[-0.65rem] rounded-md mt-[-0.25rem] mb-3"></div>
						</div>
						<input type="text"
							className="text-white bg-transparent h-[2.6rem] w-[28rem] max-md:h-[2.6rem] max-md:w-[20rem] placeholder:text-center placeholder:text-gray-400 border-2 p-4 rounded-md outline-none"
							placeholder="Enter Public Key Here"
							value={public_key}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setPublicKey(event.target.value)
							}
							required
						/>
						<button className="mt-3 m-2 w-[8rem] h-[2.6rem] bg-[#FF3465] font-Poppins rounded-full"
							onClick={() => {
								setShouldFetch(true);
							}}>
							Check
						</button>
						{/* Add Loading component in this:  (Remove <div>... and replace with the loading component) */}
						{isLoading ? (
							<div>
								<p> Loading... Please Wait </p>
							</div>
						) : null}

						{/* Add Error component here */}
						{error ? (
							<div>
								<p> {error.message} </p>
							</div>
						) : null}
						<div className="mt-[-1rem] px-20 max-md:px-10">
							<div className="text-[1.6rem] mb-2">Discription:</div>
							<div className=" w-[28rem] max-md:w-[20rem] px-6 py-4 h-[16rem] border-2 rounded-md">
								<div className="flex p-2 text-[1.4rem]"><p className="mr-2">Status:</p> <p className={detectionColorStatus}>{discriptionStatus}</p></div>
								<div className="flex p-2 text-[1.4rem]"><p className="mr-2">Crypto Icon:</p><div className="mt-[-0.4rem]">{cryptoIconStatus}</div> </div>
								<div className="flex p-2 text-[1.4rem]"><p className="mr-2">Crypto Name:</p><p>{cyrptoNameStatus}</p></div>
							</div>
						</div>
					</div>
				</Stack>
			</Box>
		</Fragment>
	);
}
