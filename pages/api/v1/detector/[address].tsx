import { NextApiRequest, NextApiResponse } from 'next'
const addressDetector = require('cryptocurrency-address-detector')

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;

    addressDetector(address).then(cryptocurrency=>{
        return res.status(200).json({ cryptocurrency });
    }).catch((err)=>{
        return res.status(400).json( err );
    })
}

export default handler