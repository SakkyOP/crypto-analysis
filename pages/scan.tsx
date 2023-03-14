import React, { useState, useRef } from "react";
import {QrReader, QrReaderProps } from "react-qr-reader";
import decodeQRCodeFromImage  from 'jsqr';

// type Props = {}

// const Scan = (props: Props) => {
    
//     const [data, setData] = useState("No result");

//     const onResult={(result, error) => {
//         if (!!result) {
//           setData(result?.text);
//         }

//         if (!!error) {
//           console.info(error);
//         }
//       }}

//     return (
//         // <div>Scan</div>
//         <div>
//         <QrReader
//             scanDelay={300}
//             // onError={handleError}
//             onResult={handleScan}
//             style={{ width: '100%' }}
//         />
//       {data && <p>Link: {data}</p>}
//     </div>
        
//     )
// }

const Test: React.FC = () => {
    const [data, setData] = useState<string>('No result');
    const [input, setInput] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleResult = (result: any, error: any) => {
      if (!!result) {
        setData(result?.text);
        // console.log("working")
      }
  
      if (!!error) {
        console.info(error.message);
        console.log("behenchod")
      }
    };
    
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx?.drawImage(image, 0, 0);
            const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = decodeQRCodeFromImage(imageData!.data, imageData!.width, imageData!.height);
            if (qrCode) {
              setData(qrCode.data);
            } else {
              console.info('QR code not found');
            }
          };
        };
      }
    };    

    const qrReaderProps: QrReaderProps = {
        onResult: handleResult,
        constraints: {
          facingMode: 'environment',
        },
    };
  
    return (
      <>
        <QrReader {...qrReaderProps} />
        <p>{data}</p>
        <form>
        <label>
          Upload QR code image:
          <input type="file" ref={fileInputRef} onChange={handleFileInputChange} />
        </label>
      </form>
      </>
    );
  };
  
  export default Test;