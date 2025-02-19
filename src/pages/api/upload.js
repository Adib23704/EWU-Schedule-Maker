import parseXlsx from "@/utils/parser";
import { Buffer } from "buffer";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	try {
		const { fileName, fileData } = req.body;

		if (!fileName || !fileData) {
			return res.status(400).json({ error: "Invalid request data" });
		}

		if (!fileName.endsWith(".xlsx")) {
			return res.status(400).json({ error: "Only .xlsx files are allowed" });
		}

		const buffer = Buffer.from(fileData, "base64");

		if (buffer.length > 5 * 1024 * 1024) {
			return res.status(400).json({ error: "File size exceeds 5MB" });
		}

		const schedule = await parseXlsx(buffer);

		return res.status(200).json({ schedule });
	} catch (error) {
		console.error("Upload error:", error);
		return res.status(500).json({ error: "File processing failed" });
	}
}
