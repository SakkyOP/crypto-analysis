import React, { useState, useRef, Fragment } from "react";
import { QrReader, QrReaderProps } from "react-qr-reader";
import decodeQRCodeFromImage from "jsqr";
import { decode, encode } from "bs58";
import { createHash } from "crypto";

const Scan: React.FC = () => {
	const [data, setData] = useState<string>("No result");
	const [isDecoded, setIsDecoded] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleResult = (result: any, error: any) => {
		if (!!result) {
			decodeData(result.text);
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
						decodeData(qrCode.data);
					} else {
						console.info("QR code not found");
					}
				};
			};
		}
	};

	const decodeData = (data: string) => {
		try {
			const decodedData = decode(data);
			const checksum = createHash("sha256")
				.update(decodedData)
				.digest()
				.slice(0, 4);
			const encodedData = encode(Buffer.concat([decodedData, checksum]));
			setData(encodedData);
			setIsDecoded(true);
		} catch {
			setData(data);
			setIsDecoded(false);
		}
	};

	const qrReaderProps: QrReaderProps = {
		onResult: handleResult,
		constraints: {
			facingMode: "environment",
		},
	};

	return (
		<Fragment>
			{/* FIX SIZE and MAKE IT PRESENTABLE */}
			<div className="w-40 h-20">
			<QrReader {...qrReaderProps} />
			</div>
			<p>{data}</p>
			<p>{isDecoded ? "Success" : "Can't decode"}</p>
			<form>
				<label>
					Upload QR code image:
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileInputChange}
					/>
				</label>
			</form>
		</Fragment>
	);
};

export default Scan;
