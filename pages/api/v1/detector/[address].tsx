import { NextApiRequest, NextApiResponse } from 'next'
const addressDetector = require('cryptocurrency-address-detector')

export interface detectorResponse {
    cryptocurrency: string
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;

    addressDetector(address).then(cryptocurrency=>{
        res.status(200).json({ cryptocurrency });
    })
}

export default handler