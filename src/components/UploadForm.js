import { useState } from "react";

export default function UploadForm({ onUploadSuccess }) {
	const [loading, setLoading] = useState(false);

	const handleFileUpload = async (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		if (!file) return;

		if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
			alert("Invalid file type! Please upload an Excel file.");
			return;
		}

		setLoading(true);

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
				alert(data
					? `Failed to upload file: ${data.message || "An unknown error occurred."}`
					: "Failed to upload file: An unknown error occurred."
				);
			}
			setLoading(false);
		};

		reader.onerror = () => {
			alert("Failed to read the file!");
			setLoading(false);
		};
	};

	return (
		<div className="p-4">
			<input type="file" onChange={handleFileUpload} className="border p-2 rounded-lg" accept=".xlsx" />
			{loading && <p className="text-gray-600 mt-2">Uploading...</p>}
		</div>
	);
}