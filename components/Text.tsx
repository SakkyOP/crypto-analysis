import React from "react";
import axios from "axios";
import useSWR from "swr";
import { Input, Button, Box, Stack } from "@mui/material";
import { validationResponse } from "../pages/api/v1/validate/[public_key]";
import { detectorResponse } from "../pages/api/v1/detector/[address]";
import { Cryptocon } from "cryptocons";
import cryptos from "./cryptos.json";

export default function Text() {
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

	if (data) {
		setResponse(data);
		setShouldFetch(false);
	}
	return (
		<Box className="flex justify-center items-center h-screen text-white">
			<Stack className="w-auto flex justify-center items-center">
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

				{/* This is the response component return value is mentioned in Docs */}
				<div className="flex justify-center items-center">
					{response && response ? (
						<h1 className="flex text-lg">
							{response.cryptocurrency.length > 3 ? null : (
								<span>
									<Cryptocon
										size={"20rem"}
										badgeRadius={100}
										icon={cryptos[response.cryptocurrency]}
									/>
								</span>
							)}
							<p className="pl-2 mb-[2px] pb-[2px]">
								{response.cryptocurrency}
							</p>
						</h1>
					) : null}
				</div>
				<Input
					className="text-white w-[15rem] placeholder:textwhite"
					placeholder="Enter Public Key Here"
					value={public_key}
					onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
						setPublicKey(event.target.value)
					}
					required
				/>
				<Button
					onClick={() => {
						setShouldFetch(true);
					}}>
					Check
				</Button>
			</Stack>
		</Box>
	);
}
