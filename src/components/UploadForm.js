import { useState } from "react";

export default function UploadForm({ onUploadSuccess }) {
	const [loading, setLoading] = useState(false);

	const handleFileUpload = async (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		if (!file) return;

		setLoading(true);

		// Read file as base64
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
			alert("File reading failed!");
			setLoading(false);
		};
	};

	return (
		<div className="p-4">
			<input type="file" onChange={handleFileUpload} className="border p-2" />
			{loading && <p>Uploading...</p>}
		</div>
	);
}
