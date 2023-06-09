import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export interface validationResponse {
    data: {
        item: {
            address: string,
            isValid: boolean
        }
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }
    const { query, body } = req;
    const { public_key } = query;

    return axios.post(
        `https://rest.cryptoapis.io/blockchain-tools/${body.blockchain}/${body.network}/addresses/validate`,
        {
            context: "Public Key Validation",
            data: {
                item: {
                    address: public_key
                }
            }
        },
        {
            headers: {
                "Content-type": "application/json",
                "X-API-Key": "688313015257ef3866ae0077c42a682cc3b48ed7"
            }
        }
    ).then((response)=> { 
        return res.status(200).json(response.data);
    }).catch((error)=> { 
        return res.status(error.response.status).json(error.response.data); 
    })
}