import React from "react"
import axios from "axios"
import useSWR from "swr"
import { Input, Button, Box, Stack } from "@mui/material"
import { validationResponse } from "../pages/api/v1/validate/[public_key]"
import { detectorResponse } from "../pages/api/v1/detector/[address]"
import { CryptoIcon } from "next-crypto-icons"


export default function Text() {
	const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
	const [public_key, setPublicKey] = React.useState<string>("");
	const [response, setResponse] = React.useState<detectorResponse | null>(null);

	// For CrpytoAPIs api
	const  fetcher= async (url: string) => {
		const response: validationResponse = await axios.post(url, {
			blockchain: "bitcoin",
			network: "testnet"
		}).then((res)=>{return res.data})

		return response;
	}

	const  fetchBlockchain= async (url: string) => {
		const response: detectorResponse = await axios.get(url).then((res)=>{return res.data})

		return response;
	}

	const {data, error, isLoading} = useSWR(shouldFetch? `api/v1/detector/${public_key}` : null, fetchBlockchain)

	if (data) {
		setResponse(data);
		setShouldFetch(false);
	}
	return (
		<Box className="flex justify-center items-center h-screen">
			<Stack className="w-auto">
				{/* Add Loading component in this:  (Remove <div>... and replace with the loading component) */}
				{isLoading? <div> <p> Loading... Please Wait </p> </div> : null}
				
				{/* Add Error component here */}
				{error? <div> <p> {error.message} </p> </div> : null}

				{/* This is the response component return value is mentioned in Docs */}
				{response && response ? <h1>{ response.cryptocurrency.length > 3? null : <span> <CryptoIcon name={`${response.cryptocurrency.toLowerCase()}`}/> </span> } { response.cryptocurrency }</h1> : null}
				
				<Input placeholder="Enter Public Key Here" value={public_key} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setPublicKey(event.target.value)} required/>
				<Button onClick={()=>{setShouldFetch(true)}}>Check</Button>
			</Stack>
		</Box>
	)
}
