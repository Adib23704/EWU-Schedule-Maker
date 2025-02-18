import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import RoutineTable from "@/components/RoutineTable";

export default function Home() {
	const [schedule, setSchedule] = useState([]);

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-2xl font-bold">University Routine Generator</h1>
			<UploadForm onUploadSuccess={setSchedule} />
			{schedule.length > 0 && <RoutineTable schedule={schedule} />}
		</div>
	);
}
