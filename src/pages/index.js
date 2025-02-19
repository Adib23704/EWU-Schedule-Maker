import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import RoutineTable from "@/components/RoutineTable";

export default function Home() {
	const [schedule, setSchedule] = useState([]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<div className="bg-white rounded-xl p-8 w-full max-w-3xl">
				<h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
					📅 EWU Schedule Maker
				</h1>
				<UploadForm onUploadSuccess={setSchedule} />
			</div>
			{schedule.length > 0 && (
				<div className="mt-6 shadow-lg ">
					<RoutineTable schedule={schedule} />
				</div>
			)}
		</div>
	);
}
