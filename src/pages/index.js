import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import RoutineTable from "@/components/RoutineTable";

export default function Home() {
	const [schedule, setSchedule] = useState([]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
			<div className="bg-white rounded-xl p-4 sm:p-8 w-full max-w-lg sm:max-w-3xl">
				<h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-4 sm:mb-6">
					📅 EWU Schedule Maker
				</h1>
				<UploadForm onUploadSuccess={setSchedule} />
			</div>

			{schedule.length > 0 && (
				<div className="mt-4 sm:mt-6 shadow-lg w-full max-w-lg sm:max-w-3xl">
					<RoutineTable schedule={schedule} />
				</div>
			)}

			<footer className="mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm text-center">
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
