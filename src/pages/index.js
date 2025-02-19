import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import RoutineTable from "@/components/RoutineTable";

export default function Home() {
	const [schedule, setSchedule] = useState([]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6">
			<div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-md">
				<h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-6">
					📅 EWU Schedule Maker
				</h1>
				<UploadForm onUploadSuccess={setSchedule} />
			</div>
			{schedule.length > 0 && (
				<div className="mt-6 w-full max-w-4xl overflow-x-auto">
					<RoutineTable schedule={schedule} />
				</div>
			)}
			<footer className="mt-8 text-gray-500 text-xs sm:text-sm text-center">
				Created by{" "}
				<a
					href="https://adib23704.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 font-semibold hover:underline"
				>
					Zahin A. Adib
				</a>
			</footer>
		</div>
	);
}
