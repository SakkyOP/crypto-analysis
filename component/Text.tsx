import React from "react"
import axios from "axios"
import useSWR from "swr"
import { Input, Button, Box, Stack } from "@mui/material"
import { validationResponse } from "../pages/api/v1/validate/[public_key]"

export default function Text() {
	const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
	const [public_key, setPublicKey] = React.useState<string>("");
	const [response, setResponse] = React.useState<validationResponse | null>(null);

	const  fetcher= async (url: string) => {
		const response: validationResponse = await axios.post(url, {
			blockchain: "bitcoin",
			network: "testnet"
		}).then((res)=>{return res.data})

		return response;
	}

	const {data, error, isLoading} = useSWR(shouldFetch? `api/v1/validate/${public_key}` : null, fetcher)

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
				{response && response ? <h1>{response.data.item.isValid? "Yes" : "Nope"}</h1> : null}
				
				<Input placeholder="Enter Public Key Here" value={public_key} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setPublicKey(event.target.value)} required/>
				<Button onClick={()=>{setShouldFetch(true)}}>Check</Button>
			</Stack>
		</Box>
	)
}
