import React from "react"
import axios from "axios"
import useSWR from "swr"
import { Input, Button } from "@mui/material"
import { validationResponse } from "./api/v1/validate/[public_key]"

export default function Home() {
	const [shouldFetch, setShouldFetch] = React.useState<boolean>(false);
	const [public_key, setPublicKey] = React.useState<string>("");

	const  fetcher= async (url: string) => {
		const response: validationResponse = await axios.post(url, {
			blockchain: "bitcoin"
		}).then((res)=>{return res.data})

		return response;
	}

	const {data, error, isLoading} = useSWR(shouldFetch? `api/v1/validate/${public_key}` : null, fetcher)

	// if (isLoading) {
	// 	setShouldFetch(false);
	// }

	return (
		<div>
			{isLoading? <div> <p> Loading... Please Wait </p> </div> : null}
			{error? <div> <p> {error.message} </p> </div> : null}
			{data && data ? <h1>{data.data.item.isValid? "Yes" : "Nope"}</h1> : null}
			<Input placeholder="Enter Public Key Here" value={public_key} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>)=>setPublicKey(event.target.value)} required/>
			<Button onClick={()=>{setShouldFetch(true)}}>Check</Button>
		</div>
	)
}
