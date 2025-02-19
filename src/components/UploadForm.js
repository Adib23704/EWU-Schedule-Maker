import { useState } from "react";

export default function UploadForm({ onUploadSuccess }) {
	const [loading, setLoading] = useState(false);
	const [fileName, setFileName] = useState("");

	const handleFileUpload = async (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		if (!file) return;

		if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
			alert("Invalid file type! Please upload an Excel file.");
			return;
		}

		setLoading(true);
		setFileName(file.name);

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async () => {
			const base64Data = reader.result.split(",")[1];

			const response = await fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fileName: file.name, fileData: base64Data }),
			});

			const data = await response.json();
			if (response.ok) {
				onUploadSuccess(data.schedule);
			} else {
				alert("Upload failed!");
			}
			setLoading(false);
		};

		reader.onerror = () => {
			alert("Failed to read the file!");
			setLoading(false);
		};
	};

	return (
		<div className="p-4 bg-white shadow-lg rounded-lg border border-gray-100">
			<div className="flex flex-col space-y-4">
				<label className="block text-lg font-medium text-gray-700">
					Upload Your Schedule File
				</label>
				<div className="flex items-center space-x-4">
					<input
						type="file"
						onChange={handleFileUpload}
						className="hidden"
						id="fileInput"
						accept=".xlsx"
					/>
					<label
						htmlFor="fileInput"
						className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
					>
						Choose File
					</label>
					{fileName && (
						<span className="text-gray-600 truncate">{fileName}</span>
					)}
				</div>
				{loading && (
					<div className="flex items-center space-x-2">
						<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
						<span className="text-gray-600">Uploading...</span>
					</div>
				)}
			</div>
		</div>
	);
}