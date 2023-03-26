import React, { useState, useRef, Fragment } from "react";
import { QrReader, QrReaderProps } from "react-qr-reader";
import decodeQRCodeFromImage from "jsqr";
import useSWR from 'swr'
import axios from "axios";
import { detectorResponse } from "../pages/api/v1/detector/[address]";
import { Cryptocon, CryptoconProps } from "cryptocons";
import cryptos from './cryptos.json'

interface detectionStatus {
	isDetected: boolean,
	name? : string | "X",
	icon? : JSX.Element | "X"   // Cryptocon Element
}

const Scan: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [detection, setDetection] = useState<detectionStatus | undefined>();
	const [shouldFetch, setShouldFetch] = useState<boolean>(false)
	const [public_key, setPublic_key] = useState<string>("");

	const fetcher= async (url: string) => {
		const response: detectorResponse =  await axios.get(url).then(res=>{ return res.data })
		return response;
	}

	const { data: res_data , isLoading, error} = useSWR(shouldFetch ? `api/v1/detector/${public_key}` : null, fetcher);

	if (res_data){
		console.log(res_data);
		
		setDetection({
			isDetected: res_data.cryptocurrency.length < 5,
			name: res_data.cryptocurrency.length < 5 ? res_data.cryptocurrency : "X",
			icon: ( ( res_data.cryptocurrency.length < 5 ) && ( Object.keys( cryptos ).includes( res_data.cryptocurrency ) ) ) ? <Cryptocon 
					size={"3rem"}
					badgeRadius={100}
					icon={cryptos[res_data.cryptocurrency]}
				/> : "X"
		});
		setShouldFetch(false);
	}
	
	const handleResult = (result: any, error: any) => {
		if (!!result) {
			handleData(result.text);
		}

		if (!!error) {
			console.info(error.message);
		}
	};

	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const image = new Image();
				image.src = reader.result as string;
				image.onload = () => {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");
					canvas.width = image.width;
					canvas.height = image.height;
					ctx?.drawImage(image, 0, 0);
					const imageData = ctx?.getImageData(
						0,
						0,
						canvas.width,
						canvas.height
					);
					const qrCode = decodeQRCodeFromImage(
						imageData!.data,
						imageData!.width,
						imageData!.height
					);
					if (qrCode) {
						handleData(qrCode.data);
					} else {
						console.info("QR code not found");
					}
				};
			};
		}
	};

	const handleData = (data: string) => {
		setPublic_key( data );
		setShouldFetch( true );
	};

	const qrReaderProps: QrReaderProps = {
		onResult: handleResult,
		constraints: {
			facingMode: "environment",
		},
	};

	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const captureImage = () => {
		if (canvasRef.current && videoRef.current) {
			const videoWidth = videoRef.current.videoWidth;
			const videoHeight = videoRef.current.videoHeight;
		
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;
		
			const context = canvasRef.current.getContext("2d");
			context?.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
			setImageSrc(canvasRef.current.toDataURL("image/png"));
		}
	};

	React.useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true })
			.then((stream) => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
						videoRef.current.play();
					}
				})
			.catch((err) => {
				console.log("Error:", err);
			});
	}, []);

	return (
		<Fragment>
			{/* FIX SIZE and MAKE IT PRESENTABLE */}
			{/* Display only when opted using Camera Button */}

			<video className="w-[16rem] mt-8  border-2 rounded-md" ref={videoRef} />

			<canvas style={{display: "none"}} ref={canvasRef} />

			<button className="text-3xl" onClick={captureImage}>📷</button>

			<div className="flex flex-col justify-center items-center gap-4">
				<div className="flex flex-row justify-center items-center py-8 gap-8">
					<div className="">
						<QrReader {...qrReaderProps} />
					</div>
					<label className="flex justify-center items-center mt-3 m-2 w-[8rem] h-[2.6rem] bg-[#FF3465] font-Poppins rounded-full hover:cursor-pointer">
						Upload
						<input
							style={{
								display: "none"
							}}
							type="file"
							ref={fileInputRef}
							onChange={handleFileInputChange}
						/>
					</label>

					<button className="flex justify-center items-center mt-3 m-2 w-[8rem] h-[2.6rem] bg-[#FF3465] font-Poppins rounded-full hover:cursor-pointer"> Camera </button>

				</div>

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
						<div className="flex p-2 text-[1.4rem]">

							<p className="mr-2">Status:</p> { detection && detection ? (
								<p className={`${ detection.isDetected ? "text-green-400" : "text-red-600" }`}> { detection.isDetected ? "Detected" : "Not Detected"} </p>
							) : null }
						</div>
						<div className="flex p-2 text-[1.4rem]"><p className="mr-2">Crypto Icon:</p><div className="mt-[-0.4rem]">{ detection && detection.icon }</div> </div>
						<div className="flex p-2 text-[1.4rem]"><p className="mr-2">Crypto Name:</p><p>{ detection && detection.name }</p></div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
export default Scan;
